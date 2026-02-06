import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Experience = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["Designation", "Company", "role"].includes(name)) {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    // Experience → number + decimal
    if (name === "Experience") {
      if (!/^\d{0,2}(\.\d?)?$/.test(value)) return;
    }

    // // Allocation % (0–100)
    // if (name === "allocation") {
    //   if (!/^\d*$/.test(value)) return;
    //   if (Number(value) > 100) return;
    // }

    // Start Date (future date block)
    if (name === "From" || name === "To") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) return;
    }

    setForm({ ...form, [name]: value });
  };
  return (
    <>
      <Typography variant="h8" sx={{ mb: 3, letterSpacing: 1.5 }}>
        Experience
      </Typography>
      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2">
            Current Experience (Months/Years)
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. 3.5"
            value={form.Experience || ""}
            name="Experience"
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2">Current Designation</Typography>
          <TextField
            fullWidth
            placeholder="e.g. Frontend Developer"
            name="Designation"
            value={form.Designation || ""}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Role Summary
        </Typography>
        <textarea
          placeholder="Enter role summary"
          rows={3}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            border: "1px solid #d0d5dd",
            padding: "14px 16px",
            fontSize: "14px",
            fontFamily: "inherit",
            outline: "none",
          }}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h8" sx={{ mb: 3, letterSpacing: 1.5 }}>
          Previous Company
        </Typography>

        {/* Company Name + Designation */}
        <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">Company Name</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Infosys"
              name="Company"
              value={form.Company || ""}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">Designation</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Software Engineer"
              name="role"
              value={form.role || ""}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Role Summary
          </Typography>
          <textarea
            placeholder="Enter role summary"
            rows={3}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              border: "1px solid #d0d5dd",
              padding: "14px 16px",
              fontSize: "14px",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
        </Box>
        {/* From – To */}
        <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">From</Typography>
            <TextField
              type="date"
              name="From"
              value={form.From || ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">To</Typography>
            <TextField
              type="date"
              name="To"
              value={form.To || ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: " flex-start",
            alignContent: "center",
            mt: 3,
          }}
        >
          <Button variant="black-Size">Add Company</Button>
        </Box>
      </Box>
    </>
  );
};

export default Experience;
