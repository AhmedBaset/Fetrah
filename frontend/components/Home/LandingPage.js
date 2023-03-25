import classes from "./Landingpage.module.css";
import {useRouter} from "next/router";

function LandingPage() {
  const router = useRouter();
  return (
    <div className={classes["header"]}>
      <div className={classes["container"]}>
        <div className={classes["text"]}>
          <p>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <div className={classes["divider"]}></div>
          <h3>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </h3>
          <h1>لتسكنوا</h1>
          <h3>
            إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚإِنَّ فِي <br />
            ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </h3>
          <div className={classes["divider"]} />
          <p>الموقع الأول للزواج الإسلامي الذي يرضي الله عز وجل</p>
          <button onClick={()=> {router.push('/users')}} className={classes["submit"]}>ابحث عن زوجك</button>
        </div>
        <div className={classes["image"]}>
          <img src="/images/muslim.svg" alt="لتسكنوا" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
