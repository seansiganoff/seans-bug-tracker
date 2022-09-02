import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Register from '../register/register';
import Login from '../login/login';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-overlay'>
        <div className='home-header-text'>
         Welcome To Seans Bug Tracking App
        </div>
      <div className='home-navigation-div'>
        <div>
          <Link to='/register' element={<Register />}>New users click here to register.</Link>
        </div>
        <br />
        <div>
          <Link to='/login' element={<Login />}>Existing users click here to login.</Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home