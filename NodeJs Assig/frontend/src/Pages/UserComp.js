import React from 'react'
import Img from '../Images/ReactTask.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './index.css';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function UserComp({item,handleUser}) {

    const PF = 'http://localhost:5000/images/'

    return (
        <>
            <div className="userComp-cont">
                <div className='userData' >
                {
                    item.image ? 
                    <div className='userComp-img' >
                        <img src={PF + item.image} alt="" className='user-img' />
                    </div>
                    :
                    <AccountCircleIcon style={{ fontSize: '196px', color: 'lightGray' }} />
                }  
                    <h3>{item.name}</h3>
                    <h3>{item.email}</h3>
                </div>
                <DeleteIcon onClick={() => handleUser(item._id)} style={{fontSize:'30px',color:'red',cursor:'pointer'}} />
            </div>
        </>
    )
}

export default UserComp
