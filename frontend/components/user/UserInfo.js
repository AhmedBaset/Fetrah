import classes from "./UserInfo.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  addToFavourite,
  removeFromFavourite,
  checkInFavourites,
  sendAcceptanceRequest,
} from "../../actions/user";
import { toast } from "react-toastify";
import { isAuth, getCookie } from "../../actions/auth";

const UserInfo = (props) => {
  const user = props.user;

  const [inFavourites, setInFavourites] = useState(false);
  const [loadingFavourite, setLoadingFavourite] = useState(false);
  const [loadingSendingAccept, setLoadingSendingAccept] = useState(false);

  const senderUser = isAuth();
  const token = getCookie("token");

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
            } else if (
              data.message ===
              "لا يمكنك ارسال طلب جديد قبل انتهاء مدة طلبك السابق"
            ) {
              showErrorMessage(data.message);
            }

            console.log(data.message);
          }
          setLoadingSendingAccept(false);
        }
      );
    } else {
      setLoadingSendingAccept(false);
      //show pop up here
      console.log("You are not allowed to send request, login first");
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
      console.log("You are not allowed to send request, login first");
    }
  };
  return (
    <>
      <div className={classes["fullContainer"]}>
        <div className={classes["info-head"]}>
          <div className={classes["options-container"]}>
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

            <div className={classes["option-container"]}>
              <Image
                className={classes["options-icon"]}
                src={"/images/like_icon.svg"}
                width={30}
                height={30}
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

            <div className={classes["option-container"]}>
              <Image
                className={classes["options-icon"]}
                src={"/images/report_icon.svg"}
                width={30}
                height={30}
                alt={""}
              />
              <button className={`${classes["submit"]}`}>
                تبليغ عن مخالفة
              </button>
            </div>
          </div>

          <div className={classes["info-text-container"]}>
            <h3>عروسة منتقبة - 18 سنة</h3>
            <h3>الجنسية - مصر - تعيش في مصر - الجيزة</h3>
            <h3>الحالة الاجتماعية - عزباء</h3>
          </div>

          <div className={classes["image-bg-circle"]}>
            <Image
              className={classes["icon"]}
              src={"/images/man_with_le7ya.svg"}
              width={150}
              height={150}
              alt={""}
            />
          </div>
        </div>
      </div>
      <div className={classes["other-info"]}>
        <br />
        <br />
        <h1 className={classes["info-title"]}>المعلومات العامة</h1>
        <br />
        <p>العمر: 18 سنة</p>
        <p>الطول: 173</p>
        <p>الوزن: 70</p>
        <p>لون البشرة: بيضاء</p>
        <p>هل تعاني من أي أمراض أو اعاقات: لا أعاني بفضل الله</p>

        <br />
        <br />
        <h1 className={classes["info-title"]}> معلومات عن الدين </h1>
        <br />
        <p>مدى الالتزام بالصلاة: أصلي جميع الصلوات في وقتها في البيت</p>
        <p>نوع الحجاب: نقاب</p>
        <p>هل أنت ملتحي: نعم</p>
        <p>ما مقدار حفظك للقران: ختمت القران حفظا</p>

        <br />
        <br />
        <h1 className={classes["info-title"]}>معلومات عن الأسرة/ السكن</h1>
        <br />
        <p>عمل الوالد: طبيب</p>
        <p>عمل الوالدة: ربة منزل</p>
        <p>عدد الإخوة والأخوات: 4</p>

        <br />
        <br />
        <h1 className={classes["info-title"]}>معلومات عن الأفكار والمفاهيم</h1>
        <br />
        <p>ما مفهومك للقوامة: كذا كذا كذا</p>
      </div>
    </>
  );
};

export default UserInfo;
