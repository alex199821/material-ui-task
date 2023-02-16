import { useState } from "react";
//MUI Components
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Box } from "@mui/material";

const DateFilterComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={(event: Date | null) => setStartDate(event)}
          renderInput={(params) => (
            <TextField sx={{ width: "48%" }} {...params} />
          )}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="End date"
          value={endDate}
          onChange={(event: Date | null) => setEndDate(event)}
          renderInput={(params) => (
            <TextField sx={{ width: "48%" }} {...params} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateFilterComponent;
