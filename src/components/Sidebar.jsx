import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Divider,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoupeRoundedIcon from "@mui/icons-material/LoupeRounded";

const Sidebar = ({ users, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

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
      {/* Header with Logo & Icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ChatApp
        </Typography>

        {/* Icons */}
        <Box>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setIsNewChatOpen(true)}
          >
            <LoupeRoundedIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

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

      {/* Drawer for "New Chat" */}
      <Drawer
        anchor="left"
        open={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: "400px" } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              bgcolor: "white",
              borderBottom: "1px solid #ddd",
            }}
          >
            <IconButton onClick={() => setIsNewChatOpen(false)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              New Chat
            </Typography>
            <Box sx={{ width: 40 }} />
          </Box>

          {/* Placeholder for New Chat content */}
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1">
              New chat feature coming soon...
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Menu for "Three Dots" */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            bgcolor: "white",
            color: "black",
            borderRadius: "8px",
            p: 1,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left", // Opens below and to the right of the icon
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", // Aligns the top-right of the menu with the icon
        }}
      >
        <MenuItem onClick={() => alert("New Group clicked!")}>
          New Group
        </MenuItem>
        <MenuItem onClick={() => alert("Starred Messages clicked!")}>
          Starred Messages
        </MenuItem>
        <MenuItem onClick={() => alert("Log out clicked!")}>Log out</MenuItem>
      </Menu>
    </Box>
  );
};

export default Sidebar;
