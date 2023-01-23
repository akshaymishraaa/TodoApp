import { Divider } from "@mui/material";
import React from "react";
import App from "../App";
import Header from "./Header";
import Todo from "./Todo";

function Home() {
  return (
    <div>
      <div className="area">
        {/* <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
        <div className="row">
          <div className="col-3 left-right-panel"></div>
          <div className="col-6 app-container">
            <Header />
            <Divider sx={{ backgroundColor: "green", width: "100%" }} />
            <App />
          </div>
          <div className="col-3 left-right-panel"></div>
        </div>

      </div>
    </div>
  );
}

export default Home;
