import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    // TODO: Handle API request for signup
    console.log("User Registered:", formData);
    setMessage("✅ Registration successful! Please login.");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#023E8A",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: "360px", textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Create a new account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="dense"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="dense"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {message && (
            <Typography
              variant="body2"
              color={message.includes("✅") ? "green" : "red"}
              mt={1}
            >
              {message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#023E8A" }}
          >
            Sign Up
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton color="primary">
            <GoogleIcon />
          </IconButton>
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" mt={2}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#023E8A",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;
