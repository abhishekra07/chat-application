import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Sidebar = ({ users, onSelectUser }) => {
  return (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        bgcolor: "#023E8A",
        color: "white",
        p: 2,
      }}
    >
      {/* Logo */}
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        ChatApp
      </Typography>

      <Divider sx={{ my: 2, bgcolor: "#ADE8F4" }} />

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        size="small"
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* User List */}
      {users.map((user) => (
        <Box
          key={user.user_id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1,
            mt: 2,
            cursor: "pointer",
            "&:hover": { bgcolor: "#ADE8F4", color: "black" },
          }}
          onClick={() => onSelectUser(user)}
        >
          <Avatar src={user.avatar} />
          <Box>
            <Typography variant="body1">{user.username}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user.last_message}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
