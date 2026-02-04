import { Box, TextField, Typography } from "@mui/material";

const ProjectsInfo = () => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Projects
      </Typography>

      <TextField fullWidth label="Project Name" margin="normal" />

      <TextField
        fullWidth
        label="Allocation (%)"
        type="number"
        margin="normal"
      />
    </Box>
  );
};

export default ProjectsInfo;
