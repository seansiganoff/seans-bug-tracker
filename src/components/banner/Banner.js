import React from 'react'
import './banner.css'
import { Link } from 'react-router-dom';

const Banner = (prop) => {
  return (
        <div className='banner'>
            <h1>{prop}</h1>
        </div>
  )
}

export default Banner