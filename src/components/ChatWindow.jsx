import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../UserContext";

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!selectedUser) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a chat to start messaging
        </Typography>
      </Box>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* 🔵 Chat Header */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: "primary.contrastText",
          color: "primary.main",
          borderRadius: 0,
        }}
      >
        {/* User Profile & Info (Clickable) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
          }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <Avatar src={selectedUser.avatar} />
          <Box>
            <Typography variant="h6">{selectedUser.username}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {selectedUser.is_online
                ? "Online"
                : `Last seen at ${selectedUser.last_seen}`}
            </Typography>
          </Box>
        </Box>

        {/* More Options Menu */}
        <IconButton sx={{ color: "black" }} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Contact Info</MenuItem>
          <MenuItem onClick={handleMenuClose}>Mute Notifications</MenuItem>
          <MenuItem onClick={handleMenuClose}>Clear Chat</MenuItem>
        </Menu>
      </Paper>

      {/* 🗨️ Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundImage: "url('/images/chat-bg-3.jpeg')",
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isMe = msg.sender_id === currentUser.user_id;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    bgcolor: isMe ? "#023E8A" : "#ADE8F4",
                    color: isMe ? "white" : "black",
                    borderRadius: 0.5,
                    p: 0.8,
                  }}
                >
                  {msg.message}
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary">
            No messages yet. Start the conversation!
          </Typography>
        )}
      </Box>

      {/* ✏️ Message Input */}
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "background.paper",
          alignItems: "center",
        }}
      >
        <IconButton color="primary">
          <AddIcon />
        </IconButton>

        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>

      {/* 🟢 RIGHT SIDE DRAWER (CONTACT INFO) */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: "calc(100vw - 400px)" } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              bgcolor: "#023E8A",
              color: "white",
            }}
          >
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setIsDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Contact Info</Typography>
            <IconButton sx={{ color: "white" }}>
              <EditIcon />
            </IconButton>
          </Box>

          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Avatar
              src={selectedUser.avatar}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6">{selectedUser.username}</Typography>
          </Box>

          <Divider />

          {/* Settings Section */}
          <Box sx={{ p: 3 }}>
            {/* 🔕 Mute Notifications */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography>Mute Notifications</Typography>
              <Switch />
            </Box>

            {/* ⏳ Disappearing Messages */}
            <Typography variant="subtitle1">Disappearing Messages</Typography>
            <RadioGroup defaultValue="off">
              <FormControlLabel value="on" control={<Radio />} label="On" />
              <FormControlLabel value="off" control={<Radio />} label="Off" />
            </RadioGroup>

            <Divider sx={{ my: 2 }} />

            {/* ⭐ Add to Favorites */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography>Add to Favorites</Typography>
              <Switch />
            </Box>

            {/* ❌ Delete Chat */}
            <Typography
              variant="body2"
              sx={{ color: "red", cursor: "pointer", mt: 2 }}
            >
              Delete Chat
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ChatWindow;
