import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Header from "./components/Header";
import reportWebVitals from "./reportWebVitals";
import { Divider } from "@mui/material";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="row">
      {/* <Home/> */}

      <div className="col-3 left-right-panel"></div>
      <div className="col-6 app-container">
        <Header />
        <Divider sx={{backgroundColor:"green", width:"100%"}}/>
        <App />
      </div>
      <div className="col-3 left-right-panel"></div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
