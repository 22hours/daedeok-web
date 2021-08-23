import "../styles/global.scss";
import "styles/ui_input_global.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthProvider } from "store/AuthStore";
import "styles/nprogress.css";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { GlobalLoaderProvider } from "store/GlobalLoader";
import { GlobalAlertProvider } from "store/GlobalAlertStore";
import { GlobalConfirmProvider } from "store/GlobalConfirmStore";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            //@ts-ignore
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const router = useRouter();
    useEffect(() => {
        const handleStart = (url) => {
            console.log(`Loading: ${url}`);
            NProgress.start();
        };
        const handleStop = () => {
            NProgress.done();
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleStop);
        router.events.on("routeChangeError", handleStop);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleStop);
            router.events.off("routeChangeError", handleStop);
        };
    }, [router]);

    const Layout = Component.Layout || ((page) => <GlobalLayout>{page}</GlobalLayout>);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="My First Static Website" />
                <meta name="keywords" content="nextjs,static,website" />
                <meta name="viewport" content="user-scalable=no, width=device-width"></meta>

                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
            </Head>
            <CssBaseline />
            <GlobalLoaderProvider>
                <GlobalConfirmProvider>
                    <GlobalAlertProvider>
                        <AuthProvider>{Layout(<Component {...pageProps} />)}</AuthProvider>
                    </GlobalAlertProvider>
                </GlobalConfirmProvider>
            </GlobalLoaderProvider>
        </>
    );
};

export async function getServerSideProps(ctx) {
    console.log("APP");
    return {
        props: {},
    };
}

export default MyApp;
