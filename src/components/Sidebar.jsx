import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Divider,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Sidebar = ({ users, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        bgcolor: "#023E8A",
        color: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearchQuery("")}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* User List with Custom Scrollbar */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: 2,
          pr: 1, // Prevents content from hiding under scrollbar
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ADE8F4",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#90E0EF",
            },
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#023E8A",
          },
        }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Box
              key={user.user_id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
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
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 2, opacity: 0.7 }}
          >
            No users found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
