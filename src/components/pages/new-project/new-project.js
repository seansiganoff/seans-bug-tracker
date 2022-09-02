import React, { useRef } from 'react';
import './new-project.css'
import { useState } from 'react';
import { onNewProject } from '../../api/auth';



const NewProject = () => {
  const [input, setInput] = useState({project_name: '', url: ''})
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const btnRef = useRef(null);


  const onChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

const onSubmit = async (e) => {
    btnRef.current.disabled = true;
    
    e.preventDefault();
    try {
        const {data} = await onNewProject(input)
        setSuccessMessage(data.message);
        setErrorMessage('')
    } catch (err) {
      setErrorMessage(err.response.data[0].message)
    }
    setTimeout(() => {
      btnRef.current.disabled = false;
      setErrorMessage('')
      setSuccessMessage('')
  }, 3000)
  
}
  return (
    <div className='newProject-container'>
      <div className='newProject-overlay'>
        <h1>CREATE NEW PROJECT</h1>
        <div className='newProject-form'>
            <form type="submit" onSubmit={onSubmit}>
              <div>
                <input 
                  onChange={(e) => onChange(e)} 
                  type='text' 
                  name='project_name'
                  placeholder='Project Name'
                  value={input.project_name || ''}  
                  required
                />
              </div>
              <div>
                <input 
                  onChange={(e) => onChange(e)} 
                  type='text' 
                  name='url'
                  placeholder="URL (if not applicable use project name)"
                  value={input.url || ''}  
                  required
                />
              </div>
              <button type='submit' ref={btnRef}>Submit</button>
            </form>
            <div style={{color: '#198754', padding: '10px 0px'}}><h3>{successMessage}</h3></div>
            <div style={{color: '#b30000', padding: '10px 0px'}}><h3>{errorMessage}</h3></div>
        </div>
      </div>
    </div>
  )
}

export default NewProject