import React, { useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'OWNER' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/auth/register', form);
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Stack spacing={3}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <TextField
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="ROLE_OWNER">OWNER</MenuItem>
          <MenuItem value="ROLE_TENANT">TENANT</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleSubmit}>Register</Button>
      </Stack>
    </Container>
  );
};

export default Register;
