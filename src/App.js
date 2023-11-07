
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login  from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext,FirebaseContext } from './context/FirebaseContext';
import React ,{ useEffect,useContext} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/config'
import Post from './context/PostContext'

function App() {
  const {setUser} = useContext(AuthContext)
  const {app } = useContext(FirebaseContext)
  useEffect (()=>{
   // console.log(user)
   const uservalue= onAuthStateChanged(auth, ( user)=>{
      setUser(user)
    })
    return uservalue
  })
  return (
    <div >
      <Post>
      <BrowserRouter>
      <Routes>
      <Route exact path='/' element= {<Home/>} />
      <Route path='/signup' element={<Signup/>} /> 
      <Route path='/login' element={<Login/>} /> 
      <Route path='/create' element={<Create/>} />
      <Route path='/view' element={<View/>} />
      
     
      </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
