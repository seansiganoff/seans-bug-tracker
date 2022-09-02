
import './updateUser.css';
import { useState, useRef } from 'react';
import { onUpdateEmail, onUpdateUserPassword } from '../../api/auth';
import { useNavigate } from 'react-router-dom';




const UpdateUser = () => {
    const [emailInput, setEmailInput] = useState({email: '', password: '', new_email: '', confirm_email: ''})
    const [passwordInput, setPasswordInput] = useState({email: '', password: '', new_password: '', confirm_password: ''})
    const [selectValue, setSelectValue] = useState("default");
    const [selectedProject, setSelectedProject] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [successMessage, setSuccessMessage] = useState('')
    const btnRef = useRef(null);
    const navigate = useNavigate();
  
    //changes update options (email or password) and sets the UI inputs.
    const onChangeSelectUpdateOption = (e) => {
        setSelectedProject(e.target.value)
      }



    //sets the input for the email update the user types in.
    const onChangeEmailInput = (e) => {
        setEmailInput({...emailInput, [e.target.name]: e.target.value})
    }

    //sets the input for the password update the user types in.
    const onChangePasswordInput = (e) => {
        setPasswordInput({...passwordInput, [e.target.name]: e.target.value})
    }


    //This function handles when the user submits his request.
    const onSubmitUpdateEmail = async (e) => {
        e.preventDefault()
        btnRef.current.disabled = true;
        try {
            const {data} = await onUpdateEmail(emailInput)
            setSuccessMessage(data.message);
            setErrorMessage('')
            setEmailInput({email: '', password: '', new_email: '', confirm_email: ''})
        } catch (error) {
            setErrorMessage(error.response.data.errors[0].msg)
            setTimeout(() => {
                navigate('/dashboard/update-user')
            }, 3000)
          
        }
        setTimeout(() => {
            setErrorMessage('')
            setSuccessMessage('')
        }, 3000)
    }

    
    const onSubmitUpdatePassword = async (e) => {
        e.preventDefault()
        btnRef.current.disabled = true
        try {
            const {data} = await onUpdateUserPassword(passwordInput)
            setSuccessMessage(data.message);
            setErrorMessage('')
            setPasswordInput({email: '', password: '', new_password: '', confirm_password: ''})
        } catch (error) {
            setErrorMessage(error.response.data.errors[0].msg)
            setTimeout(() => {
                navigate('/dashboard/update-user')
            }, 3000)
        }
        setTimeout(() => {
            setErrorMessage('')
            setSuccessMessage('')
        }, 3000)
    }


    
  return (
    <div className='updateUser-container'>
        <div className='updateUser-overlay'>
            <h1>UPDATE USER</h1>
            
            <div className='updateUser-form'>
                {/* Select update options */}
                <form onChange={onChangeSelectUpdateOption}>
                    <select defaultValue={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                    <option disabled hidden value='default'>What would you like to update? </option>
                    <option value='password'>Update Password</option>
                        <option value='email'>Update Email</option>
                    </select>
                </form>

                
                {/* ternary operator: Displays the input options depending on which option (email or password) is chosen above */}
                {selectedProject === 'email' ? (
                <form onSubmit={(e) =>onSubmitUpdateEmail(e)}>
                    <div>
                        <input
                            type="email"
                            name='email'
                            onChange={(e) => onChangeEmailInput(e)}
                            value={emailInput.email}
                            placeholder='Enter Email'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name='password'
                            onChange={(e) => onChangeEmailInput(e)}
                            value={emailInput.password}
                            placeholder='Enter Password'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name='new_email'
                            onChange={(e) => onChangeEmailInput(e)}
                            value={emailInput.new_email}
                            placeholder='Enter New Email'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name='confirm_email'
                            onChange={(e) => onChangeEmailInput(e)}
                            value={emailInput.confirm_email}
                            placeholder='Confirm New Email'
                        />
                    </div>
                    <button type='submit' ref={btnRef} >Submit</button>
                </form>
                ) : (selectedProject === 'password' ? (
                    <form onSubmit={onSubmitUpdatePassword}> 
                        <div>
                            <div>
                                <input
                                    type="email"
                                    name='email'
                                    onChange={(e) => onChangePasswordInput(e)}
                                    value={passwordInput.email}
                                    placeholder='Enter Email'
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name='password'
                                    onChange={(e) => onChangePasswordInput(e)}
                                    value={passwordInput.password}
                                    placeholder='Enter Password'
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name='new_password'
                                    onChange={(e) => onChangePasswordInput(e)}
                                    value={passwordInput.new_password}
                                    placeholder='Enter New Password'
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name='confirm_password'
                                    onChange={(e) => onChangePasswordInput(e)}
                                    value={passwordInput.confirm_password}
                                    placeholder='Confirm New Password'
                                />
                            </div>
                            <button type='submit' ref={btnRef} >Submit</button>
                            
                        </div>
                    </form>
                ) : <div></div>)}
            </div>
            <div style={{color: '#198754', padding: '10px 0px'}}><h3>{successMessage}</h3></div>
            <div style={{color: '#b30000', padding: '10px 0px'}}><h3>{errorMessage}</h3></div>
        </div>
    </div>
  )
}

export default UpdateUser