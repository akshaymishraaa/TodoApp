import React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import axios from "axios";

function CompletedPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
//   const [completedTask, setCompletedTask] = React.useState();
    const {completedTask, setCompletedTask} = props

  const openCompleteTasks = Boolean(anchorEl);
  const id = openCompleteTasks ? "simple-popover" : undefined;

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleButtonClose = () => {
    setAnchorEl(null);
  };

  const clearCompletedList = () => {
    setCompletedTask("");
  };

  return (
    <div>
      <div className="d-flex justify-content-lg-start mt-2">
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleButtonClick}
        >
          Completed tasks :{completedTask && completedTask.length}
        </Button>
        <Popover
          id={id}
          open={openCompleteTasks}
          anchorEl={anchorEl}
          onClose={handleButtonClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ width: "100%", height: "20em", overflowY: "scroll" }}
        >
          {completedTask && completedTask.length ? (
            <>
              <button
                className="btn btn-danger float-right mt-1 "
                onClick={clearCompletedList}
              >
                Clear all
              </button>
              <ul className="p-3 m-1">
                {completedTask &&
                  completedTask.length &&
                  completedTask.map((ct) => {
                    return <li>{ct.task}</li>;
                  })}
              </ul>
            </>
          ) : (
            <span className="p-3">No data available</span>
          )}
        </Popover>
      </div>
    </div>
  );
}

export default CompletedPopover;
