import React from 'react'
import "./Auth.css";
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../components/LoginForm/LoginForm';

function Auth() {
  return (
    <div>
        <Navbar/>
        <LoginForm/>
    </div>
  )
}

export default Auth