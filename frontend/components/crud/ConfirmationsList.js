import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import {
  getUsersThatNeedConfirmations,
  confirmUser,
  rejectUser,
  getQuestions,
} from "../../actions/user";

const ConfirmationsList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState();
  const token = getCookie("token");

  useEffect(() => {
    loadQuestions();
    loadUsers();
  }, []);

  const loadQuestions = () => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  };

  const loadUsers = () => {
    getUsersThatNeedConfirmations(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data.users);
      }
    });
  };

  const confirmUserAction = (username) => {
    confirmUser(username, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadUsers();
      }
    });
  };

  const rejectUserAction = (username) => {
    rejectUser(username, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadUsers();
      }
    });
  };

  const Confirm = (username) => {
    let answer = window.confirm("هل انت متأكد أنك تريد تأكيد هذا الطلب");
    if (answer) {
      confirmUserAction(username);
    }
  };

  const Reject = (username) => {
    let answer = window.confirm("هل أنت متأكد أنك تريد رفض هذا الطلب");
    if (answer) {
      rejectUserAction(username);
    }
  };

  const userInfo = (user) => {
    const infoList = [];
    console.log(questions);
    for (let x in user.questions) {
      if (user.questions[x].trim() !== "") {
        infoList.push(
          <p className="container" key={x}>{`${questions[x.trim()]}   :  ${
            user.questions[x]
          }`}</p>
        );
      }
    }
    return infoList;
  };

  const showLoadedUsers = () => {
    return users.map((user, i) => {
      const info = `${moment(user.createdAt).fromNow()}`;
      return (
        <div key={i} className="pb-5">
          <h3>{user.name}</h3>
          <div className="row">
            {user.idNumber && (
              <>
                <div className="col">
                  {user.idNumber && (
                    <>
                      <h1 style={{ marginRight: "8rem" }}>{user.idNumber}</h1>
                    </>
                  )}
                  {user.idPhoto1 && (
                    <Image
                      src={`${user.idPhoto1}`}
                      width={400}
                      height={200}
                      alt={""}
                    />
                  )}
                  {user.idPhoto1 && (
                    <Image
                      className="mt-2"
                      src={`${user.idPhoto2}`}
                      width={400}
                      height={200}
                      alt={""}
                    />
                  )}
                </div>
              </>
            )}

            <div className="col">{userInfo(user)}</div>
          </div>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => Reject(user.username)}
          >
            رفض الطلب
          </button>
          <button
            className="btn btn-sm btn-primary m-4"
            onClick={() => Confirm(user.username)}
          >
            تأكيد الطلب
          </button>
          <hr />
        </div>
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {message && <div className="alert alert-warning">{message}</div>}
            {showLoadedUsers()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationsList;
