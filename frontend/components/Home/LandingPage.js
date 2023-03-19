function LandingPage() {
  return (
    <div className="header">
      <div className="container">
        <div className="text">
          <p>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <div className="divider"></div>
          <h3>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </h3>
          <h1>لتسكنوا</h1>
          <h3>
            إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚإِنَّ فِي <br />
            ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </h3>
          <div className="divider" />
          <p>الموقع الأول للزواج الإسلامي الذي يرضي الله عز وجل</p>
          <button className="submit">إبحث عن زوجك</button>
        </div>
        <div className="image">
          <img src="/images/muslim.svg" alt="لتسكنوا" />
          <div className="divider" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
