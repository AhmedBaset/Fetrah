import classes from "./Chat.module.css";
import { useState, useEffect } from "react";
const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   socket.on("newUserResponse", (data) => setUsers(data));
  // }, [socket, users]);

  return (
    <div className={classes["chat__sidebar"]}>
      <h2>Open Chat</h2>

      <div>
        <h4 className={classes["chat__header"]}>ACTIVE USERS</h4>
        <div className={classes["chat__users"]}>
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
