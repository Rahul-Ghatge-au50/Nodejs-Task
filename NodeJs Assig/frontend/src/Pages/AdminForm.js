import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignUpImg from '../Images/Signup-image.jpg';
import axios from 'axios';
import { useState } from 'react';

function AdminForm() {


    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
            number: phoneNumber,
            Admin: true
        }
        
        const res = await axios.post('http://localhost:5000/signup', (user));
        //console.log(res.data);
        navigate('/login');
    }

    return (
        <>
            <div className="admin-cont">
                <form onSubmit={handleSubmit} className='admin-form'>
                    <h2>Admin Form</h2>
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
                            <button type='submit' className='btn' >ADMIN SIGNUP</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminForm;