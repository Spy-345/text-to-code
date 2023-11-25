import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css"

export default function Signup() {

  const [signupdata, setSignupData] = useState({
    name:"",
    email:"",
    password:""
  });
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    setSignupData(prevData => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("/signup", signupdata)
    .then(resposnse => {
      alert(resposnse.data);
      if(resposnse.data === "Please Fill The Details!"){
        navigate("/");
      }else if(resposnse.data === "User Already Exists!"){
        navigate("/");
      } else{
        navigate("/login"); 
      }
    })
    .catch(err => console.log(err));
    
    document.getElementById("signup-form").reset();
    setSignupData({
      name:"",
    email:"",
    password:""
    });
  }

  return (
    <>
        <form  onSubmit={handleSubmit} className="my-5 mx-auto" id="signup-form">
          <h2>Sign Up</h2>
            <div>
              <label for="name">Name:</label>
              <input type="text"  id="name" name="name" className="form-group mx-auto" placeholder="Enter Your Name" onChange={handleInputChange} required></input>
            </div>
            <div><label for="email">Email:</label>
              <input type="email" id="email" name="email" className="form-group mx-auto" placeholder="Email" onChange={handleInputChange} required></input>
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" className="form-group mx-auto" placeholder="Password" onChange={handleInputChange} required></input>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-secondary">Sign Up</button>
        </form>
        <div className="my-auto position-relative mx-auto">
          <span>Already have an account?</span><br></br>
          <Link to="/login">Login</Link>
        </div>
    </>
  )
}


