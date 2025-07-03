import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getRole } from "../api/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

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
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
