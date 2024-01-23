import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './index.css';
import Img from '../Images/ReactTask.png';
import Navbar from './Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function ProfilePage() {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const PF = 'http://localhost:5000/images/'

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setData(user);
    })

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/delete/${data._id}`);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar />
            <div className="profilePage-cont">
                <div className='profilePage-update' >
                    <Link to='/update' >
                        <EditIcon style={{fontSize:'30px',color:'green',cursor:'pointer'}} />
                    </Link>
                    <DeleteIcon style={{fontSize:'30px',color:'red',cursor:'pointer'}} onClick={handleDelete} />
                </div>
                <div className='profilePage-data' >
                    {
                        data.image ?
                            <div className="profilePage-img">
                                <img src={ PF + data.image} alt="" className='user-img' />
                            </div>
                            :
                            <AccountCircleIcon style={{ fontSize: '230px', color: 'lightGray' }} />
                    }
                    <div className="profile-data">
                        <h3>Name : {data.name}</h3>
                        <h4>Email : {data.email}</h4>
                        <h4>Number : {data.number}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
