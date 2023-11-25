import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [logindata, setLoginData] = useState({});
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("username", logindata.username);
    localStorage.setItem("password", logindata.password);

    axios
      .get("/user", { params: logindata })
      .then((response) => {
        alert(response.data);
        if (response.data === "User Authenticated!") {
          navigate("/home");
        } else if (response.data === "User Not Found! Please Register") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));

    document.getElementById("login-form").reset();
    setLoginData({});
  }

  return (
    <>
      <form onSubmit={handleSubmit} id='login-form' className='my-5'>
        <h2>Login</h2>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter Your Email'
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter Your Password'
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <button className='mx-auto my-3 btn btn-lg' type='submit'>
          Login
        </button>
      </form>
      <div>
        <span>Don't have an account?</span>
        <br></br>
        <Link to='/'>Sign Up</Link>
      </div>
    </>
  );
}
