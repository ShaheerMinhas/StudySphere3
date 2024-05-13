import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import SignIn from './pages/SignIn/SignIn';
import TnC from './pages/TnC/TnC';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import LobbyScreen from './pages/VideoLobby/VideoLobby';
import RoomPage from './pages/VideoRoom/VideoRoom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from './pages/Home/Home';


{/*


const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()

app.use(express.json)
app.use(express.urlencoded({extended : true}))
app.use("cors")
*/}


function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/api/items")
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="conttainer">
<Router> {/* Wrap your routes with BrowserRouter */}
      <Routes>
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/TnC" element={<TnC />} />
        <Route path="/VideoLobby" element={<LobbyScreen />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;

/*
const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()

app.use(express.json)
app.use(express.urlencoded({extended : true}))
app.use("cors")

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
  const{username,email,password}=req.body

  try{
    const check=await collection.findOne({email:email})

    if (check){
      res.json("exist")
    }
    else{
      res.json("not exist")
    }

  }
  catch(e){
    console.log(e)
    res.json("not exist")

  }
})


app.post("/signup",async(req,res)=>{
  const{username,email,password}=req.body

  const data={
    username:username
    email:email,
    password:password
  }

  try{
    const check=await collection.findOne({email:email})

    if (check){
      res.json("exist")
    }
    else{
      res.json("not exist")
      await collection.insertMany([data])
    }

  }
  catch(e){
    console.log(e)
    res.json("not exist")

  }
})

app.listen(8000,()=>{
  console.log("port connected")
})
*/
