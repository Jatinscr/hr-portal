import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function PersonalInfo() {
  const [employmentType, setEmploymentType] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    mobile: "",
    altMobile: "",
    designation: "",
    joiningDate: "",
    department: "",
    employmentType: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "email") {
      if (!value.includes("@")) {
        error = "Please enter a valid email address";
      }
    }
    if (name === "mobile" || name === "altMobile") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }
    if (name === "designation" || name === "department")
      if (!/^[a-zA-Z ]*$/.test(value)) {
        return;
      }
    if (name === "joiningDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        setForm((prev) => ({ ...prev, joiningDate: value }));
      } else {
        alert("Future date allowed nahi hai ");
      }
      return;
    }
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: error });
  };
  return (
    <>
      <Typography variant="h8" sx={{ mb: 1, letterSpacing: 1.5 }}>
        {" "}
        Personal Information
      </Typography>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}> Primary Email </Typography>
          <TextField
            fullWidth
            placeholder="Enter primary email"
            inputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}> Primary Mobile Number </Typography>
          <TextField
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            fullWidth
            placeholder="Enter mobile number"
            inputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}> Alternate Mobile Number </Typography>
          <TextField
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            fullWidth
            placeholder="Enter alternate number"
            inputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}> Current Designation </Typography>
          <TextField
            name="designation"
            value={form.designation}
            onChange={handleChange}
            fullWidth
            placeholder="Enter designation"
            inputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}> Department</Typography>
          <TextField
            name="designation"
            value={form.designation}
            onChange={handleChange}
            fullWidth
            placeholder="Enter department"
            inputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}> Employee ID</Typography>
          <TextField
            fullWidth
            placeholder="Enter Employee ID"
            // inputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}>Joining Date</Typography>
          <TextField
            fullWidth
            type="date"
            // InputLabelProps={{ shrink: true }}
            // InputProps={{ sx: { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{mb:1}}>Employment Type</Typography>
          <TextField
            select
            fullWidth
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            // placeholder="Select employment type"
            // InputProps={{ sx: { borderRadius: 2 } }}
          >
            <MenuItem value="" disabled>
              Select employment type
            </MenuItem>
            <MenuItem value="fulltime">Full-time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="intern">Intern</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          mt: 6,
          gap: 2,
        }}
      >
        <Button variant="black-Size">Edit</Button>
        <Button variant="black-Size">Save</Button>
      </Box>
    </>
  );
}
export default PersonalInfo;
