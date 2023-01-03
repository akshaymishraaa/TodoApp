import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Countdown from "react-countdown";
import dayjs from "dayjs";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Divider from "@mui/material/Divider";
import Header from "./Header";
import Timer from "./Timer";
import CompletedPopover from "./CompletedPopover";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MenuListComposition from "./Menu";
function Todo() {
  const [task, setTask] = React.useState("");
  const [editTask, setEditTask] = React.useState("");
  const [dataFromServer, setDataFromServer] = React.useState();
  const [completedTask, setCompletedTask] = React.useState();
  const [allTask, setAllTask] = React.useState([]);
  const [isEnable, setIsEnable] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs("2022-04-07"));
  const [activeTimer, setActiveTimer] = React.useState(false);
  const [openComplete, setOpenCompleted] = React.useState(false);

  console.log("datejss", value);
  const getTodoListData = () => {
    axios.get("http://localhost:8090/").then((response) => {
      setDataFromServer(response.data);
      console.log(response.data);
    });
  };

  const postTaskToServer = (param, status) => {
    axios
      .post("http://localhost:8090/addTask", {
        task: param,
        deadline: "",
        status: status,
      })
      .then((response) => {
        getTodoListData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTaskFromServer = (id) => {
    axios
      .delete(`http://localhost:8090/deleteTask/${id}`)
      .then((response) => {
        getTodoListData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTaskOnServer = (param) => {
    console.log("paraaam", param);
    axios
      .put(`http://localhost:8090/updateTask/${param}`, {
        task: editTask,
        status: true,
      })
      .then((response) => {
        getTodoListData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const completedDataFromServer = (id, param) => {
    console.log("iddddparam", id, param);
    axios
      .delete(`http://localhost:8090/completeTask/${id}`, {
        task: param,
      })
      .then((resp) => {
        getTodoListData();
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:8090/getCompletedTask").then((response) => {
      setCompletedTask(response.data);
    });
  };
  const fetchCompletedDataFromServer = () => {
    axios.get("http://localhost:8090/getCompletedTask").then((response) => {
      setCompletedTask(response.data);
      console.log("logggg", response.data);
    });
  };

  React.useEffect(() => {
    getTodoListData();
    fetchCompletedDataFromServer();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleAddClick = () => {
    if (task != "") {
      postTaskToServer(task, isEnable);
      setEditTask(task);
    } else {
      toast("Empty value not accepted");
    }
    setAllTask([...allTask, task]);
    setTask("");
    getTodoListData();
  };
  const handleComplete = (id, task) => {
    completedDataFromServer(id, task);
    toast("Task completed successfully");
  };
  const handleUpdateClick = async (task) => {
    updateTaskOnServer(task);

    toast(`${task} Task updated successfully`);
    setOpen(false);
  };
  const handleEditClick = (id, name) => {
    setOpen(true);
    dataFromServer &&
      dataFromServer.map((t) => {
        if (t._id === id) {
          t.status = false;
          console.log("_id", dataFromServer);
          setIsEnable(true);
        }
      });
  };
  const handleEditChange = (e) => {
    setEditTask(e.target.value);
  };
  const handleDeleteClick = (id, task) => {
    deleteTaskFromServer(id);
    toast(`${task} Task delete successfully.`);
  };
  const Completionist = () => <span className="text-danger">Expired!</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  console.log("valueeeesss", value);
  return (
    <div className="row">
      <div className="col-3 left-right-panel"></div>
      <div className="app-container col-6 ">
        <Header />
        <Divider sx={{ backgroundColor: "green" }} />
        <div className="d-flex justify-content-between">
          <CompletedPopover
            completedTask={completedTask}
            setCompletedTask={setCompletedTask}
          />
          <MenuListComposition />
        </div>
        <div className="p-4 border-1">
          <Box component="form" noValidate autoComplete="off">
            <ToastContainer />
            <TextField
              id="outlined-basic"
              label="Enter task here"
              variant="outlined"
              sx={{ mr: 2 }}
              value={task}
              onChange={handleChange}
            />
            {activeTimer ? <Timer value={value} setValue={setValue} /> : ""}
            {activeTimer ? (
              <CloseIcon
                onClick={() => setActiveTimer(false)}
                className="me-2"
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

            <Fab color="primary" aria-label="add" onClick={handleAddClick}>
              <AddIcon />
            </Fab>
          </Box>
        </div>
        <div
          className={
            dataFromServer && dataFromServer.length > 0 ? "task-container" : ""
          }
        >
          <div>
            {dataFromServer && dataFromServer.length > 0 ? (
              dataFromServer.map((t, index) => {
                return (
                  <div className="mt-2 d-flex ">
                    {t.status ? (
                      <div>
                        <span className="bg-light p-2 rounded-circle text-danger">
                          <Countdown
                            date={Date.now() + 15000}
                            renderer={renderer}
                          />
                        </span>
                        <Tooltip title={t.task}>
                          <IconButton>
                            <Chip
                              label={t.task}
                              // onClick={handleClick}
                              sx={{ width: "10rem" }}
                              deleteIcon={<DoneIcon />}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    ) : (
                      <div>
                        <span className="bg-light p-2 rounded-circle text-danger">
                          <Countdown
                            date={Date.now() + 15000}
                            renderer={renderer}
                          />
                        </span>
                        <IconButton>
                          <Chip
                            label={t.task}
                            // onClick={handleClick}
                            sx={{ width: "10rem" }}
                            deleteIcon={<DoneIcon />}
                          />
                        </IconButton>
                      </div>
                    )}
                    <DoneIcon
                      sx={{
                        m: "0.5rem",
                        cursor: "pointer",
                        color: "green",
                        border: "1px solid green",
                      }}
                      onClick={() => handleComplete(t._id, t.task)}
                    />
                    <EditIcon
                      sx={{
                        m: "0.5rem",
                        cursor: "pointer",
                        color: "grey",
                        border: "1px solid grey",
                      }}
                      onClick={() => handleEditClick(t._id, t.name)}
                    />{" "}
                    <DeleteIcon
                      sx={{
                        m: "0.5rem",
                        cursor: "pointer",
                        color: "red",
                        border: "1px solid red",
                      }}
                      onClick={() => handleDeleteClick(t._id, t.task)}
                    />
                    {!t.status ? (
                      <div>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Edit Task</DialogTitle>
                          <DialogContentText
                            sx={{ ml: "2rem", fontWeight: "600" }}
                          >
                            {t.task} :
                          </DialogContentText>
                          <DialogContent>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Edit task"
                              type="email"
                              fullWidth
                              variant="standard"
                              onChange={handleEditChange}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {console.log("t.name", t.task)}
                            <Button onClick={() => handleUpdateClick(t.task)}>
                              Update
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            ) : (
              <div className="empty-list-text-container">
                No task are scheduled <SentimentVeryDissatisfiedIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-3 left-right-panel"></div>
    </div>
  );
}

export default Todo;
