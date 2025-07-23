import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  MenuItem,
  Box
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getRole } from "../api/auth";

export default function Home() {
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async () => {
    console.log("Login:", loginData);
    try {
      const res = await axios.post("/api/auth/login", loginData);

      const token = res.data;
      localStorage.setItem("token", token);

      const role = getRole(token);

      if (role === "ROLE_OWNER") {
        navigate("/owner");
      } else if (role === "ROLE_TENANT") {
        navigate("/tenant");
      } else {
        alert("Unknown role");
      }

      setLoginData({username: "", password: ""})
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleRegisterSubmit = async () => {
    console.log("Register:", registerData);
    try {
      await axios.post("/api/auth/register", registerData);
      alert("User registered successfully!");
      setRegisterData({
    username: "",
    password: "",
    role: "",
  })
      setTab(0);
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      {/* Left section - Title */}
      <Grid
        item
        width="70%"
        xs={12}
        md={7}
        sx={{
          backgroundImage: "linear-gradient(to right, #1976d2, #f5f5f5)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "Left",
          px: 4,
        }}
      >
        <Typography variant="h1" fontWeight="bold" gutterBottom>
          Rental Property Management
        </Typography>
        <Typography variant="h5">
          Simplify your lease and property management.
        </Typography>
      </Grid>

      {/* Right section - Tabs + Forms */}
      <Grid
        item
        width="30%"
        xs={12}
        md={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper
          elevation={6}
          sx={{ width: "100%", maxWidth: 400, p: 3, height: "50%" }}
        >
          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 4 }}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {tab === 0 && (
            <>
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2, // Adds vertical spacing between children
                  width: "100%", // Full width container
                  mt: 2,
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="password"
                  label="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleLoginSubmit}
                >
                  Login
                </Button>
              </Box>
            </>
          )}

          {tab === 1 && (
            <>
              <Typography variant="h5" gutterBottom>
                Register
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
              <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <TextField
                fullWidth
                margin="normal"
                select
                label="Role"
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
              >
                <MenuItem value="ROLE_OWNER">Owner</MenuItem>
                <MenuItem value="ROLE_TENANT">Tenant</MenuItem>
              </TextField>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleRegisterSubmit}
              >
                Register
              </Button>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
