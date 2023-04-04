import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:8000");
import classes from "../../components/chat/Chat.module.css";
import ChatBar from "../../components/chat/ChatBar";
import ChatBody from "../../components/chat/ChatBody";
import ChatFooter from "../../components/chat/ChatFooter";
import { useState, useEffect, useRef } from "react";
import { isAuth } from "../../actions/auth";
import { useRouter } from "next/router";

import { fetchRequest } from "../../actions/user";
import Layout from "../../components/Layout";

const QuestionsPage = ({ request, sender, receiver }) => {
  const router = useRouter();
  const signedInUser = isAuth();

  if (typeof window !== "undefined") {
    // Code that uses the router module
    if (request === null) {
      //no request with this ID
      router.push("/");
    }

    if (signedInUser) {
      //User is not allowed to see this chat
      if (signedInUser.username !== sender) {
        router.push("/");
      }
    } else {
      //User is not signed in
      router.push("/signin");
    }
  }

  const [roomId, setRoomId] = useState(null);
  const [partnerName, setPartnerName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // When the component mounts, ask the server to join a private room
    socket.emit("joinPrivateRoom", request._id, sender);

    // When the server confirms that the client has joined a private room
    socket.on("privateRoomJoined", (roomId, previousMessages) => {
      setRoomId(roomId);
      setMessages(previousMessages);
      // console.log(previousMessages);
    });

    // When the server notifies the client that their partner has joined the room
    socket.on("partnerJoined", (roomId) => {
      setPartnerName(roomId.replace(sender, "").replace("_", ""));
    });

    // When the server sends a private message
    socket.on("privateMessage", ({ message, senderUserName: sender }) => {
      // console.log(message);
      setMessages((messages) => [
        ...messages,
        { message, senderUserName: sender },
      ]);
    });

    // When the server notifies the client that their partner has left the room
    socket.on("partnerLeft", () => {
      // setPartnerName(null);
      // setMessages([]);
      // setRoomId(null);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("privateRoomJoined");
      socket.off("partnerJoined");
      socket.off("privateMessage");
      socket.off("partnerLeft");
    };
  }, [request, sender]);

  // useEffect(() => {
  //   // Scroll to the bottom of the messages container when the messages change
  //   // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      socket.emit("privateMessage", {
        roomId,
        message: inputValue,
        senderUserName: sender,
      });
      setMessages((messages) => [
        ...messages,
        { message: inputValue, senderUserName: sender },
      ]);
      setInputValue("");
    }
  };

  if (!roomId) {
    return <div>جاري الدخول على صفحة الأسئلة...</div>;
  }

  return (
    <Layout>
      <div>
        <h2>Private chat with {partnerName}</h2>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.senderUserName === signedInUser.username
                  ? "sent"
                  : "received"
              }`}
            >
              {message.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const queryParts = slug.split("-");
  const requestId = queryParts[0];
  const senderUserName = queryParts[1];
  const receiverUserName = queryParts[2];
  let requestData = null;

  try {
    requestData = await fetchRequest(requestId);
  } catch (error) {
    console.error("Error fetching request data: ", error);
  }

  return {
    props: {
      request: requestData.data || null,
      sender: senderUserName,
      receiver: receiverUserName,
    },
  };
}

export default QuestionsPage;
