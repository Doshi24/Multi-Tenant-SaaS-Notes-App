import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import url from '../utils/config.js'
import { useDispatch } from "react-redux";
import { register , login } from "../Feactures/Auth.js";
import showToast from "../utils/Toast.jsx";

function AuthCard() {
  const Dispatch = useDispatch()
  const navigate = useNavigate()
  const [isAdminSiginup, setisAdminSiginup] = useState(true);
  const [formdata , setformdata] = useState({
    email : "",
    Password : "",
    tenantId : "",
    role : "",
    
  })

  const {email, Password ,tenantId , role} = formdata

const handlechange = (e)=>{
setformdata({...formdata, [e.target.name]: e.target.value})
}

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(isAdminSiginup){ // admin regsiter
            try {
            const res = await fetch(`${url}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            email,
            Password,
            role: "ADMIN",
            tenantId : tenantId.toLowerCase()
            }),
        });
            const data =  await res.json()
            if(data.status === "success"){
            Dispatch(register({user : data.data.email}))
            showToast("success", `${data.message} Now Please Login !!!`)
            setformdata({email : "", Password : ""})
            setisAdminSiginup(false);
            navigate('/create-note')
            }else{
              showToast("error" , data.message)
            }
        } catch (error) {
            showToast("unsuccess" , error.message)
        }
    }else{
            try {
                const response = await fetch(`${url}/api/auth/login`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, Password })
                })
                const data =  await response.json()
                if(data.status === "success"){
                Dispatch(login({user : data.data.user.email, token : data.data.token}))
                showToast("success", `${data.message}`)
                navigate('/create-note')
                }else{
                  showToast("error" , data.message)
                }
            } catch (error) {
                showToast("unsuccess" , error.message)}
        }
    }

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Cartify
        </h1>
        <p className="text-gray-500 text-center mb-6">
          {isAdminSiginup
            ? "To Start Our Application First Create Tenant Id and Then Admin Id  "
            : "Create a new account to get started."}
        </p>

        {/* Toggle buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`w-1/2 py-2 font-medium ${
              isAdminSiginup ? "bg-indigo-600 text-white" : "text-gray-600"
            }`}
            onClick={() => setisAdminSiginup(true)}
          >
            Admin Siginup
          </button>
          <button
            className={`w-1/2 py-2 font-medium ${
              !isAdminSiginup ? "bg-indigo-600 text-white" : "text-gray-600"
            }`}
            onClick={() => setisAdminSiginup(false)}
          >
            Admin Login
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4"
        onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formdata.email}
              onChange={handlechange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              value={formdata.Password}
              onChange={handlechange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
            {isAdminSiginup && (
            <div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Tanent ID
                    </label>
                    <input
                    type="text"
                    name="tenantId"
                    placeholder="Enter your Tenant"
                    value={formdata.tenantId}
                    onChange={handlechange}
                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>
            </div>
            )}
          <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          type="submit"
          >
            {isAdminSiginup ? "Create Account" : "Admin Login"}
          </button>
          {isAdminSiginup &&(
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md text-sm space-y-1">
                <p className="text-blue-700 font-medium">
                    Note: Tenant is required before creating Admin account
                </p>
                <p>
                    <span
                    className="text-blue-600 hover:underline cursor-pointer font-semibold"
                    onClick={() => {
                        // Navigate to tenant creation page
                        // If using react-router:
                        navigate("/");
                        // alert("Navigate to tenant creation page");
                    }}
                    >
                    Click here to create Tenant
                    </span>
                </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AuthCard;
