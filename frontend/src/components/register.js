import { useMutation } from "@apollo/client";
import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import image from "../../src/CHAT.png";
import { SIGNUP_USER } from "../gqloperations/mutations";
function Register() {
  const [formData, setFormData] = useState({})
  const [signUpUser,{data,loading,error}] = useMutation(SIGNUP_USER)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      variables:{
          userNew:formData
      }
  }).then((res)=>{
    console.log("res",res)
    alert("registered")
  }).catch((error)=>{
    alert(error.message)
  })
    console.log(formData);
  };
  return (
    <>
      <Form className="m-4 p-4 pt-0" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center p-4 pt-0">
          <img style={{ height: "150px", width: "150px" }} src={image} alt="" />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="input"
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="input"
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input"
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
export default Register;
