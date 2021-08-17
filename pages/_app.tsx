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
            <CssBaseline />
            <GlobalLoaderProvider>
                <GlobalAlertProvider>
                    <AuthProvider>{Layout(<Component {...pageProps} />)}</AuthProvider>
                </GlobalAlertProvider>
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
