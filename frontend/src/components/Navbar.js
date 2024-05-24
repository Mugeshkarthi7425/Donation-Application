import React from 'react'
import './Navbar.css';

import { Link } from 'react-router-dom'
const Navbar = () => {
  return (

    <div className="navbar">

      <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/admin">Admin</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
            <li>
                <Link to="/blog">Application</Link>
            </li>
        </ul>
        
        </nav>  

    </div>
  )
}

export default Navbar