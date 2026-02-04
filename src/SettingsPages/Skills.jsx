import { Box, TextField, Typography } from "@mui/material";

const Skills = () => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Skills & Certifications
      </Typography>

      <TextField fullWidth label="Primary Skill" margin="normal" />

      <TextField fullWidth label="Certification Name" margin="normal" />
    </Box>
  );
};

export default Skills;
