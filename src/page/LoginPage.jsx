import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle authentication logic (API call)
    console.log("Logging in with:", formData);
    setMessage("✅ Login successful!");
    setTimeout(() => navigate("/home"), 2000);
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
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Welcome back! Please login to your account
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

          <Box display="flex" justifyContent="flex-end">
            <Link href="#" variant="body2" color="primary" sx={{ mt: 1 }}>
              Forgot Password?
            </Link>
          </Box>

          {message && (
            <Typography variant="body2" color="green" mt={1}>
              {message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#023E8A" }}
          >
            Login
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
          Don't have an account?{" "}
          <Link
            href="/signup"
            style={{
              textDecoration: "none",
              color: "#023E8A",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
