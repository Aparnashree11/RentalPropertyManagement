import { Box, Typography } from "@mui/material";

const StatusBox = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          borderColor: "green",
          color: "green",
          backgroundColor: "#e6ffe6",
        };
      case "rejected":
        return {
          borderColor: "red",
          color: "red",
          backgroundColor: "#ffe6e6",
        };
      case "pending":
        return {
          borderColor: "orange",
          color: "orange",
          backgroundColor: "#fff5e6",
        };
      default:
        return {
          borderColor: "gray",
          color: "gray",
          backgroundColor: "#f0f0f0",
        };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <Box
      sx={{
        border: "2px solid",
        borderRadius: "8px",
        p: 1,
        display: "inline-block",
        fontWeight: "bold",
        textTransform: "uppercase",
        justifyItems: "center",
        ...styles,
      }}
    >
      <Typography variant="body2">{status}</Typography>
    </Box>
  );
};

export default StatusBox;
