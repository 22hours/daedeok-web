import "../styles/global.scss";
import "styles/ui_input_global.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthProvider } from "store/AuthStore";
import { FirebaseProvider } from "store/FirebaseStore";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            //@ts-ignore
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const Layout = Component.Layout || ((page) => <GlobalLayout>{page}</GlobalLayout>);

    return (
        <>
            <CssBaseline />
            <AuthProvider>{Layout(<Component {...pageProps} />)}</AuthProvider>
        </>
    );
}

export default MyApp;
