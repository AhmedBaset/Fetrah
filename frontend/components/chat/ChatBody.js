import classes from "./Chat.module.css";
import { forwardRef } from "react";
// import { useRouter } from "react/router";

const ChatBody = forwardRef((props, ref) => {
  //   const router = useRouter()
  const messages = props.messages;
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    // router.replace("/");
    window.location.reload();
  };

  console.log(messages);

  return (
    <>
      <header className={classes["chat__mainHeader"]}>
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}

      <div className={classes["message__container"]} ref={ref}>
        {messages.map((message) =>
          message.name === "Ahmed" ? (
            <div className={classes["message__chats"]} key={message.id}>
              <p className={classes["sender__name"]}>You</p>
              <div className={classes["message__sender"]}>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
});

export default ChatBody;
