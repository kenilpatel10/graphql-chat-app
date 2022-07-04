import { useMutation } from "@apollo/client";
import {useState,React }from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from '../../src/CHAT.png'
import { LOGIN_USER } from "../gqloperations/mutations";
function Login() {

   const [formData,setFormData] = useState({})
const navigate= useNavigate()

   const [signInUser,{error,loading,data}] = useMutation(LOGIN_USER,{
    onCompleted(data){
      // console.log("login",localStorage.getItem("token"))
        localStorage.setItem("token",data.signInUser.token)
        localStorage.setItem("userId",data.signInUser._id)
        localStorage.setItem("userName",data.signInUser.username)
      window.location.href = '/chat' 
    }
})

    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
       e.preventDefault()
       console.log(formData)
        signInUser({
          variables:{
              userNew:formData
          }
      }).then((res)=>{
        console.log("login",res)
      }).catch((error)=>{
        if(error.message){
          console.log('error', error.message)
        }
      })
    }

    return (
      <>
      <Form className="m-4 p-4 pt-0" onSubmit={handleSubmit}>
      <div className='d-flex justify-content-center p-4 pt-0'>
              <img style={{height:"150px", width:"150px"}} src={image} alt=""/>
              </div>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control className="input" name="email"  onChange={handleChange} type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control className="input" name="password"  onChange={handleChange} type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</>

    );
  }
  
export default Login



