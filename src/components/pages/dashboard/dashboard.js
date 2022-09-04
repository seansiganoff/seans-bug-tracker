import React from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {
  return (

    <div className='dashboard-container'>
      <div className='dashboard-overlay'>
        <h1>DASHBOARD</h1>

        <div className='dashboard-btn-container'>
          <div className='dashboard-btn'>
            <Link to="/dashboard/update-project">
              <button>View projects</button>
            </Link>
          </div>

          <div className='dashboard-btn'>
          <Link to="/dashboard/new-project">
            <button>Create a new project</button>
          </Link>
          </div>

          <div className='dashboard-btn'>
            <Link to="/dashboard/view-bugs">
              <button>View bugs</button>
            </Link>
          </div>

          <div className='dashboard-btn'>
            <Link to="/dashboard/new-bug">
              <button>Create a new bug</button>
            </Link>
          </div>
          
          <div className='dashboard-btn'>
            <Link to="/dashboard/update-user">
              <button>Update user info</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard