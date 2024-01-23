import React, { useEffect, useState } from 'react';
import './index.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const [user,setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    },[user])

    const PF = 'http://localhost:5000/images/'

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <>
            <div className="nav-cont">
                <div className="profile-cont">
                    {
                        user?.image ? <img src={PF + user?.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '50px', border: '2px solid blue' }} />
                            : <AccountCircleIcon style={{ fontSize: '60px', color: 'lightGray' }} />
                    }
                    {
                        user.name ? <h3>{user.name}</h3> : <h3>Name</h3>
                    }

                </div>
                <div className="nav-logout-btn">
                    <button onClick={handleLogout} className='logout-btn' >
                        Log Out
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
