import Layout from "../components/Layout";
import Link from "next/link";
import LandingPage from "../components/Home/LandingPage";
import StepOne from "../components/Home/StepOne";
import StepTwo from "../components/Home/StepTwo";
import StepThree from "../components/Home/StepThree";
import StepFour from "../components/Home/StepFour";
import StepFive from "../components/Home/StepFive";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../config";
import Head from "next/head";
import { useRouter } from "next/router";

const Index = () => {
	const router = useRouter();
	const head = () => {
		const title = `للزواج الإسلامي | ${APP_NAME}`;
		return (
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content="التطبيق الأول للزواج الإسلامي الذي يرضي الله عز وجل"
				/>
				<link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
				<meta property="og:title" content={`تزوج لتسكن | ${APP_NAME}`} />
				<meta
					name="og:description"
					content="الزواج سنة النبي صلى الله عليه وسلم"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
				<meta property="og:site_name" content={`${APP_NAME}`} />

				<meta property="og:image" content={`${DOMAIN}/images/logo.png`} />
				<meta
					property="og:image:secure_url"
					content={`${DOMAIN}/static/images/logo.png`}
				/>
				<meta property="og:image:type" content={`image/png`} />
				<meta property="fb:app_id" content={`${FB_APP_ID}`} />
			</Head>
		);
	};

	return (
		<>
			{head()}
			<Layout>
				<LandingPage />
				<StepOne />
				<StepTwo />
				<StepThree />
				<StepFour />
				<StepFive />
				<div className="clearfix"></div>
			</Layout>
		</>
	);
};

export default Index;
