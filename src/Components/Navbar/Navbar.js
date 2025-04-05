import React, { useState } from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  console.log(loggedUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header className='mainNav'>
        <h2><a href="#" style={{color:"#fff", textDecoration:"none"}}>DIGITAL E-LEARNING</a></h2>
        <div className='menu-toggle' onClick={toggleMenu}>
          <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        <ul className={`mainNavContent ${isOpen ? 'open' : ''}` } >
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/subject" onClick={closeMenu}>Subject</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About us</Link></li>
          <li><Link to="/benefit" onClick={closeMenu}>Benefits</Link></li>
          <li className='dropdown-container'>
            <a className='bar' href="#" onClick={closeMenu}>Imp Links</a>
            <i className='fa-solid fa-chevron-down dropdown'></i>
            <ul className="submenu">
              <li><a href="https://www.mpbse.nic.in/" onClick={closeMenu}>MP Board Updates</a></li>
              <li><a href="https://mpresults.nic.in/mpbse/HSSC12_24/12th_2024-XII.htm" onClick={closeMenu}>MP Board 12th Result</a></li>
              <li><a href="https://www.cbse.gov.in/" onClick={closeMenu}>CBSE Board Updates</a></li>
              <li><a href="https://results.cbse.nic.in/" onClick={closeMenu}>CBSE Board 12th Result</a></li>
            </ul>
          </li>
           <li> {loggedUser?.username ?  <div class="dropdown">
            <a class=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              {loggedUser.username}
            </a>
          
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item"  style={{cursor:'pointer'}}on onClick={()=>{localStorage.removeItem("loggedInUser"); window.location.reload();}}>Logout</a></li>
              <li><Link to = "/dashboard" class="dropdown-item" style={{cursor:'pointer'}}>Dashboard</Link></li>
              
            </ul>
          </div> : <Link to="/login">Login</Link>
          }
                    </li>
        </ul>
      </header>
    </div>
  );
}
