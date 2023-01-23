import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { TextField } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import dayjs from "dayjs";
import Timer from "./Timer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useParams } from "react-router-dom";

function AddTask(props) {
  const [task, setTask] = React.useState("");
  const [allTask, setAllTask] = React.useState([]);
  const [isEnable, setIsEnable] = React.useState(true);
  const [activeTimer, setActiveTimer] = React.useState(false);
  const {value, setValue} = props;
  let { userId } = useParams();

  const time = new Date(value);
  const deadLineTime = time.getTime() / 1000;
  
  
  const postTaskToServer = (param, status) => {
    console.log("valueeeee", userId);
    
    axios
      .post("http://localhost:8090/addTask", activeTimer ? {
        userId:userId,
        task: param.task,
        deadline: param.deadline,
        timestamp:param.timestamp,
        status: status,
      } : {
        userId:userId,
        task:param.task,
        timestamp:param.timestamp,
        status:status, 
      })
      .then((response) => {
        props.getTodoListData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleAddClick = () => {
    if (task != "") {
      postTaskToServer({task:task,deadline:deadLineTime, timestamp:new Date()}, isEnable);
      props.setEditTask(task);
    } else {
      toast("Empty value not accepted");
    }
    setAllTask([...allTask, task]);
    setTask("");
    props.getTodoListData();
  };
  return (
    <div>
      <div className="p-4 border-1 w-100 d-flex">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex" }}
        >
          <ToastContainer />
          <TextField
            id="outlined-basic"
            label="Enter task here"
            variant="outlined"
            sx={{ mr: 2 }}
            value={task}
            onChange={handleChange}
          />
          {activeTimer ? (
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs} className="me-2">
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          ) : (
            ""
          )}
          {activeTimer ? (
            <CloseIcon
              onClick={() => setActiveTimer(false)}
              className="me-2 mt-3"
            />
          ) : (
            <Tooltip title="Set deadline for your task">
              <IconButton>
                <AccessTimeFilledIcon
                  onClick={() => setActiveTimer(true)}
                  className="me-2"
                />
              </IconButton>
            </Tooltip>
          )}

          <Fab color="primary" aria-label="add" onClick={handleAddClick} sx={{zIndex:0}}>
            <AddIcon />
          </Fab>
        </Box>
      </div>
    </div>
  );
}

export default AddTask;
