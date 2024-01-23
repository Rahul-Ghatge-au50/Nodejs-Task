require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const Product = require('./Modul/Product');
const Category = require('./Modul/Category');

app.use(express.json());

//MONGODB CONNECTION
const connection = () => {
    try {
        mongoose.connect('mongodb+srv://rahulghatge166:Rahul210519@cluster0.c8zsamg.mongodb.net/Node-test');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}


//PRODUCT ROUTES POST
app.post('/product/add', async (req, res) => {

    const productName = req.body.name;
    //console.log(productName);

    try {
        const product = await Product.findOne({ name: productName });
        const count = await Product.countDocuments({ name: productName });
        // console.log(count);
        // console.log(product);

        if (!product) {
            const proData = new Product({
                name: req.body.name,
                categoryId: req.body.categoryId,
                price: req.body.price,
                desc: req.body.desc,
                slug: req.body.name
            })

            const data = await proData.save();
            res.status(200).json({
                status: 'Success',
                data: data
            });
        } else {
            const productData = new Product({
                name: req.body.name,
                categoryId: req.body.categoryId,
                price: req.body.price,
                desc: req.body.desc,
                slug: product.name + ` - ${count}`
            })

            //console.log(proData);
            const data = await productData.save();
            res.status(200).json({
                status: 'Success',
                data: data
            });
        }
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Product.find({ _id: id },
            {
                $lookup: {
                    form: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryName"
                }
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    desc: 1,
                    slug: 1,
                    categoryName: { $arrayElemAt: ["$categoryName.name", 0] }
                }
            });
res.status(200).json({
    status: 'Success',
    data: data
})
    } catch (err) {
    res.status(401).json({
        status: 'Failed',
        data: err
    })
}
})


app.put('/product/update/:productId', async (req, res) => {
    const id = req.params.productId;
    const update = req.body
    const proName = req.body.name;
    try {

        const pro = await Product.findOne({ name: proName })
        if (pro) {
            res.json('The product is already added')
        } else {
            const data = await Product.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true });
            console.log(data);
            res.status(200).json({
                status: 'Success',
                data: data
            })
        }
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})

app.delete('/product/delete/:productId', async (req, res) => {
    const id = req.params.productId;
    try {
        await Product.findByIdAndDelete({ _id: id });
        res.status(200).json({
            status: 'Success',
            data: 'Product is Deleted'
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.get('/api/product?limit', async (req, res) => {
    const limit = req.query.limit;
    console.log(limit);
    try {
        const data = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryName"
                }
            },
            {
                $project: {
                    name: 1,
                    desc: 1,
                    price: 1,
                    slug: 1,
                    categoryName: { $arrayElemAt: ["$categoryName.name", 0] }
                }
            }]).sort({price:'asc'}).limit(parseInt(limit)); 
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.post('/api/addproducts', async (req, res) => {
    const data = req.body;
    try {
        const products = await Product.insertMany(data);
        //console.log(products);
        res.status(200).json({
            status: 'Success',
            data: products
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.post('/category/add', async (req, res) => {
    //console.log(req.body);
    try {
        const data = new Category({
            name: req.body.name,
            desc: req.body.desc
        })
        const catData = await data.save();
        res.status(200).json({
            status: 'Success',
            data: catData
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.get('/category/all', async (req, res) => {
    try {
        const data = await Category.find();
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.listen(port, () => {
    console.log(`Listining on port no ${port}`);
    connection();
})