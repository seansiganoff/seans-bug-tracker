import React from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {
  return (

    <div className='dashboard-container'>
      <div className='dashboard-overlay'>
        <h1>DASHBOARD</h1>

        <div className='dashboard-btn-container'>
          <div>
            <Link to="/dashboard/update-project">
              <button className='dashboard-btn'>View projects</button>
            </Link>
          </div>

          <div>
          <Link to="/dashboard/new-project">
            <button className='dashboard-btn'>Create a new project</button>
          </Link>
          </div>

          <div>
            <Link to="/dashboard/view-bugs">
              <button className='dashboard-btn'>View bugs</button>
            </Link>
          </div>

          <div>
            <Link to="/dashboard/new-bug">
              <button className='dashboard-btn'>Create a new bug</button>
            </Link>
          </div>
          
          <div>
            <Link to="/dashboard/update-user">
              <button className='dashboard-btn'>Update user info</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard