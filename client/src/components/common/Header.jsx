import React, { useState } from 'react'
import { Link } from 'react-router-dom'; //, useNavigate
//import axios from "axios";
import "./style.css";
//import toast from 'react-hot-toast';

const Header = () => {
  const handleLogout = () => {
    // Clear the token and redirect to login
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/user">User List</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;