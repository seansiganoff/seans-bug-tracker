import './navbar.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { unauthenticateUser } from '../../redux/slices/authSlice'
import { onLogout } from '../api/auth'
import { NavLink } from 'react-router-dom'



const Navbar = ({userInfo}) => {
    const {isAuth} = useSelector(state => state.auth)
    const dispatch = useDispatch();
  

    // logs out the user and removes the local storage user info and autherization
    const logout = () => {
        try {
          onLogout()
          dispatch(unauthenticateUser())
          localStorage.removeItem('isAuth')
          localStorage.removeItem('userInfo')
        } catch (error) {
          console.log(error.response)
        }
      }

      

      /////////////////////////////////////////////////////////////  Dashboard Nav  ///////////////////////////////////////////////
      const VerifiedNav = () => {
        
        return (
              <div className='navbar-container1'>
                  <div className='nav-left-side'>
                    <ul>
                        <li>
                          <NavLink to="/dashboard">
                            DASHBOARD
                          </NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/new-project">
                            NEW PROJECT
                          </NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/new-bug">
                            NEW BUG
                          </NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/update-user">
                            UPDATE USER
                          </NavLink>
                        </li>
                       
                        

                    </ul>
                    
                    
                    
                      

                  </div>
                  <div className='nav-right-side'>
                       <div className='userName'><div className='login-text'>Logged in as <span style={{color: 'rgb(0, 183, 255)'}}>{userInfo[0].first_name} {userInfo[0].last_name}</span></div></div>
                      <button onClick={() => logout()} className='nav-logout-btn'>
                          Logout
                      </button>
                  </div>
              </div>
          )
      }

      ///////////////////////////////////////////////////////////////////  Home Nav  ////////////////////////////////////////////////////////
      const UnverifiedNav = () => {
        return (
          <div className='navbar-container2'>
              <div className='nav-left-side-container-2'>
                  <div><NavLink to='/'>HOME</NavLink></div>
              </div>
              <div className='nav-right-side-container-2'>
                  <div style={{padding:' 5px 10px'}}>
                    <NavLink to='/login'>LOGIN</NavLink>
                  </div>
                  <div style={{padding: '5px 10px'}}>
                    <NavLink to='/register'>REGISTER</NavLink>
                  </div>
              </div>
          </div>
        )
      }


  return (
    <div className='navbar'>
            {isAuth ? VerifiedNav() : VerifiedNav()}
    </div>
  )
}

export default Navbar