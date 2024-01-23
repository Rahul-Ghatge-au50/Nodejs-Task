require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const port = process.env.PORT || 5000;
const userCollection = require('./models/userModel')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = () => {
  try {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c8zsamg.mongodb.net/Node_task?retryWrites=true&w=majority`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

//MULTER STORAGE
const storage = multer.diskStorage({
  destination:(req,res,cb) => {
    cb(null,'images');
  },filename:(req,res,cb) => {
    cb(null,req.body.name);
  }
})

const upload = multer({storage:storage})
app.post('/upload',upload.single('file'),(req,res) => {
  res.status(200).json('file is uploaded');
})

app.use('/images',express.static(path.join(__dirname,'/images')));


//USER ROUTE;
app.post('/signup', async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    const userData = await userCollection.findOne({ email: email })

    if (!userData) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const data = new userCollection({
        email: req.body.email,
        name: req.body.name,
        password: hashPass,
        number: req.body.number,
        image:req.body.image,
        Admin:req.body.Admin
      })

      const user = await data.save();
      res.status(200).send(user);
    }else{
      res.status(401).send('Email is registerd');
    }

  } catch (error) {
    res.status(400).send(error);
  }
})


app.post('/login', async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userCollection.findOne({ email: email });
    //console.log(user);
    !user && res.status(400).json('Wrong Email');

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json('Wrong Password');

    const token = jwt.sign({ email: user.email }, 'Rahul123');
    res.cookie('Token', token, { httpOnly: true });
    const { password, ...others } = user._doc;
    //console.log(token);

    res.status(200).send(others);
  } catch (error) {
    //res.status(400).send(error);
    //console.log(error)
  }
});


app.put('/update/:id', async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await userCollection.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      const { password, ...others } = user._doc
      res.status(200).send(others);

    } catch (error) {
      res.status(400).send(error);
    }
  }
})

app.delete('/delete/:id',async (req, res) => {
  try {
    await userCollection.findByIdAndDelete(req.params.id);
    res.status(200).send('Acoount is Deleted');
  } catch (error) {
    res.status(400).send(error)
  }
})

//GET ALL USERS
app.get('/getUsers',async (req,res) => {
  try{
    const users = await userCollection.find({Admin:false});
    res.status(200).send(users);
  }catch(err){
    console.log(err);
  }
})



app.listen(port, () => {
  console.log(`Listining on port no ${port}`);
  connection();
})


