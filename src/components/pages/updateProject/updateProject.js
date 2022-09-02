import React, { useEffect, useState } from 'react';
import { onDeleteProject } from '../../api/auth';
import './updateProject.css';
import Modal from '../../modal/modal';

const UpdateProject = () => {
    const [projects, setProjects] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [idOfItemToDelete, setIdOfItemToDelete] = useState('');





    const fetchProjects = async () => {
        await fetch('https://seans-bug-tracker.herokuapp.com/api/get-projects')
              .then(res => res.json())
              .then(data => {
                setProjects(data)
              })    
      }

      useEffect(() => {
        fetchProjects()
      }, [projects])
      
      //////////////////////////////////////////////////////////// deletes project ///////////////////////////////////////
      const deleteProject = async (id) => {
        try {
            const {data} = await onDeleteProject(id)
            setSuccessMessage(data.message)
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('All bugs must be deleted from a project before the project can be deleted!')
        }

        setTimeout(() => {
          setErrorMessage('')
          setSuccessMessage('')
        }, 3000)
      }


      const confirmDeleteProject = (id) => {
        setIdOfItemToDelete(id);
        setOpenModal(true);
    }

  return (
    <div className='update-project-container'>
      {openModal && <Modal setOpenModal={setOpenModal} idOfItemToDelete={idOfItemToDelete} setIdOfItemToDelete={setIdOfItemToDelete} deleteProject={deleteProject} item={'project'}/>}
      <div className='update-project-overlay'>
        <h1>PROJECTS</h1>
        <div style={{color: '#198754', padding: '10px 0px'}}><h3>{successMessage}</h3></div>
        <div style={{color: '#b30000', padding: '10px 0px'}}><h3>{errorMessage}</h3></div>
        {projects.length ? projects.map((project, i) => (
            <div className='update-project-div' key={i}>
                <div className='update-project-banner'><span style={{color: 'black'}}>Project Name:</span> {project.project_name}</div> 
                <div>URL: {project.url}</div>
                <div>ID: {project.id}</div>  
                <div>
                    <button onClick={() => confirmDeleteProject(project.id)}>Delete</button>
                </div>
            </div>
        )) : 'There are no projects to view'}
      </div>
    </div>
  )
}

export default UpdateProject