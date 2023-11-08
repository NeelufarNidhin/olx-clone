import React ,{Fragment, useState ,useContext} from 'react'
import './Create.css'
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../context/FirebaseContext';
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";
import {  addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom';

function Create() {
  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [ image,setImage] = useState(null)
 const {firebase}  = useContext(FirebaseContext)
 const {user} = useContext(AuthContext)
 const date = new Date()

 const navigate = useNavigate()
  const handleClick = () => {
    const storage = getStorage();
    const imagesRef = ref (storage , `/image/${image.name}`);
    uploadBytes(imagesRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url)=>{
          console.log(url)
          const docRef = addDoc(collection(db,'products'),{
            name,
            category,
            price,
            url,
            userId : user.uid,
            createAt : date.toDateString()
          });
          navigate('/')
      })
    })
  }
  return (
    <Fragment>
    <Header />
    <card>
      <div className="centerDiv">
       
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="fname" name="Price" />
          <br />
        
        <br />
        <img alt="Posts" width="200px" height="200px" src= { image ? URL.createObjectURL(image) : ''}  ></img>
      
        
          <br />
          <input   onChange={(e) => { setImage(e.target.files[0])}} type="file" />
          <br />
          <button onClick={handleClick} className="uploadBtn">upload and Submit</button>
    
      </div>
    </card>
  </Fragment>
  )
}

export default Create
