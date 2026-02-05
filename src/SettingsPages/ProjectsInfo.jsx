import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

function ProjectsInfo() {
  const [form, setForm] = useState({
    projectName: "",
    clientType: "",
    role: "",
    allocation: "",
    startDate: "",
    status: "active",

    pastProjectName: "",
    duration: "",
    pastRole: "",
    pastStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // TEXT ONLY (numbers block)
    if (["projectName", "role", "pastProjectName", "pastRole"].includes(name)) {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    // Allocation % (0–100)
    if (name === "allocation") {
      if (!/^\d*$/.test(value)) return;
      if (Number(value) > 100) return;
    }

    // Start Date (future date block)
    if (name === "startDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) return;
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      {/* MAIN HEADING */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h8" sx={{ letterSpacing: 1.5 }}>
          Projects
        </Typography>
      </Box>

      {/* CURRENT PROJECTS */}
      <Typography variant="body2" sx={{ mb: 3 }}>
        Current Projects :-
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Project Name
          </Typography>
          <TextField
            fullWidth
            name="projectName"
            placeholder="Enter project name"
            value={form.projectName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Client / Internal
          </Typography>
          <TextField
            select
            fullWidth
            name="clientType"
            value={form.clientType}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="internal">Internal</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2">Role in Project</Typography>
          <TextField
            fullWidth
            name="role"
            placeholder="e.g. Frontend Developer"
            value={form.role}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {" "}
            Allocation %
          </Typography>
          <TextField
            fullWidth
            name="allocation"
            placeholder="e.g. 50"
            value={form.allocation}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Start Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Status
          </Typography>
          <TextField
            select
            fullWidth
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="active">Active</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
        }}
      >
        <Button variant="black-Size">Add Project</Button>
      </Box>
      <Divider />

      {/* PAST PROJECTS */}
      <Typography variant="body2" sx={{ mt: 3, mb: 2 }}>
        Past Projects :-
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Project Name
          </Typography>
          <TextField
            fullWidth
            name="pastProjectName"
            placeholder="Enter project name"
            value={form.pastProjectName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Duration
          </Typography>
          <TextField
            fullWidth
            name="duration"
            placeholder="Jan 2022 - Dec 2022"
            value={form.duration}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Role
          </Typography>
          <TextField
            fullWidth
            name="pastRole"
            placeholder="Your role"
            value={form.pastRole}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Status
          </Typography>
          <TextField
            select
            fullWidth
            name="pastStatus"
            value={form.pastStatus}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: " flex-start",
          alignContent: "center",
          mt:3
        }}
      >
        <Button variant="black-Size">Add Project</Button>
      </Box>
    </>
  );
}

export default ProjectsInfo;
