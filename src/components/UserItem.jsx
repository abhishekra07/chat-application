import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

const UserItem = ({ user, onSelectUser }) => {
  return (
    <ListItem
      button
      onClick={() => onSelectUser(user)}
      sx={{ cursor: "pointer", "&:hover": { bgcolor: "secondary.hover" } }}
    >
      <ListItemAvatar>
        <Avatar src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary={user.lastMessage} />
    </ListItem>
  );
};

export default UserItem;
