import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useToken from "../useToken";


const Header = () => {
  const token = useToken();
  var customer_id = token.token.user_id;

  const [isLoggedIn, setIsLoggedIn] = useState(token.token);

  const navigate = useNavigate();

  const logout = () => {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.href = "/";
  };

  
  return (
    <header>
      <div className='container'>
        <div className='row'>
            <nav>
            <h1>QuickFlipQuiz</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/flipcard">Add Quiz</Link></li>
                  <li><Link to="/startquiz">Start Quiz</Link></li>
                  <li><a onClick={logout}><span>Logout</span></a></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>

            </nav>
            </div>
        </div>
    </header>
  );
};

export default Header;
