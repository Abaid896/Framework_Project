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


const Register = () => { 
//   const [flipped, setFlipped] = useState(false);

//   const handleFlip = () => {
//     setFlipped(!flipped);
//   };


const token = useToken();

   const navigate = useNavigate();
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false); 


   //Set Variables
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   
   //Submit Form
   const registerCustomer = async (e) => {

      e.preventDefault();

      const validateName = (name) => {
         const regex = /^[a-zA-Z\s]*$/; 
         return regex.test(name);
     };
     

      //Validation
      const validateForm = () => {

         if (name === '') {
            toast.error('Enter Name');
            return false;
         }

         if (!validateName(name)) {
            toast.error('Name should contain valid characters with spaces');
            setError('Name should contain valid characters with spaces', { autoClose: 1000 });
            return false;
        }

        // Validate Email
        if (email === '') {
          toast.error('Enter Email');
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
          name: name,
          email: email,
          password: password,
      };
    
      try {
          const response = await axios.post('http://localhost:7000/register/user', userData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
      
          if (response.status === 200) {
              toast.success('Registered Successfully!');
              setTimeout(() => {
                navigate('/login'); // Redirect to the login page after 2 seconds
              }, 1000);
          } else {
              toast.error('Registration failed. Please try again.');
          }
      } catch (err) {
          console.error('Error during registration:', err);
          toast.error('Registration failed. Please try again.');
      }
   }


  return (  
    <div className='login-page'>
      <div>
        <ToastContainer autoClose={700}/>
    </div>


    <img src="../images/2banner.jpg" alt="" width="100%"/>
      <div className="container">
        <h2>Register</h2>
        <p>Add the correct answer from the options provided.</p>
        {loading && <LoadingSpinner />} 
          <form action="" method="post">
            <div>
              <label htmlFor="">Name</label>
              <input type="text" placeholder="Enter Name" name="name" onChange={(e) => setName(e.target.value)} />

            </div>
            <div>
              <label htmlFor="">Email Address</label>
              <input type="email" placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          
              <p>Already have a <a href="/login">Account</a></p>
              <button type="submit" onClick={registerCustomer} className='btn'>Submit</button>
          </form>
      </div>
  </div>
  );
};

export default Register;
