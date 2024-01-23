import React, { useEffect, useState } from 'react';
import './index.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Navbar from './Navbar';

function Update() {

    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [user, setUser] = useState({});
    const [upload,setUpload] = useState(false);
    const PF = 'http://localhost:5000/images/'


    useEffect(() => {
        const localStore = JSON.parse(localStorage.getItem('user'));
        //console.log(localStore);
        setUser(localStore);
        setUpload(false);
        if(image){
            setUpload(true);
        }
    }, [name,user,upload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            userId: user._id,
            name: name ? name : user.name
        }
        if (image) {
            
            const data = new FormData();
            const filename = image.name;

            data.set('name', filename);
            data.set('file', image);

            userData.image = filename;
            try {
                const res = await axios.post('http://localhost:5000/upload', data);
                //console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
       


        const res = await axios.put(`http://localhost:5000/update/${user._id}`, userData);
        //console.log(res.data);
        const updateUser = localStorage.setItem('user', JSON.stringify(res.data));
        //console.log(updateUser);
        setName('');
        alert('Your profile is Updated');
    }   

    return (
        <>
            <Navbar />
            <div className="edit-cont">
                <h1>Update your Profile</h1>
                <form onSubmit={handleSubmit} className="update-user">
                    <label>Profile Picture</label>
                    <div className="update-img">
                        {

                            user.image ?
                                <>
                                    <label htmlFor="fileInput">
                                        <img src={image ? URL.createObjectURL(image) : PF + user.image} className='profile-image' style={{ cursor: 'pointer' }} alt="" htmlFor="fileInput" />
                                    </label>
                                    <input
                                        type="file"
                                        id='fileInput'
                                        style={{ display: 'none' }}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </>

                                :
                                <>
                                    <label htmlFor="fileInput">
                                        <label htmlFor="fileInput"><AccountCircleIcon style={{ fontSize: '190px', color: 'lightGray', cursor: 'pointer' }} /></label>
                                    </label>
                                    {
                                        upload ? <p style={{color:'blue'}} >Image is Uploaded</p> : <p style={{color:'blue'}}>Upload your Image</p>
                                    }
                                    <input
                                        type="file"
                                        id='fileInput'
                                        style={{ display: 'none' }}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </>
                        }

                    </div>
                    <div className='update-name' >
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder={user.name}
                            className='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <h4>Email : {user.email}</h4>
                    <button type='submit' className='btn' >Save</button>
                </form>
            </div>
        </>
    )
}

export default Update
