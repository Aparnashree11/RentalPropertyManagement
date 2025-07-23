// const fetchProperties = async () => {
//   const res = await axios.get(`http://localhost:8080/api/properties/owner/${username}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   setProperties(res.data);
// };

// useEffect(() => {
//   fetchProperties();
// }, []);

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Container,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getName, getToken } from "../api/auth";
import axios from "axios";
import StatusBox from "../components/StatusBox";

function OwnerDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [lease, setLease] = useState([]);
  const username = getName();
  const token = getToken();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rent: "",
    description: "",
    owner: username,
  });

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_, newValue) => setCurrentTab(newValue);

  const handleLogout = () => {
    // Clear JWT, redirect, etc.
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    address: "",
    rent: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/properties",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Property created successfully!");
        setFormData({ name: "", address: "", rent: "", description: "" }); // Reset form
      }
      handleCloseDialog();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefreshFlag((prev) => !prev); // refresh property list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete property.");
    }
  };

  const handleOpenEdit = (property) => {
    setEditForm({
      id: property.id,
      name: property.name,
      address: property.address,
      rent: property.rent,
      description: property.description,
    });
    setEditOpen(true);
  };

  // Submit updated property
  const handleUpdateSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/properties/${editForm.id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditOpen(false);
      setRefreshFlag((prev) => !prev); // refresh property list
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update property.");
    }
  };

  const handleUpdate = async (lease, val) => {
    try {
      const updateVal = {
        ...lease,
        status: val,
      };
      const response = await axios.put(
        `http://localhost:8080/api/lease/${lease.id}`,
        updateVal,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        alert("Application updated!");
      }
    } catch (error) {
      console.error("Error creating application:", error);
      alert("Application Failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/properties/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperties(response.data);

        const leaseRes = await axios.get(
          `http://localhost:8080/api/lease/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLease(leaseRes.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    if (username) fetchProperties();
  }, [username, refreshFlag]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar / Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hello {username.charAt(0).toUpperCase() + username.slice(1)}!
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Tabs + Content */}
      <Container sx={{ mt: 4 }}>
        <Paper>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Applications" />
            <Tab label="Properties" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {currentTab === 0 && (
            <Box>
              <Typography variant="h5">Received Applications</Typography>
              {lease.length === 0 ? (
                <Typography>No Applications yet.</Typography>
              ) : (
                <List>
                  {lease.map(
                    ({
                      id,
                      leaseStartDate,
                      leaseEndDate,
                      property,
                      status,
                    }) => (
                      <React.Fragment key={id}>
                        <ListItem alignItems="center">
                          <ListItemText
                            primary={property.name}
                            secondary={
                              <Grid
                                display="flex"
                                flexDirection="row"
                                width="100%"
                                alignItems="center"
                                justifyContent="center"
                                mt={1}
                              >
                                <Grid
                                  display="flex"
                                  flexDirection="column"
                                  width="40%"
                                >
                                  <Grid
                                    display="flex"
                                    flexDirection="row"
                                    width="100%"
                                  >
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      Address:{" "}
                                    </Typography>
                                    {property.address}
                                    <br />
                                  </Grid>
                                  <Grid
                                    display="flex"
                                    flexDirection="row"
                                    width="100%"
                                  >
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      Description:{" "}
                                    </Typography>
                                    {property.description}
                                    <br />
                                  </Grid>
                                  <Grid
                                    display="flex"
                                    flexDirection="row"
                                    width="100%"
                                  >
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      Rent:{" "}
                                    </Typography>
                                    ${property.rent}
                                  </Grid>
                                </Grid>
                                <Grid
                                  display="flex"
                                  flexDirection="column"
                                  width="40%"
                                >
                                  <Grid
                                    display="flex"
                                    flexDirection="row"
                                    width="100%"
                                  >
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      Start Date:{" "}
                                    </Typography>
                                    {leaseStartDate}
                                    <br />
                                  </Grid>
                                  <Grid
                                    display="flex"
                                    flexDirection="row"
                                    width="100%"
                                  >
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      End Date:{" "}
                                    </Typography>
                                    {leaseEndDate}
                                  </Grid>
                                </Grid>
                                <Grid
                                  display="flex"
                                  flexDirection="column"
                                  width="10%"
                                  alignItems="right"
                                >
                                  {status == "PENDING" ? (
                                    <>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 1 }}
                                    onClick={() => handleUpdate(
                                      {
                                        id,
                                        leaseStartDate,
                                        leaseEndDate,
                                        property,
                                      },
                                      "APPROVED"
                                    )}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    onClick={() => handleUpdate(
                                      {
                                        id,
                                        leaseStartDate,
                                        leaseEndDate,
                                        property,
                                      },
                                      "REJECTED"
                                    )}
                                  >
                                    Reject
                                  </Button>
                                  </>
                                  ) : (
                                    <StatusBox status={status} />
                                  )}
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    )
                  )}
                </List>
              )}
            </Box>
          )}

          {currentTab === 1 && (
            <Box>
              {/* Properties view */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5">Your Properties</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                >
                  List New Property
                </Button>
              </Box>
              {/* Render properties list here */}
              {properties.length === 0 ? (
                <Typography>No properties found.</Typography>
              ) : (
                <List>
                  {properties.map(
                    ({ id, name, address, rent, description }) => (
                      <React.Fragment key={id}>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <Box>
                              <Button
                                variant="outlined"
                                size="small"
                                sx={{ mr: 1 }}
                                onClick={() =>
                                  handleOpenEdit({
                                    id,
                                    name,
                                    address,
                                    rent,
                                    description,
                                  })
                                }
                              >
                                Update
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDelete(id)}
                              >
                                Delete
                              </Button>
                            </Box>
                          }
                        >
                          <ListItemText
                            primary={name}
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Address:{" "}
                                </Typography>
                                {address}
                                <br />
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Description:{" "}
                                </Typography>
                                {description}
                                <br />
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Rent:{" "}
                                </Typography>
                                ${rent}
                              </>
                            }
                          />
                        </ListItem>
                        <Dialog
                          open={editOpen}
                          onClose={() => setEditOpen(false)}
                          maxWidth="sm"
                          fullWidth
                        >
                          <DialogTitle>Update Property</DialogTitle>
                          <DialogContent>
                            <TextField
                              margin="dense"
                              label="Name"
                              fullWidth
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name: e.target.value,
                                })
                              }
                            />
                            <TextField
                              margin="dense"
                              label="Address"
                              fullWidth
                              value={editForm.address}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  address: e.target.value,
                                })
                              }
                            />
                            <TextField
                              margin="dense"
                              label="Rent"
                              fullWidth
                              type="number"
                              value={editForm.rent}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  rent: e.target.value,
                                })
                              }
                            />
                            <TextField
                              margin="dense"
                              label="Description"
                              fullWidth
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setEditOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdateSubmit}
                              variant="contained"
                            >
                              Update
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Divider component="li" />
                      </React.Fragment>
                    )
                  )}
                </List>
              )}
              {/* Dialog for New Property */}
              <Dialog
                open={open}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                  sx: { borderRadius: 3, p: 2 },
                }}
              >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  List New Property
                </DialogTitle>

                <DialogContent>
                  <Box
                    component="form"
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="Property Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="Rent ($)"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      type="number"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                  <Button onClick={handleCloseDialog} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default OwnerDashboard;
