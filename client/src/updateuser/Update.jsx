import React, {useState,useEffect} from 'react'
import "./update.css";
import axios from "axios";
import {Link, useNavigate,useParams} from 'react-router-dom'
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const users={
    name:"",
    email:"",
    address:"",
  };
  const {id}=useParams();
  const [user,setUser]=useState(users)
  const navigate=useNavigate();
  const inputHandler=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value});
  }
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/${id}`)
  .then((response)=>{
    setUser(response.data)
  })
  .catch((error)=>{
console.log(error);
  })
  },[id])
  const submitForm=async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/user/${id}`,user)
    .then((response)=>{
      //console.log("User created successfully")
      toast.success(response.data.message,{position:'top-right'});
      navigate("/");
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="addUser">
      <Link to="/" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i> Back
            </Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor="name">Name:</label>
          <input 
          type="text" 
          name="name"
          value={user.name}
          onChange={inputHandler} 
          placeholder="Enter User Name"
          id="name"
          autoComplete='off'/>
          
        </div>
        <div className='inputGroup'>
          <label htmlFor="email">Email:</label>
          <input 
          type="email" 
          name="email"
          value={user.email}
          onChange={inputHandler} 
          placeholder="Enter User Email"
          id="email"
          autoComplete='off'/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="address">Address:</label>
          <input 
          type="text" 
          name="address"
          value={user.address}
          onChange={inputHandler} 
          placeholder="Enter User Address"
          id="address"
          autoComplete='off'/>
        </div>
        <div className='inputGroup'>
          <button type="submit" class="btn btn-primary">
            Submit
            </button>
        </div>
      </form>
      </div>
  )
}

export default UpdateUser