import './App.css'
import Tenant from './components/Tenant'
import AuthCard from './components/AuthCard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NoteForm from './components/NoteForm';
import GetNote from './components/GetNote';
import Homepage from './Homepage';

function App() {


  return (
    <>
    <ToastContainer position="top-right" />
      <Router>
        <Routes>
          {/* <Login />
          <AdminSiginup /> */}
          <Route path = "/" element={<Tenant/>} />
          <Route path = "/AuthProcess" element={<AuthCard/>} />
          <Route path = "/Home" element={<Homepage/>} />
          <Route path = '/Home' element={<NoteForm />} />
          <Route path = '/Home' element={<GetNote />} />
        </Routes>
      </Router>
    </>
    )
  }

export default App
