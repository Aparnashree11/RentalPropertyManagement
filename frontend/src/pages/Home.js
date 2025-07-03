import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <Typography variant="h3" gutterBottom>Property Lease Portal</Typography>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" component={Link} to="/login">Login</Button>
        <Button variant="outlined" component={Link} to="/register">Register</Button>
      </Stack>
    </div>
  );
}

export default Home;
