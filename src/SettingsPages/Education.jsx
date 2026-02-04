import { Box, TextField, Typography } from "@mui/material";

const Education = () => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Education
      </Typography>

      <TextField fullWidth label="Highest Qualification" margin="normal" />

      <TextField fullWidth label="Institute Name" margin="normal" />
    </Box>
  );
};

export default Education;
