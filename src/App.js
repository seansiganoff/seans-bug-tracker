import { useSelector } from 'react-redux';
import {BrowserRouter, Navigate, Routes, Route, Outlet, useLocation} from 'react-router-dom'
import Navbar from './components/nav/navbar';
import Home from './components/pages/home/home'
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import { useState, useEffect } from 'react';
import NewProject from './components/pages/new-project/new-project';
import NewBug from './components/pages/new-bug/new-bug';
import UpdateUser from './components/pages/updateUser/updateUser';
import UpdateBug from './components/pages/updatebug/updateBug';
import UpdateProject from './components/pages/updateProject/updateProject';
import Dashboard from './components/pages/dashboard/dashboard';
import ViewBug from './components/pages/view-bugs/view-bugs'


const PrivateRoute = () => {
  const {isAuth} = useSelector(state => state.auth)
  const location = useLocation();
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' location={location}/>}</>
}

const RestrictedRoutes = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}





const App = () => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || '[]'
  const [userInfo, setUserInfo] = useState(userFromLocalStorage)

  
  
  

   useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
   }, [userInfo])
  


  return (
      <div>
        <BrowserRouter>
          <Navbar userInfo={userInfo}/>
          <Routes >
            
            <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/dashboard/view-bugs' element={<ViewBug />} />
              <Route path='/dashboard/new-project' element={<NewProject />} />
              <Route path='/dashboard/new-bug' element={<NewBug userInfo={userInfo}/>} />
              <Route path='/dashboard/update-user' element={<UpdateUser userInfo={userInfo}/>} />
              <Route path='/dashboard/view-bugs/update-bug' element={<UpdateBug userInfo={userInfo}/>} />
              <Route path='/dashboard/update-project' element={<UpdateProject />} />
            </Route>
            <Route element={<RestrictedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login setUserInfo={setUserInfo} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;