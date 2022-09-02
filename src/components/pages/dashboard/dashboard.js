import React from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {
  return (

    <div className='dashboard-container'>
      <div className='dashboard-overlay'>
        <h1>DASHBOARD</h1>
        <Link to="/dashboard/update-project">
          <button>View projects</button>
        </Link>
        <Link to="/dashboard/new-project">
          <button>Create a new project</button>
        </Link>
        <Link to="/dashboard/view-bugs">
          <button>View bugs</button>
        </Link>
        <Link to="/dashboard/new-bug">
          <button>Create a new bug</button>
        </Link>
        <Link to="/dashboard/update-user">
          <button>Update user info</button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard