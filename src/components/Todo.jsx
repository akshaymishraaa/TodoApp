import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Countdown from "react-countdown";
import CompletedPopover from "./CompletedPopover";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MenuListComposition from "./Menu";
import AddTask from "./AddTask";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";

function Todo() {
  const [editTask, setEditTask] = React.useState("");
  const [dataFromServer, setDataFromServer] = React.useState();
  const [completedTask, setCompletedTask] = React.useState();
  const [isEnable, setIsEnable] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [tabValue, setTabValue] = React.useState("1");

  let { userId } = useParams();

  const getTodoListData = () => {
    axios.get(`http://localhost:8090/${userId}`)
    .then((response) => {
      setDataFromServer(response.data.reverse());
      // setValue(response.data.map((d)=>d.deadline))
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
      .delete(`http://localhost:8090/completeTask/${id}`)
      .then((resp) => {
        getTodoListData();
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:8090/getCompletedTask").then((response) => {
      setCompletedTask(response.data);
      console.log('completedddd', response)
    });
  };
  const postCompletedDatToServer = (payload,userId)=>{
    axios.post('http://localhost:8090/postCompletedData',{
      userId:userId,
      task:payload.task,
      status:payload.status
    })
    .then((response)=>{
      fetchCompletedDataFromServer()
      getTodoListData();
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const fetchCompletedDataFromServer = () => {
    axios.get(`http://localhost:8090/getCompletedTask/${userId}`).then((response) => {
      setCompletedTask(response.data);
      console.log("logggg", response.data);
     })
     .catch((err)=>{
      console.log(err);
     })
  };


  React.useEffect(() => {
    getTodoListData();
    fetchCompletedDataFromServer();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = (param,userId,id) => {
    console.log('task109', param)
    deleteTaskFromServer(id);
    postCompletedDatToServer(param,userId)
    completedDataFromServer(param._id);
    getTodoListData()
    
    toast("Task completed successfully");
  };
  const handleUpdateClick = async (task) => {
    updateTaskOnServer(task);
    toast(`${task} Task updated successfully`);
    setOpen(false);
  };
  const handleEditClick = (id) => {
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
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log("date", month, day, year);
    return [day, month, year].join("-");
  }

  return (
    <div className="row">
      <div className="app-container col">
        <div className="d-flex justify-content-between">
          <CompletedPopover
            completedTask={completedTask}
            setCompletedTask={setCompletedTask}
          />
          <MenuListComposition />
        </div>
        <div className="w-100">
          <AddTask
            getTodoListData={getTodoListData}
            setEditTask={setEditTask}
            editTask={editTask}
            completedTask={completedTask}
            setCompletedTask={setCompletedTask}
            value={value}
            setValue={setValue}

          />
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Task list:" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div
                className={
                  dataFromServer && dataFromServer.length > 0
                    ? "task-container"
                    : ""
                }
              >
                
                <div>
                  {dataFromServer && dataFromServer.length > 0 ? (
                    dataFromServer.map((t, index) => {
                      return (
                        <div className="mt-2 d-flex ">
                          <div>
                            <div className={"d-flex justify-content-center"}>
                              <Tooltip title={t.data.task}>
                                <IconButton>
                                  <Chip
                                    label={t.data.task}
                                    // onClick={handleClick}
                                    sx={{ width: "10rem" }}
                                    deleteIcon={<DoneIcon />}
                                  />
                                </IconButton>
                              </Tooltip>
                              <DoneIcon
                                sx={{
                                  m: "0.5rem",
                                  cursor: "pointer",
                                  color: "green",
                                  border: "1px solid green",
                                }}
                                onClick={() => handleComplete(t.data, t.userId,t._id)}
                              />
                              <EditIcon
                                sx={{
                                  m: "0.5rem",
                                  cursor: "pointer",
                                  color: "grey",
                                  border: "1px solid grey",
                                }}
                                onClick={() => handleEditClick(t._id)}
                              />{" "}
                              <DeleteIcon
                                sx={{
                                  m: "0.5rem",
                                  cursor: "pointer",
                                  color: "red",
                                  border: "1px solid red",
                                }}
                                onClick={() => handleDeleteClick(t._id, t.data.task)}
                              />
                            </div>
                          </div>
                          <span className="timestamp-container">
                            {formatDate(t.data.timestamp)}
                          </span>
                          <div className="d-flex justify-content-lg-start">
                            {t.data.deadline !== null ? (
                              <span className="p-2 text-danger">
                                <Countdown
                                  date={new Date(t.data.deadline * 1000)}
                                  renderer={renderer}
                                />
                                {console.log("valueeee9999", value)}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
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
                                  {console.log("t.name", t.data.task)}
                                  <Button
                                    onClick={() => handleUpdateClick(t.data.task)}
                                  >
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
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default Todo;
