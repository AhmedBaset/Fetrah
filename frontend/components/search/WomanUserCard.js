import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./ManUserCard.module.css";

const WomanUserCard = (props) => {
  const user = props.user;
  const router = useRouter();

  const gender = "عروسة";
  let image = "";
  let hijab = "";
  if (user.questions[12] == "منتقبة سواد") {
    hijab = "منتقبة سواد";
    image = "/images/woman_with_niqab.svg";
  } else if (user.questions[12] == "منتقبة نقاب ملون") {
    hijab = "منتقبة";
    image = "/images/woman_with_niqab.svg";
  } else if (user.questions[12] == "مختمرة") {
    hijab = "مختمرة";
    image = "/images/woman_with_khemar.svg";
  } else if (user.questions[12] == "طرح وفساتين") {
    hijab = "تلبس طرحة وفساتين";
    image = "/images/woman_with_hijab.svg";
  } else if (user.questions[12] == "طرح وبناطيل") {
    hijab = "تلبس طرح وبناطيل";
    image = "/images/woman_with_hijab.svg";
  } else if (user.questions[12] == "غير محجبة") {
    hijab = "سافرة";
    image = "/images/woman_with_hijab.svg";
  }
  const age = user.questions[6];
  const country = user.questions[1];
  const state = user.questions[16];
  const nationality = user.questions[36];
  const generalStatus = user.questions[0];

  const bookmark = "/images/saved_icon.svg";

  return (
    <>
      <div className={classes.box}>
        {/* <img
          onClick={() => {
            console.log("Hello Image");
          }}
          src={bookmark}
          alt="bookmark"
        /> */}
        <div
          onClick={() => {
            router.push(`/users/${user.username}`);
          }}
        >
          <div className={classes.image}>
            <Image width={103} height={103} src={image} alt={hijab} />
          </div>
          <div className={classes.text}>
            <span>
              {gender} {hijab} {age} سنة
            </span>
            <br />
            <span>
              تعيش في {country} {state && "-"} {state}
            </span>
            <br />
            <span>الجنسية من: {nationality}</span>
            <br />
            <span>الحالة الاجتماعية: {generalStatus}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WomanUserCard;
