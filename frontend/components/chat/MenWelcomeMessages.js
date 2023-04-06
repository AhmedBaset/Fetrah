import Link from "next/link";
import classes from "./Chat.module.css";

const MenWelcomeMessages = (props) => {
  const text = "السلام عليكم ورحمة الله";
  const text2 = "مع حضرتك كريم ادمن موقع لتسكنوا";
  const text3 = "حضرتك توافقت مع عروسة كود";
  const text4 = "وهنبدأ التنسيق بينكم عن طريق اننا نحول الأسئلة بينكم";
  return (
    <>
      <div className={classes[`received`]}>
        <p className={classes["message-text"]}>{text}</p>
        <span className={classes["message-time"]}>
          {new Date(props.date).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      <div className={classes[`received`]}>
        <p className={classes["message-text"]}>{text2}</p>
        <span className={classes["message-time"]}>
          {new Date(props.date).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      <div className={classes[`received`]}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            className={classes["linkToOtherUser"]}
            href={`/users/${props.userId}`}
          >
            <p
              className={
                classes["message-text"] + " " + classes["linkToOtherUser"]
              }
            >
              {" "}
              {props.userId}{" "}
            </p>
          </Link>

          <p className={classes["message-text"]}>{text3}</p>
        </div>

        <p className={classes["message-text"]}>{text4}</p>
        <span className={classes["message-time"]}>
          {new Date(props.date).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
    </>
  );
};

export default MenWelcomeMessages;
