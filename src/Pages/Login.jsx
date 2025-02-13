import React, { useState }from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import bcrypt from 'bcryptjs-react';
import salt from '../Security';

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let Navigate = useNavigate();

    const hashPassword = (pass) => {
        // Hash the password using the provided salt
        return bcrypt.hashSync(pass, salt);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(userName === ""){
            alert("Username cannot be empty");
        }else if(password === ""){
            alert("Password cannot be empty");
        }else{
            try{
                const response = await axios.post("http://localhost:8080/api/login",{
                    userName:userName,
                    password:hashPassword(password)
                }).then((response) => {
                    console.log(response.data)  //for debugging
                    if(response.data === "Login Successfull"){
                        alert(`Welcome ${userName}!`);
                        Navigate("/appointmentList");
                    }else if(response.data === "Invalid login credentials"){
                        alert(response.data);
                    }else{
                        alert(response.data)
                    }
                    });
                
            }catch(error){
                alert(error)
            }
        }
    }

    const signup = () =>{
        Navigate("/signup");
    }

    return(
        <div className='container'>
            <h2 className="title">Login</h2>
            <div className='loginForm'>
                <div className='username-block'>
                    <label id='loginForm-usernamelbl'>Username</label>
                    <input type='text' name = 'username' value={userName} onChange = { (e) => {setUserName(e.target.value);}} placeholder=' Username'/>
                </div>
                <div className='password-block'>
                    <label id='loginForm-passwordlbl'>Password</label>
                    <input type='text' name = 'password' value={password} onChange = { (e) => {setPassword(e.target.value);}} placeholder=' Password'/>
                </div>
                <button className="loginbtn" type="save" onClick={handleSubmit}>Login</button>
                <p className="login-signupbtn" type="button">Click here to<span onClick={signup}>SIGNUP</span></p>
            </div>
        </div>
    )
}
export default Login