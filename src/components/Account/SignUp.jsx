import { Divider } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [userNameFromServer, setUserNameFromServer] = useState();
  const [userNameMatch, setUserNameMatched] = useState(false);
  const [isEnable, setIsEnable]= useState(false)

  const registerUser = (param) => {
    axios
      .post("http://localhost:8090/signup", {
        name: param.firstName + param.lastName,
        email: param.email,
        userName: param.userName,
        password: param.password,
      })
      .then((response) => {
        console.log("User registered successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserName = (param) => {
    console.log(param);
    axios
      .get(`http://localhost:8090/fetchUserName/${param}`)
      .then((response) => {
        setUserNameFromServer(response.data);
        if (
          response.data &&
          response.data.length &&
          response.data[0].userName == info.userName
        ) {
          setUserNameMatched(true);
        } else {
          setUserNameMatched(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log(Info)

  function handleChange(e, param) {
    if (param === "firstName") {
      setInfo({ ...info, firstName: e.target.value });
      //console.log(Info.FirstName);
    }
    if (param === "lastName") {
      setInfo({ ...info, lastName: e.target.value });
      //console.log(Info.LastName)
    }
    if (param === "email") {
      setInfo({ ...info, email: e.target.value });
    }
    if (param === "userName") {
      setInfo({ ...info, userName: e.target.value });
    }
    if (param === "password") {
      setInfo({ ...info, password: e.target.value });
    }
    if (param === "confirmPass") {
      setInfo({ ...info, confirmPassword: e.target.value });
    }
  }

  const handleUserName = (e) => {
    fetchUserName(e.target.value);
    // console.log("blurrrrr", userNameFromServer && userNameFromServer);
  };
  function handleSubmit() {
    // setSubmit(true);
    if (!userNameMatch ) {
      
      setInfo({
        ...info,
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      alert("choose any other user name");
    }
    if(info.firstName && info.lastName && info.email && info.userName && info.password && info.confirmPassword) {
      registerUser(info);
    }else{
      setIsEnable(true)
    }

  }

  return (
    <div className="container d-flex justify-content-center  mt-5">
      <div>
        <div className="d-flex">
          <input
            value={info.firstName}
            onChange={(e) => handleChange(e, "firstName")}
            className="form-control mt-2 me-1"
            placeholder="First Name"
            type="text"
          ></input>
          <input
            value={info.lastName}
            onChange={(e) => handleChange(e, "lastName")}
            className="form-control  mt-2 ms-1"
            placeholder="Last Name"
            type="text"
          ></input>
        </div>
        <div>
          <dt>
            <input
              value={info.email}
              onChange={(e) => handleChange(e, "email")}
              className="form-control mt-2"
              placeholder="Email"
              type="email"
            ></input>
          </dt>
          <dt>
            <input
              value={info.userName}
              onChange={(e) => handleChange(e, "userName")}
              className="form-control  mt-2"
              placeholder="UserName"
              onBlur={handleUserName}
              type="text"
            ></input>
            {userNameMatch ? (
              <div className="text-danger">User name not available</div>
            ) : (
              ""
            )}
          </dt>
          <dt>
            <input
              value={info.password}
              onChange={(e) => handleChange(e, "password")}
              className="form-control mt-2"
              placeholder="Password"
              type="password"
            ></input>
          </dt>
          <dt>
            <input
              value={info.confirmPassword}
              onChange={(e) => handleChange(e, "confirmPass")}
              className="form-control  mt-2"
              placeholder="Confirm Password"
              type="password"
            ></input>
          </dt>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-outline-warning w-100 mt-2"
          disabled={isEnable}
          // style={{cursor: isEnable ? 'not-allowed' : 'pointer'}}
        >
          {" "}
          Sign Up
        </button>
        <Link to='/signIn'>
          <button className="btn btn-success w-100 mt-2"> Sign In</button>
        </Link>
      </div>
    </div>
  );
}
