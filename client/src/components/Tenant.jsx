import React, { useState } from "react";
import url from "../utils/config.js";
import { useNavigate } from "react-router-dom";
import showToast from "../utils/Toast.jsx";

function Tenant() {
  const [name, setName] = useState("");
  const navigator = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/tenant/create-tenant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slugvalue: name.toLowerCase(), plan: "FREE" }),
      });
      const data = await response.json();
      showToast("success", data.message)
      setName("");
      navigator('/AuthProcess')
    } catch (error) {
      showToast("unsuccess", "please try again later")
    }
  };

  return (
    <div className=" flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Create Tenant
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Fill the details below to create a new tenant.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tenant Name
            </label>
            <input
              type="text"
              placeholder="Enter Tenant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
          >
            Create Tenant
          </button>

          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md text-sm space-y-1">
            <p className="text-blue-700 font-medium">
              Note: By default, you will use your Free Model For <strong className="text-xl">Multi-Tenant-Notes-App</strong>
            </p>
            <p className="text-blue-700 font-medium hover:underline cursor-pointer"
            onClick={()=>{
              navigator('/AuthProcess')
            }}
            >
              Tenant Created Already Want to Login 
            </p>
            <p>
              <span
                className="text-blue-600 hover:underline cursor-pointer font-semibold"
                onClick={() => {
                  alert("Navigate to tenant details or info page");
                }}
              >
                Learn more
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tenant;
