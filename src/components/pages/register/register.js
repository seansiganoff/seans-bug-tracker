import React, {useEffect, useState} from 'react'
import { onRegistration } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import './register.css'

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');;
    const [input, setInput] = useState({first_name: '', last_name: '', email: '', confirmEmail: '', password: '', confirmPassword: ''})
    const Navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('')

    const onChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const first_name_cap = input.first_name.slice(0, 1).toUpperCase() + input.first_name.slice(1)
            const last_name_cap = input.last_name.slice(0, 1).toUpperCase() + input.last_name.slice(1)
            input.first_name = first_name_cap;
            input.last_name = last_name_cap;
            await onRegistration(input);
            setErrorMessage('')
            setInput({first_name: '', last_name: '', email: '',confirmEmail: '', password: '', confirmPassword: ''});
            setSuccessMessage('You Are Now Registered! Redirecting You To Login...')
            setTimeout(() => {
                Navigate("/login")
            }, 3000)
        } catch (err) {
            setErrorMessage(err.response.data.errors[0].msg)
        }
        
    }
    
    useEffect(() => {
        setTimeout(() => {
            setErrorMessage('') 
         }, 3000);
    }, [errorMessage])


  return (
    <div className='register-container'>
        <div className='register-overlay'>
            <div className='register-form'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='register-input'>
                        <h1>Register</h1>
                    </div>
                    <div className='register-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='text'
                            id='first_name'
                            name='first_name'
                            value={input.first_name}
                            placeholder='First Name'
                            required
                        />
                    </div>
                    <div className='register-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='text'
                            id='last_name'
                            name='last_name'
                            value={input.last_name}
                            placeholder='Last Name'
                            required
                        />
                    </div>
                    <div className='register-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='email'
                            id='email'
                            name='email'
                            value={input.email}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='register-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='email'
                            id='confirmEmail'
                            name='confirmEmail'
                            value={input.confirmEmail}
                            placeholder='Confirm Email'
                            required
                        />
                    </div>

                    <div className='register-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={input.password}
                            placeholder='Password'
                            required
                        />
                        
                    </div>
                    <div className='register-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={input.confirmPassword}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                    <div className='register-input'>
                        <button type='submit'>Submit</button>
                    </div>
                    {successMessage ? <div  className='register-success-message' style={{color: '#198754', padding: '10px 20px', fontSize: '1rem'}}><h3>{successMessage}</h3></div> : ''}
                    {errorMessage ? <div  className='register-error-message'style={{color: '#b30000', padding: '10px 0px'}}><h3>{errorMessage}</h3></div> : ''}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register