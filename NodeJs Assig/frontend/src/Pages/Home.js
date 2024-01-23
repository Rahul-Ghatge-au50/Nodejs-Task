import './index.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UserComp from './UserComp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Home() {

    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const localStore = JSON.parse(localStorage.getItem('user'));
        //console.log(localStore);
        setUser(localStore);

        if (localStore.Admin) {
            fetch('http://localhost:5000/getUsers')
                .then(res => res.json())
                .then(data => setUsers(data));
        }
    }, [users])

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/delete/${user._id}`);
            console.log(res);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    const handleUser = async (id) => {
        await axios.delete(`http://localhost:5000/delete/${id}`);
    }

    return (
        <>
            <Navbar />
            {
                user.Admin ?
                <>
                <h3 style={{paddingLeft:'20px'}} >Admin : {user.name}</h3>
                    <div className='home-userComp' >
                        {
                            users.map((item, index) => {
                                return <UserComp item={item} key={index} handleUser={handleUser} />
                            })
                        }
                    </div>
                </>
                    :
                    <div className='home-cont' >
                        <Link to={'/profile'} style={{ textDecoration: 'none' }} >
                            <button className='profile-btn'>
                                View Profile
                                <AccountCircleIcon style={{ fontSize: '40px', color: 'green' }} />
                            </button>
                        </Link>
                        <h1>Robust Application</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} >
                            <button className='delete-btn' onClick={handleDelete}>
                                Delete Profile
                                <DeleteForeverIcon style={{ fontSize: '40px', color: 'red' }} />
                            </button>
                        </div>
                    </div>
            }


        </>
    )
}

export default Home;