import { createContext, useContext, useState } from "react";
import data from "./data.json"; // Import data.json

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const loggedInUser = data.users.find((user) => user.user_id === 3); // User ID 3
  const [currentUser] = useState(loggedInUser);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
