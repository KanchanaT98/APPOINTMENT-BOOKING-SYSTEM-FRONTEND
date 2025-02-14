import React, { useState }from 'react'
import './SignUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs-react';
import salt from '../Security';

const SignUp = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    let Navigate = useNavigate();

    const hashPassword = (pass) => {
        // Hash the password using the provided salt
        return bcrypt.hashSync(pass, salt);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(userName === ""){
                alert("Username cannot be empty");
            }else if(email === ""){
                alert("Email cannot be empty");
            }else if(password === ""){
                alert("Password cannot be empty");
            }else if(password !== conPassword){
                alert("Confirm Password must match password");
            }else if(password.length < 6){
                alert("Password must atleast contain 6 characters");
            }else{
                const response = await axios.post("http://localhost:8080/api/signup", {
                    userName: userName,
                    email: email,
                    password: hashPassword(password)
                }).then((response) => {
                    console.log(userName);
                    console.log(response.data);
                if(response.data = "User Registration Successful"){
                    alert(response.data);
                    alert("Please Login with your Credentials");
                    Navigate("/login");
                }else if(response.data = "Email is Already Taken"){
                    alert("Email is Already Taken");
                }
                });  
            }
        }catch(error){
            alert(error);
        }
    }

    return(
        <div className='container'>
            <h2 className="title">Signup</h2>
            <div className='signupForm'>
                <div className='signupForm-left'>
                    <label className='signupForm-usernamelbl'>Username:</label>
                    <label className='signupForm-emaillbl'>Email:</label>
                    <label className='signupForm-passwordlbl'>Password:</label>
                    <label className='signupForm-conpasswordlbl'>Confirm Password:</label>
                </div>
                <div className='signupForm-right'>
                    <input type='text' name = 'username' value={userName} onChange = { (e) => {setUserName(e.target.value);}} placeholder=' Username' autoComplete='off' spellCheck="false"/>
                    <input type='text' name = 'email' value={email} onChange = { (e) => {setEmail(e.target.value);}} placeholder=' Email' autoComplete='off' spellCheck="false"/>
                    <input type='password' name = 'password' value={password} onChange = { (e) => {setPassword(e.target.value);}} placeholder=' Password' autoComplete='off' spellCheck="false"/>
                    <input type='password' name = 'conPassword' value={conPassword} onChange = { (e) => {setConPassword(e.target.value);}} placeholder=' Confirm Password' autoComplete='off' spellCheck="false"/>
                </div>
            </div>
            <button className="signupBtn" type="submit" onClick={handleSubmit}>SignUp</button>
        </div>
    );
}
export default SignUp;