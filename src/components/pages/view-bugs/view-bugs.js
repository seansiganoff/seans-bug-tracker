import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './view-bugs.css';


const ViewBug = () => {
  const [project, setProject] = useState([{}])
  const [selectedProject, setSelectedProject] = useState([])
  const [bugs, setBugs] = useState([{}])
  const [selectValue, setSelectValue] = useState("default");
  const [filteredBugs, setFilteredBugs] = useState([]);

  const dispatch = useDispatch()
  



  const fetchProjects = async () => {
    await fetch('https://seans-bug-tracker.herokuapp.com/api/get-projects')
          .then(res => res.json())
          .then(data => {
            setProject(data)
          })    
  }

  const fetchBugs = async () => {
    await fetch('https://seans-bug-tracker.herokuapp.com/api/get-bugs')
    .then(res => res.json())
    .then(data => {
      setBugs(data);
    }) 
  }


  const getBugsByID = () => {
    setFilteredBugs(bugs.filter((data) => data.project_name === selectedProject));
  }
  

  
 
  const OnChangeSelectProject = (e) => {
    setSelectedProject(e.target.value)
  }
  
  useEffect(() => {
    fetchProjects()
    fetchBugs();
  }, [])


  
  
  useEffect(() => {
    getBugsByID();
  }, [selectedProject])

  

  return (
    ////////////////////////////////////////////////////////  View bug container and overlay div  ///////////////////////////////////////////
    <div className='viewBug-container'>
      <div className='viewBug-overlay'>
        
        <div className='viewBug-h1-header'>
          <h1>BUGS</h1>
        </div>
        {/* ///////////////////////////////////////////////   Select project  //////////////////////////////////////////////////////////////// */}
        <div className='viewBug-h1-projects'>
          <h1>Select a project to view bugs</h1>
        </div>
        <div className='viewBug-select-project'>
          <form onChange={OnChangeSelectProject}>
            <select defaultValue={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
              <option disabled hidden value='default'>Select Project</option>
              {project.map((data, i) => <option key={i} value={data.project_name}>Project Name: {data.project_name}   |   Project ID: {data.id}  </option>)}
            </select>
          </form>
        </div>



        {/* //////////////////////////////////////////////////////////  Bugs display  /////////////////////////////////////////////////////////*/}
        <div className='viewBug-h1-bugs'>
            {/* ////////////////// ternary operator for bugs display ///////////////////// */}
            {selectedProject.length > 0 ? filteredBugs.length > 0 ? filteredBugs.length < 2 ? <h1>This project has {filteredBugs.length} Bug.</h1> : <h1>This project has {filteredBugs.length} bugs</h1> : <h1>This project doesn't have any bugs</h1> : 'Select project to display bugs'}
        </div>
        <div className='viewBug-bugs-container'>
          {filteredBugs.length > 0 ? <h4>Click on a bug to view</h4> : ''}
              {filteredBugs.map((bug, i) => (
                <Link to="/dashboard/view-bugs/update-bug" key={i} state={{getBug: bug}}>
                  <div className='viewBug-bug-div' key={i}>
                    <div className='viewBug-bug-info-div'>
                      <div>
                        <span style={{color: 'black'}}>Project Name:</span> {bug.project_name}
                      </div>
                      <div>
                        <span style={{color: 'black'}}>Bug ID:</span> {bug.bug_id}
                      </div>
                    </div>
                    <div className='viewBug-bug-info'><span>Created By:</span> {bug.assigned_to}</div>
                    <div className='viewBug-bug-info'><span>Location:</span> {bug.location}</div>
                    <div className='viewBug-bug-info'><span>Description:</span> {bug.description}</div>
                   </div>
                </Link>
              ))}
        </div>  
      </div>
    </div>
  )
}

export default ViewBug