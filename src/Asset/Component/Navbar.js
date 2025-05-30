import React, { useState } from 'react';
import '../Css/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Images/Ajlogo.jpg'; // Adjust the path to your logo image

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      
      <img src={logo} alt="Logo" className="logo1" />

      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link className='text' to = {'/'}>Home</Link></li>
        <li><Link className='text' to = '/about'>About</Link></li>
        <li><Link className='text' to = '/projects'>Projects</Link></li>
        <li><Link className='text' to = '/contact'>Contact Us</Link></li>
        
      </ul>
    </header>
  );
}

export default Navbar;
