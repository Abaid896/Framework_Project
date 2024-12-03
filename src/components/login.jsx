import React, { useState } from 'react';
import './style.css';
import useToken from "../useToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, Link } from 'react-router-dom';
import ApiFunctions from "../ApiFunctions";
import Api from "../api/axios";
import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';


const Login = ({ setToken }) => { 
  const token = useToken();

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //Set Variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userUuid, setUserUuid] = useState('');


  //Submit Form
  const login = async (e) => {
     e.preventDefault();
     //Validation
     const validateForm = () => {

        if (email === "" || password ==="") {
           toast.error('All Fields are required', { autoClose: 1000 });
           setError('All Fields are required');
           return false;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            toast.error('Enter a valid Email');
            setError('Enter a valid Email', { autoClose: 1000 });
            return false;
        }

        return true;
     };

     if (!validateForm()) {
        return;
     }


     const userData = {
          email: email,
          password: password,
      };

      try {
          const response = await axios.post('http://localhost:7000/login', userData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (response.status === 200) {
            if (response.data != "" && response.data != null) {
              localStorage.setItem('currentUser', JSON.stringify(response.data.data));
              setToken(response.data.token);
              toast.success('Logged In Successfully!');
              setTimeout(() => {
                navigate('/flipcard');
                window.location.reload();
              }, 1000);
            }
          } else {
            toast.error('Login failed. Please try again.');
          }

      } catch (err) {
          console.error('Error during login:', err);
          toast.error('Login failed. Please try again.');
      }
  }

  return (  
  <div className='login-page'>
    
    <div>
        <ToastContainer autoClose={700} />
      </div>

    <img src="../images/2banner.jpg" alt="" width="100%"/>
      <div className="container">
        <h2>Login</h2>
        <p>Add the correct answer from the options provided.</p>
        {loading && <LoadingSpinner />}
          <form action="#" method="post">
            <div>
              <label htmlFor="">Email Address</label>
              <input type="text" placeholder="Enter here..." name="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
              <div>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter here..." name="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <p> Create a <a href="/register">Account</a></p>
            <button type="submit" onClick={login} className='btn'>Submit</button>
          </form>
      </div>
  </div>
  );
};

export default Login;
