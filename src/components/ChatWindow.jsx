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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done"; // Single tick
import DoneAllIcon from "@mui/icons-material/DoneAll"; // Double tick
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"; // Green dot
import { useUser } from "../UserContext";

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        {/* User Profile & Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={selectedUser.avatar} />
          <Box>
            <Typography variant="h6">{selectedUser.username}</Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, display: "flex", alignItems: "center" }}
            >
              {selectedUser.is_online ? (
                <>
                  Online{" "}
                  <FiberManualRecordIcon
                    sx={{ fontSize: 10, color: "green", ml: 0.5 }}
                  />
                </>
              ) : (
                `Last seen at ${selectedUser.last_seen}`
              )}
            </Typography>
          </Box>
        </Box>

        {/* More Options Menu */}
        <IconButton sx={{ color: "black" }} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        {/* Dropdown Menu */}
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
          bgcolor: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isMe = msg.sender_id === currentUser.user_id;
            let tickIcon = null;

            if (isMe) {
              if (msg.status === "sent") {
                tickIcon = <DoneIcon fontSize="small" />;
              } else if (msg.status === "delivered") {
                tickIcon = <DoneAllIcon fontSize="small" />;
              } else if (msg.status === "read") {
                tickIcon = (
                  <DoneAllIcon fontSize="small" sx={{ color: "#53bdeb" }} />
                );
              }
            }

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                {/* Avatar for incoming messages */}
                {!isMe && <Avatar src={selectedUser.avatar} sx={{ mr: 1 }} />}

                <Box
                  key={msg.message_id}
                  sx={{
                    //   bgcolor: isMe ? "#023E8A" : "#ADE8F4",
                    //   color: isMe ? "white" : "black",
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "60%",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: isMe ? "#023E8A" : "#ADE8F4",
                      color: isMe ? "white" : "black",
                      p: 0.8,
                    }}
                  >
                    {msg.message}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {msg.sent_at} {tickIcon}
                  </Typography>
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
        {/* 📎 File Upload Button */}
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
    </Box>
  );
};

export default ChatWindow;
