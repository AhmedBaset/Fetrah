import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:8000");
import classes from "../../components/chat/Chat.module.css";
import QuestionModal from "../../components/chat/QuestionModal";
import { useState, useEffect, useRef } from "react";
import { isAuth } from "../../actions/auth";
import { useRouter } from "next/router";
import { FaPaperPlane } from "react-icons/fa";
import { fetchRequest, getQuestions } from "../../actions/user";
import Layout from "../../components/Layout";
import Image from "next/image";
import {
  DIVORCED_MAN_EXCLUDED_QUESTIONS,
  DIVORCED_WOMAN_EXCLUDED_QUESTIONS,
  MARRIED_MAN_EXCLUDED_QUESTIONS,
  MARRIED_WOMAN_EXCLUDED_QUESTIONS,
  SINGLE_MAN_EXCLUDED_QUESTIONS,
  SINGLE_WOMAN_EXCLUDED_QUESTIONS,
} from "../../constants";
import { toast } from "react-toastify";
import MenWelcomeMessages from "../../components/chat/MenWelcomeMessages";
import WomenWelcomeMessages from "../../components/chat/WomenWelcomeMessages";

const QuestionsPage = ({ request, sender, receiver, questions }) => {
  const router = useRouter();
  const signedInUser = isAuth();

  // console.log(questions.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResponseSubmit = (e) => {
    e.preventDefault();

    socket.emit("privateMessage", {
      roomId,
      message: responseValue.response.trim(),
      senderUserName: sender,
      responseTo: responseValue.responseTo,
    });
    setMessages((messages) => [
      ...messages,
      {
        message: responseValue.response.trim(),
        senderUserName: sender,
        responseTo: responseValue.responseTo,
      },
    ]);
    setResponseValue({ response: "", responseTo: "" });
  };

  const handleSubmitQuestions = (selectedQuestions) => {
    if (selectedQuestions.length === 0) {
      toast.warning("قم باختيار سؤال واحد على الأقل حتى ترسله");
      return;
    }
    if (messages.length > 0) {
      if (
        messages[messages.length - 1].senderUserName === sender &&
        !messages[messages.length - 1].responseTo
      ) {
        toast.warning(
          "لا يمكنك ارسال أسئلة جديدة قبل أن يتم الرد على أسئلتك السابقة"
        );
        handleCloseModal();
        return;
      }
    }

    setSelectedQuestions(selectedQuestions);
    for (let i = 0; i < selectedQuestions.length; i++) {
      socket.emit("privateMessage", {
        roomId,
        message: questions[selectedQuestions[i]].text,
        senderUserName: sender,
      });
      setMessages((messages) => [
        ...messages,
        {
          message: questions[selectedQuestions[i]].text,
          senderUserName: sender,
        },
      ]);
    }
    handleCloseModal();
  };

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
  const [responseValue, setResponseValue] = useState({
    response: "",
    responseTo: "",
  });
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
    socket.on(
      "privateMessage",
      ({ message, senderUserName: sender, responseTo }) => {
        setMessages((messages) => [
          ...messages,
          { message, senderUserName: sender, responseTo },
        ]);
      }
    );

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

  useEffect(() => {
    // Scroll to the bottom of the messages container when the messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const messageItem = (
    key,
    type,
    text,
    sendingDate,
    responseTo = undefined
  ) => {
    let prefix = "";

    let postfix = "";
    if (responseTo) {
      prefix = "";
      postfix =
        signedInUserProfile.gender === "man" ? "رد العروسة" : "رد العريس";
    } else {
      postfix = "";
      prefix =
        signedInUserProfile.gender === "man"
          ? "سؤال من العروسة"
          : "سؤال من العريس";
    }
    return (
      <div key={key} className={classes[`${type}`]}>
        {responseTo && (
          <>
            <div
              className={
                classes[
                  type === "received"
                    ? "receivedResponseResponseToContainer"
                    : "sentResponseResponseToContainer"
                ]
              }
            >
              <p>{responseTo}</p>
            </div>
          </>
        )}
        {type === "received" && !responseTo && (
          <p className={classes["message-text"]}>{prefix}</p>
        )}
        {type === "received" && !responseTo && <br />}
        <p className={classes["message-text"]}>{text}</p>
        {type === "received" && responseTo && <br />}
        {type === "received" && responseTo && (
          <p className={classes["message-text"]}>{postfix}</p>
        )}

        <span className={classes["message-time"]}>
          {new Date(sendingDate).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
        {type === "received" && !responseTo && (
          <>
            <hr />
            <form
              onSubmit={handleResponseSubmit}
              className={classes["response-form"]}
            >
              <div>
                <textarea
                  className={classes["response-input"]}
                  type="text"
                  value={responseValue.response}
                  onChange={(e) =>
                    setResponseValue({
                      response: e.target.value,
                      responseTo: text,
                    })
                  }
                  placeholder="اكتب ردك هنا"
                />
                <button type="submit" className={classes["response-button"]}>
                  ارسال الرد
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    );
  };

  const welcomeMessagesItem = () => {
    return signedInUserProfile.gender === "man" ? (
      <MenWelcomeMessages
        date={request.createdAt}
        userId={signedInUserProfile.username === sender ? receiver : sender}
      />
    ) : (
      <WomenWelcomeMessages
        date={request.createdAt}
        userId={signedInUserProfile.username === sender ? receiver : sender}
      />
    );
  };

  const getExcludedQuestions = (user) => {
    let questionsIdsList = [];
    if (user.gender === "man") {
      if (user.questions[0] === "أعزب") {
        questionsIdsList = SINGLE_MAN_EXCLUDED_QUESTIONS;
      } else if (user.questions[0] === "مطلق") {
        questionsIdsList = DIVORCED_MAN_EXCLUDED_QUESTIONS;
      } else {
        questionsIdsList = MARRIED_MAN_EXCLUDED_QUESTIONS;
      }
    } else {
      if (user.questions[0] === "عزباء") {
        questionsIdsList = SINGLE_WOMAN_EXCLUDED_QUESTIONS;
      } else if (user.questions[0] === "مطلقة") {
        questionsIdsList = DIVORCED_WOMAN_EXCLUDED_QUESTIONS;
      } else {
        questionsIdsList = MARRIED_WOMAN_EXCLUDED_QUESTIONS;
      }
    }
    return questionsIdsList;
  };

  const signedInUserProfile =
    signedInUser.username === request.sender.username
      ? request.sender
      : request.reciever;

  let filteredQuestions = questions.filter(
    (item) => !(item.id in signedInUserProfile.questions)
  );
  const excludedQuestions = getExcludedQuestions(signedInUserProfile);
  filteredQuestions = filteredQuestions.filter((item) => {
    return !excludedQuestions.includes(item.id);
  });

  return (
    <Layout>
      <div className={classes["home__container"]}>
        <QuestionModal
          questions={filteredQuestions}
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          onSubmit={handleSubmitQuestions}
        />
        <div className={classes["info__side"]}>
          <ul className={classes["contact-list"]}>
            <li className={classes["contact"]}>
              <Image
                src="/images/admin_icon.svg"
                width={50}
                height={50}
                alt="Contact Avatar"
              />
              <div className={classes["contact-info"]}>
                <h6 className={classes["contact-name"]}>
                  {signedInUserProfile.gender === "man" ? "كريم" : "زهراء"}{" "}
                  السيد
                </h6>
                <p className={classes["contact-status"]}>متواجد حاليا</p>
              </div>
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <button onClick={(e) => {}} className={classes["actionButton"]}>
              أريد الانتقال للمرحلة التالية
            </button>
            <br />
            <button onClick={(e) => {}} className={classes["actionButton"]}>
              للأسف أرفض الاستمرار
            </button>
            {/* <p style={{ textDecoration: "none", fontWeight: "bold" }}>
              هذه بعض النصائج نوجهها لكم
            </p>
            <div>
              <p>kwdpmm 1</p>
              <p>kwdpmm 1</p>
              <p>kwdpmm 1</p>
            </div> */}
          </div>
        </div>
        <div className={classes["chat__side"]}>
          <div className={classes["messages__container"]}>
            {welcomeMessagesItem()}
            {messages.map((message, index) => {
              let date = message.timestamp || Date.now();
              let isMyMessage =
                message.senderUserName === signedInUser.username;

              return messageItem(
                index,
                isMyMessage ? "sent" : "received",
                message.message,
                date,
                message.responseTo
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className={classes["chat-footer"]}>
            <form
              className={classes["chat-footer-form"]}
              onSubmit={handleSubmit}
            >
              <div className={classes["input-container"]}>
                <input
                  onClick={handleOpenModal}
                  type="text"
                  placeholder="قم بارسال سؤال"
                  value={""}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <button type="submit">
                  <FaPaperPlane className={classes["fa-paper-plane"]} />
                </button>
              </div>
            </form>
          </div>
        </div>
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
  let questions = null;
  let questionsList;
  try {
    requestData = await fetchRequest(requestId);
    questions = await getQuestions();

    questionsList = Object.keys(questions).map((key) => ({
      id: key,
      text: questions[key],
    }));
  } catch (error) {
    console.error("Error fetching request data: ", error);
  }

  return {
    props: {
      request: requestData.data || null,
      sender: senderUserName,
      receiver: receiverUserName,
      questions: questionsList || [],
    },
  };
}

export default QuestionsPage;
