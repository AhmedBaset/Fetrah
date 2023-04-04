import Head from "next/head";
import Script from "next/script";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../styles/nprogress.css";
import "../styles/style.css";
import Modal from 'react-modal';

Modal.setAppElement('#__next');
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />


        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script
        id="bootstrap-cdn"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
