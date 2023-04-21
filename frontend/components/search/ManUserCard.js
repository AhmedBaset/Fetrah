import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./ManUserCard.module.css";

const ManUserCard = (props) => {
  const user = props.user;
  const router = useRouter();

  const gender = "عريس";
  let le7ya = "";
  if (user.questions[23] == "ملتحي") {
    le7ya = "ملتحي";
  } else if (user.questions[23] == "لحية خفيفة") {
    le7ya = "";
  } else {
    le7ya = "أملس";
  }

  const age = user.questions[6];
  const country = user.questions[1];
  const state = user.questions[16];
  const nationality = user.questions[36];
  const generalStatus = user.questions[0];

  const bookmark = "/images/saved_icon.svg";
  const image =
    le7ya == "ملتحي" ? "/images/man_with_le7ya.svg" : "/images/man_amls.svg";
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
            <Image width={120} height={120} src={image} alt="niqab" />
          </div>
          <div className={classes.text}>
            <span>
              {gender} {le7ya} {age} سنة
            </span>
            <br />
            <span>
              يعيش في {country} {state && "-"} {state}
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

export default ManUserCard;
