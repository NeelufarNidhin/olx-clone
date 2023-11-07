import React, { useContext, useState } from 'react'
import Logo from '../../olx-logo.png'
//import { FirebaseContext } from '../../context/FirebaseContext'
import {auth , db } from '../../firebase/config'
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {  addDoc, collection, getDocs } from 'firebase/firestore/lite';
import {useNavigate} from 'react-router-dom'


function Signup() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [ phone,setPhone] = useState("")
  const [password , setPassword] = useState("")
 // const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate()
  const handleSubmit =(e) =>{
    e.preventDefault();
  
  createUserWithEmailAndPassword(auth, email,password).then((userCredential)=>{
      // result.updateProfile(auth.currentUser, {displayName:username})
     
        const user = userCredential.user;
        updateProfile(auth.currentUser,{
          displayName:username
        })
    const docRef = addDoc(collection(db,'users'),{
      id:userCredential.user.uid,
      username:username,
      phone:phone
    });
    navigate('/login')

    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value) }
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value) }
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Signup
