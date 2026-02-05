import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

function SkillsInfo() {
  const [form, setForm] = useState({
    skillName: "",
    level: "",
    experience: "",
    certificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Skill Name → only text
    if (name === "skillName") {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    // Years of Experience → max 2 digits + decimal allowed
    if (name === "experience") {
      if (!/^\d{0,2}(\.\d?)?$/.test(value)) return;
    }

    // Certificate Upload → PDF / Image only
    if (name === "certificate") {
      const file = files[0];
      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      if (!allowedTypes.includes(file.type)) return;

      setForm({ ...form, certificate: file });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      {/* MAIN HEADING */}
      <Typography variant="h8" sx={{ mb: 3, letterSpacing: 1.5 }}>
        Skills & Certifications
      </Typography>

      <Grid container spacing={3}>
        {/* Skill Name */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2">Skill Name</Typography>
          <TextField
            fullWidth
            name="skillName"
            placeholder="e.g. React"
            value={form.skillName}
            onChange={handleChange}
          />
        </Grid>

        {/* Skill Level */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2">Level</Typography>
          <TextField
            select
            fullWidth
            name="level"
            value={form.level}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </TextField>
        </Grid>

        {/* Years of Experience */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2">Years of Experience</Typography>
          <TextField
            fullWidth
            name="experience"
            placeholder="e.g. 1.5"
            value={form.experience}
            onChange={handleChange}
          />
        </Grid>

        {/* Certificate Upload */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2">Upload Certificate</Typography>

          <Button
            variant="outlined"
            component="label"
            sx={{
              mt: 1,
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              borderRadius: "12px",
              height: "56px",
            }}
          >
            {form.certificate ? form.certificate.name : "Upload PDF / Image"}

            <input
              type="file"
              hidden
              name="certificate"
              accept=".pdf,image/*"
              onChange={handleChange}
            />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SkillsInfo;
