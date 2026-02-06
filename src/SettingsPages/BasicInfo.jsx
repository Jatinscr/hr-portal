import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const initialForm = {
  dob: "",
  gender: "",
  bio: "",
  roleSummary: "",
  experience: "",
  location: "",
  languages: "",
  workPreference: "",
};

const initialErrors = {};

function AdditionalInfo() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "dob") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) return;

      setForm((prev) => ({ ...prev, dob: value }));
      return;
    }

    // Experience → numbers only
    if (name === "experience") {
      if (!/^\d{0,2}(\.\d?)?$/.test(value)) return;
    }

    // Role Summary & Bio → everything allowed
    if (name === "roleSummary" || name === "bio") {
      setForm((prev) => ({ ...prev, [name]: value }));
      return;
    }

    // Text-only fields → numbers not allowed
    const textOnlyFields = ["location", "languages", "gender"];

    if (textOnlyFields.includes(name)) {
      if (!/^[a-zA-Z ,]*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  return (
    <>
      <Typography variant="h8" sx={{ mb: 1, letterSpacing: 1.5 }}>
        Additional Information
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ mb: 1 }}>
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
        </Grid>

        {/* Short Bio */}
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Short Bio / About Me
          </Typography>
          <textarea
            placeholder="Tell something about yourself"
            rows={5}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              border: "1px solid #d0d5dd",
              padding: "14px 16px",
              fontSize: "14px",
              fontFamily: "inherit",
              outline: "none",
              resize: "vertical", // user resize kar sake
            }}
          />
        </Grid>
        {/* Date of Birth */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Date of Birth
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Gender{" "}
          </Typography>
          <TextField
            select
            fullWidth
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>

        {/* Years of Experience */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Years of Experience
          </Typography>
          <TextField
            fullWidth
            name="experience"
            placeholder="e.g. 3"
            value={form.experience}
            onChange={handleChange}
            error={!!errors.experience}
            helperText={errors.experience}
          />
        </Grid>

        {/* Role Summary */}

        {/* Current Location */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Current Location
          </Typography>
          <TextField
            fullWidth
            name="location"
            placeholder="City, Country"
            value={form.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
          />
        </Grid>

        {/* Languages Known */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Languages Known
          </Typography>
          <TextField
            fullWidth
            name="languages"
            placeholder="English, Hindi"
            value={form.languages}
            onChange={handleChange}
            error={!!errors.languages}
            helperText={errors.languages}
          />
        </Grid>

        {/* Work Preference */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Work Preference
          </Typography>
          <TextField
            select
            fullWidth
            name="workPreference"
            value={form.workPreference}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
            <MenuItem value="onsite">Onsite</MenuItem>
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

export default AdditionalInfo;
