import { Box, Typography, TextField, Grid, Button } from "@mui/material";

const BasicInfo = () => {
  return (
    <Box
      sx={{
        maxWidth: 900,
        background: "#fff",
        borderRadius: 2,
        p: 3,
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" mb={3}>
        Basic Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter first name"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter last name"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" placeholder="Enter email" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contact Number"
            placeholder="Enter contact number"
          />
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Box>
  );
};

export default BasicInfo;
