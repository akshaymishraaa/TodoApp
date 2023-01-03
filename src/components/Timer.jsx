import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

function Timer(props) {
  const [activeTimer, setActiveTimer] = React.useState(false);
    const {value,setValue} = props;

  return (
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
  );
}

export default Timer;
