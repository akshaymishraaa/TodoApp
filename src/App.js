import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/Todo";
import Home from "./components/Home";
import SignUp from "./components/Account/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Account/SignIn";
import Profile from "./components/Account/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:userId" element={<Todo />} />
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
