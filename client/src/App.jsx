import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/Profile" element={<Profile/>}/>
      </Route>
      <Route path="/Sign-Up" element={<SignUp/>}/>
      <Route path="/Sign-in" element={<SingIn/>}/>
      <Route path="/About" element={<About/>}/>
   
    </Routes>
   </BrowserRouter>
  )
}