import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
  Popover,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done"; // Single tick
import DoneAllIcon from "@mui/icons-material/DoneAll"; // Double tick
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"; // Green dot
import EmojiPicker from "emoji-picker-react";
import { useUser } from "../UserContext";

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);

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

  // Handle Emoji Picker
  const handleEmojiClick = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleEmojiSelect = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
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
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, display: "flex", alignItems: "center" }}
            >
              {selectedUser.is_online ? (
                <>
                  Online
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
          backgroundImage: "url('/images/chat-bg-3.jpeg')", // Use a local image inside public folder
          // backgroundSize: "cover", // Ensures it covers the full area
          // backgroundPosition: "center", // Centers the image
          // backgroundRepeat: "no-repeat", // Prevents repeating
          // backgroundAttachment: "fixed", // Keeps the image fixed when scrolling
          display: "flex",
          flexDirection: "column",
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
          // "&::-webkit-scrollbar-track": {
          //   backgroundColor: "#023E8A",
          // },
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isMe = msg.sender_id === currentUser.user_id;
            let tickIcon = null;

            if (isMe) {
              if (msg.status === "sent") {
                tickIcon = <DoneIcon sx={{ fontSize: "12px" }} />;
              } else if (msg.status === "delivered") {
                tickIcon = <DoneAllIcon sx={{ fontSize: "12px" }} />;
              } else if (msg.status === "read") {
                tickIcon = (
                  <DoneAllIcon sx={{ color: "#53bdeb", fontSize: "12px" }} />
                );
              }
            }

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                {/* Avatar for incoming messages */}
                {/* {!isMe && <Avatar src={selectedUser.avatar} sx={{ mr: 1 }} />} */}

                <Box
                  key={msg.message_id}
                  sx={{
                    //   bgcolor: isMe ? "#023E8A" : "#ADE8F4",
                    //   color: isMe ? "white" : "black",
                    p: 0.25,
                    // borderRadius: 2,
                    maxWidth: "60%",
                    // mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: isMe ? "#023E8A" : "#ADE8F4",
                      // bgcolor: isMe ? "#023E8A" : "#46dcf0",
                      color: isMe ? "white" : "black",
                      borderRadius: 0.5,
                      p: 0.8,
                    }}
                  >
                    {msg.message}{" "}
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.5, fontSize: "10px" }}
                    >
                      {msg.sent_at} {tickIcon}
                    </Typography>
                  </Typography>
                  {/* <Typography
                    variant="caption"
                    sx={{ opacity: 0.5, fontSize: "12px" }}
                  >
                    {msg.sent_at} {tickIcon}
                  </Typography> */}
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
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          bgcolor: "background.paper",
        }}
      >
        {/* 📎 File Upload Button */}
        <IconButton color="primary">
          <AddIcon />
        </IconButton>

        {/* Emoji Picker Button */}
        {/* <IconButton color="primary" onClick={handleEmojiClick}>
          <EmojiEmotionsRoundedIcon />
        </IconButton> */}

        {/* Emoji Picker Popover */}
        <Popover
          open={Boolean(emojiAnchorEl)}
          anchorEl={emojiAnchorEl}
          onClose={handleEmojiClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </Popover>

        {/* Message Input */}
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleEmojiClick}
                  edge="end"
                >
                  <EmojiEmotionsRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Send Button */}
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Paper>

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
