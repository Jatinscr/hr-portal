import { Box, TextField, Typography } from "@mui/material";

const OtherInfo = () => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Other Information
      </Typography>

      <TextField fullWidth label="Emergency Contact Number" margin="normal" />

      <TextField fullWidth label="Government ID Number" margin="normal" />
    </Box>
  );
};

export default OtherInfo;
