import React, { useEffect, useRef } from 'react';
import './new-bug.css';
import { useState } from 'react';
import { onNewBug } from '../../api/auth';

const NewBug = ({userInfo}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [selectedProject, setSelectedProject] = useState([])
    const [project, setProject] = useState([{}])
    const [selectProjectValue, setSelectProjectValue] = useState("default")
    const [input, setInput] = useState({project_name: '', location: '', description: '', assigned_to: userInfo[0].first_name + ' ' + userInfo[0].last_name})
    const btnRef = useRef(null);



    const onChangeInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const onSubmitNewBug = async (e) => {
        e.preventDefault();
        btnRef.current.disabled = true
        try {
            const {data} = await onNewBug(input)
            setSuccessMessage(data.message)
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.response.data[0].message)
            
        }
        setTimeout(() => {
            setErrorMessage('')
            setSuccessMessage('')
        }, 3000)
    }

    const fetchProjects = async () => {
        await fetch('https://seans-bug-tracker.herokuapp.com/api/get-projects')
                .then(res => res.json())
                .then(data => {
                setProject(data)
                })    
        }

        const OnChangeSelectProject = (e) => {
        setSelectedProject(e.target.value)
        }
        
        
    const setBugInfo = () => {
        const user = project.filter((data) => data.project_name === selectedProject) 
        if(selectedProject.length > 0) {
            setInput({...input, project_name: user[0].project_name})
            
        }
        
    }


        useEffect(() => {
        fetchProjects()
        }, [])

        useEffect(() => {
        setBugInfo()
        }, [selectedProject])

        useEffect(() => {
        setTimeout(() => {
            setErrorMessage('')
            setSuccessMessage('')
        }, 3000)
        }, [successMessage, errorMessage])

  
  return (
    <div className='newbug-container'>
        <div className='newbug-overlay'>
            <h1>CREATE NEW BUG</h1>
            <div className='newbug-form'>
                <form onChange={OnChangeSelectProject}>
                    <select defaultValue={selectProjectValue} onChange={(e) => setSelectProjectValue(e.target.value)}>
                    <option disabled hidden value='default'>Select Project</option>
                        {project.map((data, i) => <option key={i} value={data.project_name}>Project Name: {data.project_name}  | Project ID: {data.id}  </option>)}
                    </select>
                </form>
                {selectedProject.length > 0 ? (

                
                <form type="submit" onSubmit={onSubmitNewBug}>
                    <div>
                        <input 
                            onChange={(e) => onChangeInput(e)} 
                            type='text' 
                            name='location'
                            placeholder='Component / Location'
                            value={input.location}  
                            required
                        />
                    </div>
                    <div>
                        <input 
                            onChange={(e) => onChangeInput(e)} 
                            type='text' 
                            name='description'
                            placeholder='Description (Problem)'
                            value={input.description}  
                            required
                        />
                    </div>
                    <button type='submit' ref={btnRef}>Submit</button>
                </form>
                ) : ''}
                <div style={{color: '#198754', padding: '10px 0px'}}><h3>{successMessage}</h3></div>
                <div style={{color: '#b30000', padding: '10px 0px'}}><h3>{errorMessage}</h3></div>
            </div>
        </div>
    </div>
  )
}

export default NewBug