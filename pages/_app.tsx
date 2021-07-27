import "../styles/global.scss";
import "styles/ui_input_global.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import React, { useEffect } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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
    // return Layout(<Component {...pageProps} />);

    return (
        <>
            <CssBaseline />
            {Layout(<Component {...pageProps} />)}
        </>
    );
}

export default MyApp;
