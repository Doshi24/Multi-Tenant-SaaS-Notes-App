import './App.css'
import Tenant from './components/Tenant'
import AdminSiginup from './components/AdminSiginup'
import AuthCard from './components/AuthCard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {


  return (
    <>
    <ToastContainer position="top-right" />
      <Router>
        <Routes>
          {/* <Login />
          <AdminSiginup /> */}
          <Route path = "/AuthProcess" element={<AuthCard/>} />
          <Route path = "/" element={<Tenant/>} />
        </Routes>
      </Router>
    </>
    )
  }

export default App
