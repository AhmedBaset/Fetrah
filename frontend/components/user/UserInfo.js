import classes from "./UserInfo.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addToFavourite,
  removeFromFavourite,
  checkInFavourites,
  sendAcceptanceRequest,
  rejectRequest,
  acceptRequest,
  userPublicProfile,
} from "../../actions/user";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { isAuth, getCookie } from "../../actions/auth";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:8000");

const UserInfo = (props) => {
  const user = props.user;
  const router = useRouter();
  const [senderUser, setSenderUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      const userProfile = await userPublicProfile(result.username);
      setSenderUser(userProfile.user);
    };
    fetchUser();
  }, []);

  const token = getCookie("token");

  let userImage = "";
  if (user.gender === "man") {
    userImage =
      user.questions[23] === "ملتحي" ? "man_with_le7ya.svg" : "man_amls.svg";
  } else {
    if (
      user.questions[12] === "منتقبة سواد" ||
      user.questions[12] === "منتقبة نقاب ملون"
    ) {
      userImage = "woman_with_niqab.svg";
    } else if (user.questions[12] === "مختمرة") {
      userImage = "woman_with_khemar.svg";
    } else {
      userImage = "woman_with_hijab.svg";
    }
  }
  const userFace = user.questions[23] === "ملتحي" ? "ملتحي" : "";

  const userManOrWoman = user.gender === "man" ? "عريس" : "عروسة";
  const generalStatus = user.questions[0];
  const whereYouLive = user.questions[1];
  const maleChilds = user.questions[2];
  const femaleChilds = user.questions[3];
  const height = user.questions[4];
  const wieght = user.questions[5];
  const age = user.questions[6];
  const skinColor = user.questions[7];
  const job = user.questions[8];
  const certificate = user.questions[9];
  const aboutYou = user.questions[10];
  const aboutYourPartner = user.questions[11];
  const hijab = user.questions[12];
  const pray = user.questions[13];
  const wantToTravel = user.questions[14];
  const fathersPhone = user.questions[15];
  const city = user.questions[16];
  const childsAges = user.questions[17];
  const quran = user.questions[18];
  const fathersJob = user.questions[19];
  const mothersJob = user.questions[20];
  const brothersAndSisters = user.questions[21];
  const wantNiqab = user.questions[22];
  const man_with_le7ya = user.questions[23];
  const yourShaikh = user.questions[24];
  const understandingOfQwama = user.questions[25];
  const whereDoYouWork = user.questions[26];
  const fobia = user.questions[27];
  const isYourJobHalal = user.questions[28];
  const khetbaDawabet = user.questions[29];
  const yourGoalInLife = user.questions[30];
  const doYouStudyIslam = user.questions[31];
  const Azkar = user.questions[32];
  const undersandingOfSuccessInLife = user.questions[33];
  const sick = user.questions[34];
  const reasonOfDivorce = user.questions[35];
  const country = user.questions[36];

  const [userStatus, setUserStatus] = useState("ارسال طلب قبول");
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    if (senderUser && user) {
      let request = null;
      const senderUserSentRequests = senderUser.sentRequests;
      const senderUserReceivedRequests = senderUser.recievedRequests;
      const otherUserSentRequests = user.sentRequests;
      const otherUserReceivedRequests = user.recievedRequests;
      if (senderUserSentRequests) {
        request = senderUserSentRequests.find((req1) => {
          return otherUserReceivedRequests.find((req2) => {
            return req1._id === req2._id;
          });
        });
        if (request) {
          setRequestId(request._id);
          const requestStatus = request.status;
          if (requestStatus === 0) {
            setUserStatus("في انتظار الرد");
          } else if (requestStatus === 1) {
          } else if (requestStatus === 2) {
            setUserStatus("مرحلة الأسئلة");
          } else if (requestStatus === 3) {
            setUserStatus("تم الرفض");
          } else if (requestStatus === 4) {
            setUserStatus("ارسال طلب قبول");
          } else if (requestStatus === 5) {
          }
        }
      }
      if (senderUserReceivedRequests) {
        request = senderUserReceivedRequests.find((req1) => {
          return otherUserSentRequests.find((req2) => {
            return req1._id === req2._id;
          });
        });
        if (request) {
          setRequestId(request._id);
          const requestStatus = request.status;
          if (requestStatus === 0) {
            setUserStatus("قبول الطلب");
          } else if (requestStatus === 1) {
          } else if (requestStatus === 2) {
            setUserStatus("مرحلة الأسئلة");
          } else if (requestStatus === 3) {
            setUserStatus("تم الرفض");
          } else if (requestStatus === 4) {
            setUserStatus("ارسال طلب قبول");
          } else if (requestStatus === 5) {
          }
        }
      }
    }
  }, [senderUser, user]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function handleModalOpen() {
    setModalIsOpen(true);
  }

  function handleModalClose() {
    setModalIsOpen(false);
  }
  const [inFavourites, setInFavourites] = useState(false);
  const [loadingFavourite, setLoadingFavourite] = useState(false);
  const [loadingSendingAccept, setLoadingSendingAccept] = useState(false);

  const showSuccessMessage = (message) => {
    toast.success(`${message}`);
  };

  const showInfoMessage = (message) => {
    toast.info(`${message}`);
  };

  const showErrorMessage = (message) => {
    toast.error(`${message}`);
  };

  useEffect(() => {
    if (senderUser) {
      checkInFavourites(senderUser.username, user.username, token).then(
        (data, err) => {
          if (err) {
            console.log(
              "حصل خطأ أثناء محاولة معرفة اذا كان هذا المستخدم في قائمة المفضلة أم لا"
            );
          } else {
            setInFavourites(data.inFavourites);
          }
        }
      );
    }
  }, [user]);

  const handleSendAcceptance = (e) => {
    e.preventDefault();
    if (senderUser) {
      if (senderUser.confirmed === 0) {
        toast.error(
          "لا يمكنك ارسال طلب قبول الأن ...يجب عليك أن تنتظر حتى يتم تفعيل حسابك"
        );
        return;
      }
      if (user.userStatus === 1) {
        toast.error(
          "للأسف لا يمكنك ارسال طلب قبول لهذا الشخص لانه على تواصل الان بشخص أخر"
        );
        return;
      }
      console.log(user);
      setLoadingSendingAccept(true);
      if (senderUser) {
        sendAcceptanceRequest(senderUser.username, user.username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              //show pop up here
              if (data.message === "تم ارسال طلب القبول المبدئي بنجاح") {
                showSuccessMessage(data.message);
                setUserStatus("في انتظار الرد");
              } else if (
                data.message ===
                "لا يمكنك ارسال طلب جديد قبل انتهاء مدة طلبك السابق"
              ) {
                showErrorMessage(data.message);
              } else {
                showInfoMessage(data.message);
              }
              setLoadingSendingAccept(false);
            }
          }
        );
      } else {
        setLoadingSendingAccept(false);
        //show pop up here
        console.log("You are not allowed to send request, login first");
      }
    } else {
      showInfoMessage(`يجب عليك تسجيل حسابك أولا!`);
    }
  };

  const handleAddRemoveFromFavourite = (e) => {
    e.preventDefault();
    setLoadingFavourite(true);
    if (senderUser) {
      if (inFavourites) {
        removeFromFavourite(senderUser.username, user.username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              showSuccessMessage("تمت الازالة من قائمة المحفوظات");
              setInFavourites(false);
            }
            setLoadingFavourite(false);
          }
        );
      } else {
        addToFavourite(senderUser.username, user.username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              showSuccessMessage("تمت الاضافة إلى قائمة المحفوظات");
              setInFavourites(true);
            }
            setLoadingFavourite(false);
          }
        );
      }
    } else {
      //TODO: show pop here
      showErrorMessage("يجب عليك تسجيل حسابك أولا!");
      setLoadingFavourite(false);
    }
  };

  const handleRejectRequest = (e) => {
    e.preventDefault();
    rejectRequest(requestId, token).then((data, err) => {
      if (err) {
        showErrorMessage(err);
      } else {
        showInfoMessage(data.message);
        setUserStatus("ارسال طلب قبول");
      }
    });
  };

  const handleAcceptRequest = (e) => {
    e.preventDefault();

    acceptRequest(requestId, token).then((data, err) => {
      if (err) {
        showErrorMessage(err);
      } else {
        console.log(data);
        showSuccessMessage(data.message);
        setUserStatus("مرحلة الأسئلة");
      }
    });
  };

  const showAddToFavouriteBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/bookmark_icon.svg"}
          width={30}
          height={30}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={handleAddRemoveFromFavourite}
            className={`${classes["submit"]}`}
          >
            {!inFavourites && "اضافة للمحفوظات"}
            {inFavourites && "ازالة المحفوظات"}
          </button>
        )}
      </div>
    );
  };

  const showReportBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/report_icon.svg"}
          width={30}
          height={30}
          alt={""}
        />
        <button onClick={handleModalOpen} className={`${classes["submit"]}`}>
          تبليغ عن مخالفة
        </button>
      </div>
    );
  };

  const showRejectBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/reject_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={handleRejectRequest}
            className={`${classes["submit"]}`}
          >
            رفض الطلب
          </button>
        )}
      </div>
    );
  };

  const showAcceptBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/like_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={handleAcceptRequest}
            className={`${classes["submit"]}`}
          >
            قبول الطلب
          </button>
        )}
      </div>
    );
  };

  const showSendAcceptBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/like_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingSendingAccept ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={handleSendAcceptance}
            className={`${classes["submit"]}`}
          >
            ارسال طلب قبول
          </button>
        )}
      </div>
    );
  };

  const showWaitingReponseBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/like_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={() => {
              showInfoMessage(
                ` يجب عليك انتظار الرد من الطرف الأخر خلال 24 ساعة`
              );
            }}
            className={`${classes["submit"]}`}
          >
            في انتظار الرد
          </button>
        )}
      </div>
    );
  };

  const showQuestionsStageBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/like_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={() => {
              router.push(
                `/questions/${requestId}-${senderUser.username}-${user.username}`
              );
            }}
            className={`${classes["submit"]}`}
          >
            مرحلة الأسئلة
          </button>
        )}
      </div>
    );
  };

  const showYouAlreadyRejectedBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/like_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={() => {
              toast.info(
                "لا يمكنك ارسال طلب لهذا الشخص بعد أن تم الرفض بينكما"
              );
            }}
            className={`${classes["submit"]}`}
          >
            تم الرفض
          </button>
        )}
      </div>
    );
  };

  const showYouAlreadyAcceptedBtn = () => {
    return (
      <div className={classes["option-container"]}>
        <Image
          className={classes["options-icon"]}
          src={"/images/like_icon.svg"}
          width={28}
          height={28}
          alt={""}
        />
        {loadingFavourite ? (
          <p>جاري التحميل</p>
        ) : (
          <button
            onClick={() => {
              router.push(`/user/${requestId}`);
            }}
            className={`${classes["submit"]}`}
          >
            تم القبول
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        className={classes["custom-modal"]}
      >
        <h2>ما هي المخالفة التي تريد الابلاغ عنها؟</h2>
        <input type="text" style={{ direction: "rtl" }} />
        <button
          onClick={() => {
            if (senderUser) {
              showInfoMessage(`شكرا لك ,لقد تم ارسال البلاغ للادراة`);
            } else {
              showInfoMessage(`يجب عليك تسجيل حسابك أولا!`);
            }
            setModalIsOpen(false);
          }}
        >
          تبليغ الادارة
        </button>
      </Modal>

      <div className={classes["fullContainer"]}>
        <div className={classes["info-head"]}>
          {senderUser && senderUser.username !== user.username && (
            <>
              <div className={classes["options-container"]}>
                {userStatus === "ارسال طلب قبول" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showSendAcceptBtn()}
                    {showReportBtn()}
                  </>
                )}

                {userStatus === "في انتظار الرد" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showWaitingReponseBtn()}
                    {showReportBtn()}
                  </>
                )}

                {userStatus === "قبول الطلب" && (
                  <>
                    {showRejectBtn()}
                    {showAcceptBtn()}
                    {showReportBtn()}
                  </>
                )}

                {userStatus === "مرحلة الأسئلة" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showQuestionsStageBtn()}
                    {showReportBtn()}
                  </>
                )}

                {userStatus === "تم الرفض" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showYouAlreadyRejectedBtn()}
                    {showReportBtn()}
                  </>
                )}

                {userStatus === "تم القبول" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showYouAlreadyAcceptedBtn()}
                    {showReportBtn()}
                  </>
                )}
              </div>
            </>
          )}

          <div className={classes["info-text-container"]}>
            <h3>{senderUser.username}</h3>
            <h3>
              {userManOrWoman} {userFace} - {age} سنة
            </h3>
            <h3>
              الجنسية - {country} - {user.gender === "man" ? "يعيش" : "تعيش"} في{" "}
              {whereYouLive} - {city}
            </h3>
            <h3>الحالة الاجتماعية - {generalStatus}</h3>
          </div>

          <div className={classes["image-bg-circle"]}>
            <Image
              className={classes["icon"]}
              src={`/images/${userImage}`}
              width={130}
              height={130}
              alt={""}
              priority="true"
            />
          </div>
        </div>
      </div>
      <div className={classes["other-info"]}>
        <br />
        <br />
        <h1 className={classes["info-title"]}>المعلومات العامة</h1>
        <br />
        {age && <p>العمر - {age} سنة</p>}
        {height && <p>الطول - {height}</p>}
        {wieght && <p>الوزن - {wieght}</p>}
        {skinColor && <p>لون البشرة - {skinColor}</p>}
        {job && <p> الوظيفة - {job}</p>}
        {sick && <p>هل تعاني من أي أمراض أو اعاقات - {sick}</p>}
        {fobia && <p>هل تعاني من الخوف المفرط تجاه بعض الأشياء؟ - {fobia}</p>}
        {certificate && <p>الشهادة - {certificate}</p>}
        {aboutYou && <p>تكلم عن نفسك - {aboutYou}</p>}
        {aboutYourPartner && (
          <p> المواصفات المطلوبة في زوجك - {aboutYourPartner}</p>
        )}

        <br />
        <br />
        <h1 className={classes["info-title"]}> معلومات عن الدين </h1>
        <br />
        {pray && <p>مدى الالتزام بالصلاة - {pray}</p>}
        {hijab && <p>نوع الحجاب - {hijab}</p>}
        {man_with_le7ya && <p>هل أنت ملتحي - {man_with_le7ya}</p>}
        {quran && <p>ما مقدار حفظك للقران - {quran}</p>}
        {Azkar && <p>هل تحافظ على أذكار الصباح والمساء؟ - {Azkar}</p>}
        {yourShaikh && <p>من هم شيوخك؟ - {yourShaikh}</p>}
        {wantNiqab && <p>هل لديك استعداد للنقاب؟ - {wantNiqab}</p>}
        {isYourJobHalal && <p>هل عملك الذي تعمل به حلال؟ - {isYourJobHalal}</p>}
        {doYouStudyIslam && (
          <p>
            هل لديك ما لا يسع المسلم جهله من العلم الشرعي؟ - {doYouStudyIslam}
          </p>
        )}
        {khetbaDawabet && (
          <p>
            هل أنت على دراية بضوابط الخطبة الشرعية ومستعد للالتزام بها؟{" "}
            {khetbaDawabet}
          </p>
        )}
        <br />
        <br />
        <h1 className={classes["info-title"]}>معلومات عن الأسرة/ السكن</h1>
        <br />

        {maleChilds && <p>عدد الأولاد الذكور - {maleChilds}</p>}
        {femaleChilds && <p>عدد البنات - {femaleChilds}</p>}
        {childsAges && <p> أعمار الأولاد - {childsAges}</p>}
        {fathersJob && <p>عمل الوالد - {fathersJob}</p>}
        {mothersJob && <p>عمل الوالدة - {mothersJob}</p>}
        {brothersAndSisters && (
          <p>عدد الإخوة والأخوات - {brothersAndSisters}</p>
        )}
        {reasonOfDivorce && <p>سبب الانفصال - {reasonOfDivorce}</p>}

        <br />
        <br />
        <h1 className={classes["info-title"]}>معلومات عن الأفكار والمفاهيم</h1>
        <br />
        {yourGoalInLife && <p>ما هو هدفك في الحياة - {yourGoalInLife}</p>}
        {undersandingOfSuccessInLife && (
          <p>
            ما هو مفهومك عن النجاح في الحياة - {undersandingOfSuccessInLife}
          </p>
        )}
        {understandingOfQwama && (
          <p>ما مفهومك للقوامة - {understandingOfQwama}</p>
        )}
        {wantToTravel && <p>هل لديك رغبة في السفر؟ - {wantToTravel}</p>}
        {whereDoYouWork && <p>أين تعمل تحديدا؟ - {whereDoYouWork}</p>}
      </div>
    </>
  );
};

export default UserInfo;
