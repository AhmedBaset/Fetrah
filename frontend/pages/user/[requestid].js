import Layout from "../../components/Layout";
import { fetchRequest } from "../../actions/user";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";
import { useEffect, useState } from "react";
import classes from "../../components/user/UserFinally.module.css";
import Image from "next/image";
import Link from "next/link";
const Finally = ({ request }) => {
  const signedInUser = isAuth();
  const [otherUser, setOtherUser] = useState();
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (request === null) {
      router.replace("/users");
    }
  }

  useEffect(() => {
    if (signedInUser.username === request.sender.username) {
      setOtherUser(request.reciever);
    } else if (signedInUser.username === request.reciever.username) {
      setOtherUser(request.sender);
    }
  }, [signedInUser]);

  if (!otherUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>جاري التحميل...</p>
      </div>
    );
  }

  const showManDetails = () => {
    return (
      <>
        <div style={{ display: "flex", direction: "rtl" }}>
          <p>لقد تم التوافق بينك وبين العريس كود .</p>
          <Link href={`/users/${otherUser.username}`}>
            {otherUser.username}
          </Link>
        </div>
        <p>ويجب أن يقوم العريس بالاتصال بولي أمرك خلال الـ48 ساعة القادمة </p>
        <h4>اسم العريس: {otherUser.name}</h4>
      </>
    );
  };

  const showWomanDetails = () => {
    return (
      <>
        <div style={{ display: "flex", direction: "rtl" }}>
          <p>لقد تم التوافق بينك وبين العروسة كود .</p>
          <Link href={`/users/${otherUser.username}`}>
            {otherUser.username}
          </Link>
        </div>
        <p>
          ويجب عليك أن تقوم بالاتصال بولي أمر العروسة خلال 48 ساعة من تاريخ
          التوافق
        </p>
        <h4>رقم ولي أمر العروس: {otherUser.questions[15]}</h4>
        <h4>اسم العروس: {otherUser.name}</h4>
      </>
    );
  };

  return (
    <Layout>
      <div className={classes["home__container"]}>
        <div className={classes["welcome__message_container"]}>
          <Image
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
            src={"/images/flower.png"}
            width={45}
            height={45}
            alt="flower"
          />
          <h3>مبارك عليكما</h3>
          <Image
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
            src={"/images/flower.png"}
            width={45}
            height={45}
            alt="flower"
          />
        </div>
        {otherUser.gender === "man" ? showManDetails() : showWomanDetails()}
        <br/>
        <br/>
        <h6>اذا كانت لديك أي مشكلة تواصل معنا عن طريق</h6>
        <Link href={"/support"}>صفحة الدعم</Link>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { requestid } = context.query;

  let requestData = null;

  try {
    requestData = await fetchRequest(requestid);
  } catch (error) {
    console.error("Error fetching request data: ", error);
  }

  return {
    props: {
      request: requestData.data || null,
    },
  };
}

export default Finally;
