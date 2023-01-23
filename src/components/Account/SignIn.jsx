import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [userDetail, setUserDetail] = useState({ userName: "", password: "" });
  const [signUp, setSignUp] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [userDataFromServer, setUserDataFromServer] = useState();
  const navigate = useNavigate()

  const fetchUserDetailFromServer = (param) => {
    axios
      .get(`http://localhost:8090/fetchUserName/${param}`)
      .then((response) => {
        setUserDataFromServer(response.data);
        console.log('valdaetee', response.data)
        if(response.data.length > 0 && response.data[0].userName === userDetail.userName && response.data[0].password === userDetail.password){
          navigate(`/:${userDetail.userName}`)
          setIsAuthenticate(false)
        }else{
          setIsAuthenticate(true)
          console.log("errorr")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function signUpClick() {
    setSignUp(false);
  }

  function handleChange(e, param) {
    if (param === "username") {
      setUserDetail({ ...userDetail, userName: e.target.value });
    }
    if (param === "password") {
      setUserDetail({ ...userDetail, password: e.target.value });
    }
  }

  function signInClick() {
    fetchUserDetailFromServer(userDetail.userName)
    console.log(userDetail.userName)
  }
  const [values, setValues] = React.useState({
    password: "",
  });

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="container mt-2 d-flex align-items-center justify-content-center"
      style={{ height: "55ch" }}
    >
      <div className="d-block">
        <div className="mb-2">
          <TextField
            required
            id="outlined-required"
            label="Enter your username"
            value={userDetail.userName}
            onChange={(e) => handleChange(e, "username")}
            sx={{ m: 1, width: "45ch" }}
          />
        </div>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={userDetail.password}
                onChange={(e) => handleChange(e, "password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {
                isAuthenticate ? <div className="text-danger">User name/Password is incorrect</div> :''
              }
            </FormControl>
          </div>
        </Box>
        <button
          onClick={signInClick}
          className="btn btn-secondary w-100 mt-4 mb-8"
        >
          Sign In
        </button>
        <p>Forgot Password??</p>
        <div className="d-flex">
          <p className="mt-2">Don't have account..!</p>
          <Link to="/signup">
            <button
              onClick={signUpClick}
              className="btn btn-outline-warning ms-1"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
