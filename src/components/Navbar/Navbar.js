import React, { useState } from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignup = () => {
    navigate("/join");
  }
  const handleLogin = () => {
    navigate("/auth");
  }

  return (
    <div className='navbar'>
      <div className='left'>
        <div className='head'>
          <h1>TMDB</h1>
        </div>
      </div>
      {!location.pathname.startsWith('/auth' && '/join') && (
        <div className={`right ${showMenu ? 'show' : ''}`}>
          {location.pathname === '/dash' ? (
            <>
              <button>Profile</button>
              <button>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Signup</button>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
        </div>
      )}
      <div className={`hamburger ${showMenu ? 'open' : ''}`} onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </div>
  );
}

export default Navbar;