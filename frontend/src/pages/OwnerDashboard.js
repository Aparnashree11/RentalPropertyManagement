import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";
import { getName, getToken } from "../api/auth";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rent, setRent] = useState("");

  const username = getName(); 
  const token = getToken();

  const fetchProperties = async () => {
    const res = await axios.get(`http://localhost:8080/api/properties/owner/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProperties(res.data);
  };

  const handleAddProperty = async () => {
    await axios.post(
      "http://localhost:8080/api/properties",
      { name, address, rent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setName("");
    setAddress("");
    setRent("");
    fetchProperties();
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Owner Portal</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Add New Property</Typography>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ my: 1 }} />
        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth sx={{ my: 1 }} />
        <TextField label="Rent" type="number" value={rent} onChange={(e) => setRent(e.target.value)} fullWidth sx={{ my: 1 }} />
        <Button variant="contained" onClick={handleAddProperty}>Add Property</Button>
      </Box>

      <Typography variant="h6">Your Properties</Typography>
      <Grid container spacing={2}>
        {properties.map((prop) => (
          <Grid item xs={12} md={6} key={prop.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{prop.name}</Typography>
                <Typography>{prop.address}</Typography>
                <Typography>₹{prop.rent}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default OwnerDashboard;
