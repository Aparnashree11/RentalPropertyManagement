import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../api/auth";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";

function TenantDashboard() {
  const [properties, setProperties] = useState([]);
  const [lease, setLease] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const leaseRes = await axios.get("http://localhost:8080/api/leases/my-lease", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setLease(leaseRes.data);

      if (!leaseRes.data) {
        const propRes = await axios.get("http://localhost:8080/api/properties", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setProperties(propRes.data);
      }
    };
    fetchData();
  }, []);

  const applyForLease = async (propertyId) => {
    await axios.post(
      "http://localhost:8080/api/leases/apply",
      { propertyId },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    window.location.reload();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Tenant Portal</Typography>
      {lease ? (
        <Card>
          <CardContent>
            <Typography variant="h5">Your Leased Property</Typography>
            <Typography>Property: {lease.propertyName}</Typography>
            <Typography>Status: {lease.status}</Typography>
            <Typography>Agreement: {lease.agreementText}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{property.name}</Typography>
                  <Typography>{property.description}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => applyForLease(property.id)}
                  >
                    Apply for Lease
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default TenantDashboard;
