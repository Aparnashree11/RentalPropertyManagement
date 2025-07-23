import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  AppBar,
  Typography,
  Container,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import { getToken, getName } from "../api/auth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import StatusBox from "../components/StatusBox";

function TenantDashboard() {
  const [properties, setProperties] = useState([]);
  const [lease, setLease] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [applyOpen, setApplyOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updateStartDate, setUpdateStartDate] = useState(null);
  const [updateEndDate, setUpdateEndDate] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const username = getName();
  const token = getToken();
  const [property, setProperty] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_, newValue) => setCurrentTab(newValue);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return; // Exit early if username is still undefined

      try {
        const leaseRes = await axios.get(
          `http://localhost:8080/api/lease/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLease(leaseRes.data);

        const propRes = await axios.get(
          "http://localhost:8080/api/properties",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProperties(propRes.data);
      } catch (error) {
        console.error("Error fetching lease or properties:", error);
      }
    };

    fetchData();
  }, [username, token, refreshKey]);

  const handleClose = () => setApplyOpen(false);
  const handleOpen = () => setApplyOpen(true);

  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const formatted = `${month}/${day}/${year}`;
    return new Date(formatted);
  };

  const handleUpdateOpen = (lease) => {
    setUpdateStartDate(convertDateFormat(lease.leaseStartDate));
    setUpdateEndDate(convertDateFormat(lease.leaseEndDate));
    setUpdate(lease);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdate = async () => {
    const updateVal = {
      ...update,
      leaseStartDate: updateStartDate?.toISOString().split("T")[0],
      leaseEndDate: updateEndDate?.toISOString().split("T")[0]
    } 
    try {
      const response = await axios.put(
        `http://localhost:8080/api/lease/${update.id}`,
        updateVal,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        alert("Application updated!");
        setUpdateStartDate(null);
        setUpdateEndDate(null);
        setUpdate({});
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error creating application:", error);
      alert("Application Failed. Please try again.");
    }
    handleUpdateClose();
  };

  const handleOpenApply = () => {
    if (startDate && endDate) {
      handleApply({
        property: property,
        leaseStartDate: startDate.toISOString().split("T")[0],
        leaseEndDate: endDate.toISOString().split("T")[0],
        tenant: username,
      });
    }
    setRefreshKey((prev) => prev + 1);
    handleClose();
  };

  const handleApply = async (application) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/lease",
        application,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        alert("Application sent!");
        setStartDate(null); // Reset form
        setEndDate(null);
      }
    } catch (error) {
      console.error("Error creating application:", error);
      alert("Application Failed. Please try again.");
    }
  };

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

      {/* Tabs and Contents */}
      <Container sx={{ mt: 4 }}>
        <Paper>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Properties" />
            <Tab label="Applications" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {currentTab === 0 && (
            <Box>
              <Typography variant="h5">Properties</Typography>
              {properties.length === 0 ? (
                <Typography>No properties found.</Typography>
              ) : (
                <List>
                  {properties.map(
                    ({ id, name, address, rent, description, owner }) => (
                      <React.Fragment key={id}>
                        <ListItem
                          alignItems="center"
                          secondaryAction={
                            <Box>
                              <Button
                                variant="outlined"
                                size="small"
                                sx={{ mr: 1 }}
                                onClick={() => {
                                  setProperty({
                                    id,
                                    name,
                                    address,
                                    rent,
                                    description,
                                    owner,
                                  });
                                  handleOpen();
                                }}
                              >
                                Apply
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
              <Typography variant="h5">Applications</Typography>
              {lease.length === 0 ? (
                <Typography>No Applications found.</Typography>
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
                                  <StatusBox status={status} />
                                  {status == "PENDING" && (
                                    <>
                                      <Typography
                                        variant="body2"
                                        sx={{ mt: 1 }}
                                      >
                                        <Link
                                          component="button"
                                          onClick={() => {
                                            handleUpdateOpen({
                                              id,
                                              leaseStartDate,
                                              leaseEndDate,
                                              property,
                                              status,
                                            });
                                          }}
                                          sx={{
                                            color: "blue",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                          }}
                                        >
                                          Update
                                        </Link>

                                        <Link
                                          component="button"
                                          onClick={async () => {
                                            const confirmed = window.confirm(
                                              "Are you sure you want to cancel this lease?"
                                            );
                                            if (!confirmed) return;
                                            try {
                                              await axios.delete(
                                                `http://localhost:8080/api/lease/${id}`,
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`,
                                                  },
                                                }
                                              );
                                              alert(
                                                "Lease cancelled successfully."
                                              );
                                              setRefreshKey((prev) => prev + 1);
                                            } catch (error) {
                                              console.error(
                                                "Failed to cancel lease:",
                                                error
                                              );
                                              alert("Failed to cancel lease.");
                                            }
                                          }}
                                          sx={{
                                            color: "red",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            marginLeft: 2,
                                          }}
                                        >
                                          Cancel
                                        </Link>
                                      </Typography>
                                    </>
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
        </Box>
        <Dialog open={applyOpen} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Select Duration</DialogTitle>
          <DialogContent dividers>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField fullWidth sx={{ mb: 2 }} {...params} />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleOpenApply}
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={updateOpen}
          onClose={handleUpdateClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Select Duration</DialogTitle>
          <DialogContent dividers>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <DatePicker
                  label="Start Date"
                  value={updateStartDate}
                  onChange={(newValue) => setUpdateStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField fullWidth sx={{ mb: 2 }} {...params} />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={updateEndDate}
                  onChange={(newValue) => setUpdateEndDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default TenantDashboard;
