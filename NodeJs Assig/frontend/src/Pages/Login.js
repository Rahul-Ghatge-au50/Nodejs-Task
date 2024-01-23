import { useState } from 'react';
import './index.css';
import LoginImg from '../Images/ReactTask.png';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail,setErrorEmail] = useState('');
    const [errorPass,setErrorPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const data = {
                email:email,
                password:password
            }
    
            const res = await axios.post('http://localhost:5000/login',(data));
            //console.log(res.data);
            
            if(res){
                const user = JSON.parse(localStorage.getItem('user'));
                if(!user){
                    localStorage.setItem('user',JSON.stringify(res.data));
                }
                navigate('/')
            }
        }catch(err){
            // console.log(err);
            if(err.response.data === 'Wrong Email'){
                setErrorEmail(err.response.data)
            }else{
                setErrorPass(err.response.data)
            }
        }
    }

    return (
        <>
            <div className='container' >
                <div className="login-cont">
                    <div className='img-cont' >
                        <img src={LoginImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="form-cont">
                        <h1>Login In</h1>
                        <form onSubmit={handleSubmit} className="login-form">
                            <input
                                type="text"
                                placeholder="email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                                <p id='error'>{errorEmail}</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                                <p id='error' >{errorPass}</p>
                            <div className='login-btns' >
                                <div className="login-btn">
                                    <button type="submit" className="btn">LOGIN</button>
                                </div>
                                <Link to={'/signup'}>
                                    <button className='btn' >SIGN UP</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;