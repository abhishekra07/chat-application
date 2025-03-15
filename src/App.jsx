import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useUser } from "./UserContext"; // Use Context
import data from "./data.json";

const App = () => {
  const { currentUser } = useUser(); // Get logged-in user
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages(data.chats[user.user_id] || []); // ✅ Load messages based on user_id
  };

  const handleSendMessage = (messageText) => {
    if (selectedUser) {
      const time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures the AM/PM format
      });

      const newMessage = {
        message_id: Date.now(),
        sender_id: currentUser.user_id,
        sender_username: currentUser.username,
        message: messageText,
        message_type: "text",
        sent_at: time,
        status: "sent",
      };

      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        users={data.users.filter(
          (user) => user.user_id !== currentUser.user_id
        )}
        onSelectUser={handleUserSelect}
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
};

export default App;
