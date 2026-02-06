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
  const [skillInput, setSkillInput] = useState({
    skillName: "",
    level: "",
  });
  const [skills, setSkills] = useState([]);
  const addSkill = () => {
    if (!skillInput.skillName || !skillInput.level) return;
    setSkills([
      ...skills,
      {
        skillName: skillInput.skillName,
        level: skillInput.level,
      },
    ]);
    setSkillInput({ skillName: "", level: "" });
  };

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
      {/* Skill Name */}
      {/* <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6}> */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", gap: 3, mt: 2 }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Skill Name
          </Typography>
          <TextField
            fullWidth
            name="skillName"
            placeholder="Enter Your Skills"
            value={skillInput.skillName}
            onChange={(e) =>
              /^[a-zA-Z ]*$/.test(e.target.value) &&
              setSkillInput({ ...skillInput, skillName: e.target.value })
            }
          />
        </Box>
        {/* </Grid> */}

        {/* Skill Level */}
        {/* // <Grid item  md={6}> */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Level
          </Typography>
          <TextField
            select
            fullWidth
            name="level"
            value={skillInput.level}
            onChange={(e) =>
              setSkillInput({ ...skillInput, level: e.target.value })
            }
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </TextField>
        </Box>
      </Box>
      {skills.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Your skills
          </Typography>
          {skills.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1.5,
                mb: 1,
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <Typography>{item.skillName}</Typography>
              <Typography color="#111">{item.level}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* </Grid>
        </Grid> */}
      <Box sx={{ display: "flex", mt: 2 }}>
        <Button
          // fullWidth
          variant="black-Size"
          // sx={{ height: "48px", borderRadius: "12px" }}
          onClick={addSkill}
        >
          Add
        </Button>
        {/* </Grid> */}
      </Box>
      <Box sx={{ mt: 4 }}>
        {" "}
        <Typography variant="h8" sx={{ letterSpacing: 1.5 }}>
          Certifications
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Years of Experience */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Years of Experience
          </Typography>
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
          <Typography variant="body2" sx={{ mb: 1 }}>
            Upload Certificate
          </Typography>

          <Button
            variant="outlined"
            component="label"
            sx={{
              // mt: 1,
              width: "100%",

              justifyContent: "flex-start",
              textTransform: "none",
              borderRadius: "12px",
              height: "48px",
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
