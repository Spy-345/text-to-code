import React, { useState } from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Requiring the openai
const { Configuration, OpenAIApi } = require("openai");
const apiKey = "YOUR_API_KEY";

//Creating the configuration object
const config = new Configuration({
  apiKey: apiKey,
});

//Creating the openai object
const openai = new OpenAIApi(config);

function App() {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState("");

  //creating the runprompt function to run the prompt received from the user and return the result in the
  //response variable by creating a completion object using the createCompletion function of the openai object.
  async function runprompt() {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 1,
    });
    const result = response.data.choices[0].text;
    setData(result);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Propmt is Sent!");
    await runprompt();
  };

  function handleInputChange(event) {
    const input = event.target.value;
    setPrompt(input);
  }
  localStorage.clear();

  // if(localStorage.getItem("username") === null && localStorage.getItem("password") === null){
  //   return <Signup />
  // }else if(localStorage.getItem("username") !== null && localStorage.getItem("password") !== null){
  //   return <Login />
  // }
  // else{
  // return <Home handleSubmit={handleSubmit} handleInputChange={handleInputChange} data={data}/>
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route
          path='/home'
          element={
            <Home
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              data={data}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
