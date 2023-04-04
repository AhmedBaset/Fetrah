import { useState } from "react";
import classes from "./Chat.module.css";

const ChatFooter = (props) => {
  const socket = props.socket;
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("privateMessage", { roomId: props.roomId, message });
      socket.emit("message", {
        text: message,
        name: "Ahmed",
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className={classes["chat__footer"]}>
      <form className={classes["form"]} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className={classes["message"]}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={classes["sendBtn"]}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
