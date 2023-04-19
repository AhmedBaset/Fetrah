import { useEffect, useState } from "react";
import { isAuth } from "../../actions/auth";
import { userPublicProfile } from "../../actions/user";
import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import { useRouter } from "next/router";
import classes from "../../components/requests/Requests.module.css";
import { toast } from "react-toastify";

const Requests = (props) => {
  const router = useRouter();
  const [signedInUser, setSignedInUser] = useState(null);
  const [selectedType, setSelectedType] = useState("sent");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      const userProfile = await userPublicProfile(result.username);
      setSignedInUser(userProfile.user);
    };
    fetchUser();
  }, []);

  if (!signedInUser) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "40rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>جاري التحميل...</p>
      </div>
    );
  }

  const handleTypeFilterClick = (type) => {
    setSelectedType(type);
  };

  const showSentRequests = () => {
    const heOrShe = signedInUser.gender === "man" ? "للعروسة" : "للعريس";
    return (
      <div>
        {signedInUser.sentRequests.length === 0 && (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "40rem",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>أنت لم تقم بارسال أي طلبات بعد</p>
          </div>
        )}
        {signedInUser.sentRequests.reverse().map((request) => {
          let requestStatus = null;
          if (request.status === 0) {
            requestStatus = "في انتظار الرد";
          } else if (request.status === 1) {
            requestStatus = "تم الاطلاع عليه من الطرف الاخر";
          } else if (request.status === 2) {
            requestStatus = "تمت الموافقة البدئية";
          } else if (request.status === 3) {
            requestStatus = "تم الرفض";
          } else if (request.status === 4) {
            requestStatus = "انتهت مهلة الطلب دون رد";
          } else if (request.status === 5) {
            requestStatus = "تم التوافق";
          }
          const date = new Date(request.createdAt);
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            calendar: "islamic",
          };
          const formattedDate = date.toLocaleDateString(
            "ar-EG-u-ca-islamic",
            options
          );
          return (
            <div key={request._id}>
              <div
                onClick={() => {
                  if (request.status === 5) {
                    window.location.href = `/user/${request._id}`;
                  } else {
                    window.location.href = `/users/${request.reciever.username}`;
                  }
                }}
                className={classes["activeCard"]}
              >
                <p>
                  لقد أرسلت طلب قبول {heOrShe} كود {request.reciever.username}
                </p>
                <p>حالة الطلب : {requestStatus}</p>
                <label style={{ cursor: "pointer" }}>{formattedDate}</label>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const showReceivedRequests = () => {
    const heOrShe = signedInUser.gender === "man" ? "العروسة" : "العريس";
    return (
      <>
        {signedInUser.recievedRequests.length === 0 && (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "40rem",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p st>لا توجد أي طلبات أرسلت إليك حاليا</p>
          </div>
        )}
        {signedInUser.recievedRequests.reverse().map((request) => {
          let requestStatus = null;
          if (request.status === 0) {
            requestStatus = "في انتظار الرد";
          } else if (request.status === 1) {
            requestStatus = "تم الاطلاع عليه من الطرف الاخر";
          } else if (request.status === 2) {
            requestStatus = "تمت الموافقة البدئية";
          } else if (request.status === 3) {
            requestStatus = "تم الرفض";
          } else if (request.status === 4) {
            requestStatus = "انتهت مهلة الطلب دون رد";
          } else if (request.status === 5) {
            requestStatus = "تم التوافق";
          }
          const date = new Date(request.createdAt);
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            calendar: "islamic",
          };
          const formattedDate = date.toLocaleDateString(
            "ar-EG-u-ca-islamic",
            options
          );
          return (
            <>
              <div
                onClick={() => {
                  if (request.status === 5) {
                    window.location.href = `/user/${request._id}`;
                  } else {
                    console.log(request.sender.username);

                    window.location.href = `/users/${request.sender.username}`;
                  }
                }}
                className={classes["activeCard"]}
              >
                <p>
                  لقد تلقيت طلب قبول من {heOrShe} كود {request.sender.username}
                </p>
                <p>حالة الطلب : {requestStatus}</p>
                <label style={{ cursor: "pointer" }}>{formattedDate}</label>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <Layout>
      <Private>
        <div className={classes.container}>
          <div className={classes.type}>
            <div
              onClick={() => {
                handleTypeFilterClick("received");
              }}
              className={
                selectedType === "received"
                  ? classes.selected
                  : classes.deselected
              }
            >
              الطلبات المرسلة لك
            </div>
            <div
              onClick={() => {
                handleTypeFilterClick("sent");
              }}
              className={
                selectedType === "sent" ? classes.selected : classes.deselected
              }
            >
              الطلبات التي أرسلتها
            </div>
          </div>
          <div className={classes.result}>
            {selectedType === "sent"
              ? showSentRequests()
              : showReceivedRequests()}
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Requests;
