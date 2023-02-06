import React, {useState} from 'react'
import { onLogin } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../../redux/slices/authSlice';
import './login.css'





const Login = ({setUserInfo}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [input, setInput] = useState({email: '', password: ''})
    
   
    const onChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await onLogin(input)
            dispatch(authenticateUser())
            localStorage.setItem('isAuth', 'true')
            const response = await fetch('https://seans-bug-tracker.herokuapp.com/api/dashboard/get-users');
            const jsonRes = await response.json();
            const filterUser = jsonRes.filter(user => user.email === input.email)
            setUserInfo(filterUser)
            localStorage.setItem('userInfo', JSON.stringify(filterUser));
        } catch (error) {
            setErrorMessage(error.response.data.errors[0].msg)
        }
        setTimeout(() => {
            setErrorMessage('') 
        }, 3000);
        
    }



  return (
    <div className='login-container'>
        <div className='login-overlay'>
            <div className='login-form'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='login-input'>
                        <h1>Login</h1>
                    </div>
                    <div className='login-input'>
                        <input 
                            onChange={(e) => onChange(e)}
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={input.email}
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div className='login-input'>
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
                    <div className='login-input'>
                        <button type='submit'>Submit</button>
                    </div>
                    {errorMessage ? <div style={{color: '#b30000', padding: '10px 0px', textAlign: 'center'}}><h3>{errorMessage}</h3></div> : ''}
                </form>
                
            </div>
            
        </div>
    </div>
  )
}

export default Login