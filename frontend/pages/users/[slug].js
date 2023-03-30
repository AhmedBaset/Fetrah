import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  userPublicProfile,
  sendAcceptanceRequest,
  addToFavourite,
  removeFromFavourite,
  checkInFavourites,
} from "../../actions/user";
import { isAuth, getCookie } from "../../actions/auth";
import Layout from "../../components/Layout";
import UserInfo from "../../components/user/UserInfo";

const UserDetails = ({ router }) => {
  const username = router.query.slug;

  const [user, setUser] = useState();
  const [inFavourites, setInFavourites] = useState(false);

  const senderUser = isAuth();
  const token = getCookie("token");
  useEffect(() => {
    if (username) {
      if (senderUser) {
        checkInFavourites(senderUser.username, username, token).then(
          (data, err) => {
            if (err) {
              console.log("Error checking user in favourites");
            } else {
              setInFavourites(data.inFavourites);
            }
          }
        );
      }

      userPublicProfile(username).then((data) => {
        if (data.error) {
          console.log("Error getting data");
        } else {
          setUser(data.user);
        }
      });
    }
  }, [username]);

  const handleAddRemoveFromFavourite = (e) => {
    e.preventDefault();

    if (senderUser) {
      if (inFavourites) {
        removeFromFavourite(senderUser.username, username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              setInFavourites(false);
            }
          }
        );
      } else {
        addToFavourite(senderUser.username, username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              setInFavourites(true);
            }
          }
        );
      }
    } else {
      console.log("You are not allowed to send request, login first");
    }
  };

  const handleSendAcceptance = (e) => {
    e.preventDefault();
    const senderUser = isAuth();
    if (senderUser) {
      sendAcceptanceRequest(senderUser.username, username, token).then(
        (err, data) => {
          if (err) {
            console.log("Error" + err);
          } else {
            console.log(data);
          }
        }
      );
    } else {
      console.log("You are not allowed to send request, login first");
    }
  };

  const handleAcceptRequest = () => {
    console.log("Accepted");
  };

  const showAcceptanceBtn = () => {
    if (user.sentRequests.length > 0 && senderUser) {
      const recieverId =
        user.sentRequests[user.sentRequests.length - 1].reciever;

      if (recieverId === senderUser._id) {
        return (
          <>
            <button onClick={handleAcceptRequest}>Accept request</button>
          </>
        );
      } else {
        return (
          <>
            <button onClick={handleSendAcceptance}>Send acceptance</button>
          </>
        );
      }
    }
  };
  if (!user) {
    return (
      <>
        <div style={{height:"100vh",display: "flex", justifyContent:"center", alignItems:"center"}}>
          <h1>جاري التحميل...</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Layout>
        <UserInfo user={user} />
      </Layout>
    </>
  );
};

export default withRouter(UserDetails);
