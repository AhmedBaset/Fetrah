import socketIO from "socket.io-client";
import { API } from "../../config";
const socket = socketIO.connect(API);
import classes from "../../components/chat/Chat.module.css";
import QuestionModal from "../../components/chat/QuestionModal";
import { useState, useEffect, useRef } from "react";
import { isAuth } from "../../actions/auth";
import { useRouter } from "next/router";
import { FaPaperPlane } from "react-icons/fa";
import {
  fetchRequest,
  getQuestions,
  setUserRoomStatus,
  userPublicProfile,
} from "../../actions/user";
import Layout from "../../components/Layout";
import Image from "next/image";
import Modal from "react-modal";
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
import RejectionModal from "../../components/chat/RejectionModal";

const QuestionsPage = ({ request, sender, receiver, questions }) => {
  const router = useRouter();

  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();

      if (result !== false) {
        const user = await userPublicProfile(result.username);
        //User is not allowed to see this chat
        if (user.username !== sender && user.role === 0) {
          router.push("/");
        }
      } else {
        //User is not signed in
        router.push("/signin");
      }
      setSignedInUser(user.user);
    };
    fetchUser();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectionReasonModalOpen, setIsRejectionReasonModalOpen] =
    useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [canSendMessages, setCanSendMessages] = useState(true);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [responseValues, setResponseValues] = useState(
    Array.from({ length: 100 }, () => ({ response: "", responseTo: "" }))
  );

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleOpenModal = () => {
    if (canSendMessages) {
      setIsModalOpen(true);
    } else {
      toast.info("لا يمكنك ارسال رسائل أخرى بعد أن ضغط على زر الموافقة");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenRejectionReasonModal = () => {
    setIsRejectionReasonModalOpen(true);
  };

  const handleCloseRejectionReasonModal = () => {
    setIsRejectionReasonModalOpen(false);
  };

  const hasPhoneNumber = (str) => {
    const phoneNumberRegex =
      /(\d{1,2}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;
    return phoneNumberRegex.test(str);
  };
  const hasWebsiteLink = (str) => {
    const websiteLinkRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/;
    return websiteLinkRegex.test(str);
  };

  const handleResponseSubmit = (index) => {
    const messageToSend = responseValues[index].response.trim();
    if (messageToSend.length === 0) {
      toast.warning("لا يمكنك ارسال رسالة فارغة");
      return;
    }
    if (hasPhoneNumber(messageToSend)) {
      toast.warning("يمنع منعا باتا ارسال أرقام الهواتف");
      return;
    }
    if (hasWebsiteLink(messageToSend)) {
      toast.warning("يمنع منعا باتا إرسال روابط خارج الموقع");
      return;
    }
    socket.emit("privateMessage", {
      roomId,
      message: responseValues[index].response.trim(),
      senderUserName: sender,
      responseTo: responseValues[index].responseTo,
    });
    setMessages((messages) => [
      ...messages,
      {
        message: responseValues[index].response.trim(),
        senderUserName: sender,
        responseTo: responseValues[index].responseTo,
      },
    ]);
    setResponseValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { response: "", responseTo: "" };
      return newValues;
    });
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

  const handleSubmitRejectionReason = (selectedReason) => {
    if (selectedReason.length === 0) {
      toast.warning("قم باختيار سبب واحد على الأقل");
      return;
    }
    const REJECTION_STATUS_CODE = "2";
    setUserRoomStatus(
      roomId,
      REJECTION_STATUS_CODE,
      signedInUser.gender,
      selectedReason
    ).then((err, data) => {
      //convert userStatus = 0 in two users

      toast.info("لقد قمت بانهاء التواصل مع الطرف الأخر .. رزقكم الله من فضله");
      socket.emit("userRejection", {
        roomId,
        username: signedInUser.username,
        rejectionReason: selectedReason,
      });
      router.push("/users");
    });
    setIsRejectionReasonModalOpen(false);
  };

  if (typeof window !== "undefined") {
    // Code that uses the router module
    if (request === null) {
      //no request with this ID
      router.push("/");
    }

    if (request.status !== 2) {
      router.push(`/user/${request._id}`);
    }
  }

  useEffect(() => {
    // When the component mounts, ask the server to join a private room
    socket.emit("joinPrivateRoom", request._id, sender);

    // When the server confirms that the client has joined a private room
    socket.on("privateRoomJoined", (roomId, previousMessages) => {
      setRoomId(roomId);
      setMessages(previousMessages);
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

    socket.on("userAcceptance", ({ username }) => {
      toast.info(
        `لقد قام الطرف الاخر بالموافقة على الانتقال لمرحلة الرؤية الشرعية`
      );
    });

    socket.on("userRejection", ({ username, rejectionReason }) => {
      toast.info(`لقد اعتذر الطرف الأخر عن الاستمرار بسبب ${rejectionReason}`, {
        onClose: () => {
          router.push("/users");
        },
      });
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("privateRoomJoined");
      socket.off("partnerJoined");
      socket.off("privateMessage");
      socket.off("partnerLeft");
      socket.off("userAcceptance");
      socket.off("userRejection");
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

  const handleResponseChange = (index, value) => {
    setResponseValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

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
      postfix = signedInUser.gender === "man" ? "رد العروسة" : "رد العريس";
    } else {
      postfix = "";
      prefix =
        signedInUser.gender === "man" ? "سؤال من العروسة" : "سؤال من العريس";
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
              onSubmit={(e) => {
                e.preventDefault();
                handleResponseSubmit(key);
              }}
              className={classes["response-form"]}
            >
              <div>
                <textarea
                  className={classes["response-input"]}
                  type="text"
                  onChange={(e) =>
                    handleResponseChange(key, {
                      response: e.target.value,
                      responseTo: text,
                    })
                  }
                  value={
                    parseInt(key) > responseValues.length
                      ? ""
                      : responseValues[key].response
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
    return signedInUser.gender === "man" ? (
      <MenWelcomeMessages
        date={request.createdAt}
        userId={signedInUser.username === sender ? receiver : sender}
      />
    ) : (
      <WomenWelcomeMessages
        date={request.createdAt}
        userId={signedInUser.username === sender ? receiver : sender}
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

  useEffect(() => {
    if (signedInUser !== null) {
      const tempUser =
        signedInUser.username === request.sender.username
          ? request.reciever
          : request.sender;

      let filteredQuestionsTemp = questions.filter(
        (item) => !(item.id in tempUser.questions)
      );
      const excludedQuestions = getExcludedQuestions(tempUser);
      filteredQuestionsTemp = filteredQuestionsTemp.filter((item) => {
        return !excludedQuestions.includes(item.id.trim());
      });

      setFilteredQuestions(filteredQuestionsTemp);
    }
  }, [signedInUser, request, questions]);

  const handleRejectionModal = () => {
    setIsRejectionModalOpen(true);
  };

  const handleCancelRejectionModal = () => {
    setIsRejectionModalOpen(false);
  };

  const handleConfirmInRejectionModal = () => {
    //show another modal with rejection reason
    handleOpenRejectionReasonModal();
    setIsRejectionModalOpen(false);
  };

  const handleConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const handleCancelConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirmInConfirmationModal = () => {
    // update the private room status of this user to be accepted
    const ACCEPTED_STATUS_CODE = "1";

    setUserRoomStatus(roomId, ACCEPTED_STATUS_CODE, signedInUser.username).then(
      (data, err) => {
        socket.emit("userAcceptance", {
          roomId,
          username: signedInUser.username,
        });

        if (data.message === "تم القبول") {
          router.push(`/user/${request._id}`);
        } else {
          toast.info(
            "لقد قمت بالموافقة على الانتقال لخطوة الرؤية الشرعية ويجب أن تنتظر حتى يوافق الطرف الأخر"
          );
          setCanSendMessages(false);
        }
      }
    );
    setConfirmationModalOpen(false);
  };

  const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
      <Modal className={classes["ConfirmationModal"]} isOpen={isOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{message}</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "space-evenly",
            }}
          >
            <button onClick={onConfirm}>نعم</button>
            <button onClick={onCancel}>الغاء</button>
          </div>
        </div>
      </Modal>
    );
  };

  if (!roomId || signedInUser === null) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>جاري التحميل</h3>
      </div>
    );
  }

  return (
    <Layout>
      <div className={classes["home__container"]}>
        <RejectionModal
          isOpen={isRejectionReasonModalOpen}
          onRequestClose={handleCloseRejectionReasonModal}
          onSubmit={handleSubmitRejectionReason}
        />
        <ConfirmationModal
          isOpen={isRejectionModalOpen}
          message="هل تريد حقا أن تنهي التواصل مع الطرف الأخر ؟"
          onConfirm={handleConfirmInRejectionModal}
          onCancel={handleCancelRejectionModal}
        />
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          message="ضغطك على هذا الزر بمثابة اعلان موافقة مبدئية منك وأنك تريد رقم ولي أمر العروسة حتى تتواصل معه لتحديد موعد الرؤية الشرعية"
          onConfirm={handleConfirmInConfirmationModal}
          onCancel={handleCancelConfirmationModal}
        />
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
                  {signedInUser.gender === "man" ? "كريم" : "زهراء"} السيد
                </h6>
                <p className={classes["contact-status"]}>متواجد حاليا</p>
              </div>
            </li>
          </ul>

          <div className={classes["actionsContainer"]}>
            <button
              onClick={handleConfirmationModal}
              className={classes["actionButton"]}
            >
              طلب رؤية شرعية
            </button>
            <br />
            <button
              onClick={handleRejectionModal}
              className={classes["actionButton"]}
            >
              أرفض الاستمرار
            </button>
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
