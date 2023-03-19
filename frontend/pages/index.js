import Layout from "../components/Layout";
import Link from "next/link";
import LandingPage from "../components/Home/LandingPage";
import StepOne from "../components/Home/StepOne";
import StepTwo from "../components/Home/StepTwo";
import StepThree from "../components/Home/StepThree";
import StepFour from "../components/Home/StepFour";
import StepFive from "../components/Home/StepFive";
const Index = () => {
  return (
    <Layout>
      <section>
        <LandingPage />
      </section>
      <section>
        <StepOne />
      </section>
      <section>
        <StepTwo />
      </section>
      <section>
        <StepThree />
      </section>
      <section>
        <StepFour />
      </section>

      <section>
        <StepFive />
      </section>

    </Layout>
  );
};

export default Index;
