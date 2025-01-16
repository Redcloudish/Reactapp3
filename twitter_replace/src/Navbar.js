import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create-tweet">Create Tweet</Link>
    </nav>
  );
}

export default Navbar;
