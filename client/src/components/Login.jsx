import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { login } from "../Feactures/Auth.js";
import url from "../config.js";

function Login(){

    const [email, setEmail] = useState("")
    const [Password, setPassword] =useState("")

    const dispatch = useDispatch()

    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${url}/api/auth/login`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, Password })
            })
            console.log("response", response)
            const data =  await response.json()
            console.log(data)
            dispatch(login({user : data.data.user.email, token : data.data.token}))
            console.log("dispatch",dispatch)
            alert("login success")
        } catch (error) {
            alert ("something went worng")
        }
    }



    return(
        <form onSubmit={handleLogin} className="p-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 m-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 m-2"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
    )
}

export default Login