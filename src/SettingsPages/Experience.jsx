import { Box, TextField, Typography } from "@mui/material";

const Experience = () => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Experience
      </Typography>

      <TextField fullWidth label="Current Designation" margin="normal" />

      <TextField
        fullWidth
        label="Total Experience (Years)"
        type="number"
        margin="normal"
      />
    </Box>
  );
};

export default Experience;
