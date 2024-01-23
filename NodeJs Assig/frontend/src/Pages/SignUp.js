import { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignUpImg from '../Images/Signup-image.jpg';
import axios from 'axios';

function SignUp() {

    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const handleProfileImage = async (e) => {

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password,
            number: phoneNumber,
        }
        if (image) {
            //console.log(image);

            const data = new FormData();
            const filename = image.name
            //console.log(filename)
            data.set('name', filename);
            data.set('file', image);
            user.image = filename;
            //console.log(data);
            try {
                const res = await axios.post('http://localhost:5000/upload', data);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
       
        try {
            const res = await axios.post('http://localhost:5000/signup', (user));
            //console.log(res.data);
            navigate('/login');
        } catch (err) {
            //console.log(err.response.data);
            setError(err.response.data);
        }

    }


    return (
        <>
            <div className="signup-cont">
                <div className='signup-img-cont' >
                    <img src={SignUpImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <div style={{ width: '100%', textAlign: 'center' }} >
                        {
                            image?
                                    <img src={URL.createObjectURL(image)} alt="" className='profile-image'  />
                                :
                                <>
                                    <label htmlFor="pro-image"><AccountCircleIcon style={{ fontSize: '130px', color: 'lightGray', cursor: 'pointer' }} /></label>
                                    <p>Upload your Image</p>
                                    <input
                                        type="file"
                                        id='pro-image'
                                        hidden
                                        className='signup-file'
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </>
                        }
                    </div>
                    <input
                        type="text"
                        placeholder='Enter full name'
                        className='signup-input'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder='@gmail'
                        required
                        className='signup-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p id='error' >{error}</p>
                    <input
                        type="number"
                        placeholder='Phone Number'
                        className='signup-input'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='signup-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='signup-btns' >
                        <div>
                            <button type='submit' className='btn' >SIGN UP</button>
                        </div>
                        <Link to={'/login'}>
                            <button className='btn'>LOG IN</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;