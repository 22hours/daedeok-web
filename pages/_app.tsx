import "../styles/global.scss";
import "styles/ui_input_global.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        console.log("APP RERENDER");
    });
    const Layout = Component.Layout || ((page) => <GlobalLayout>{page}</GlobalLayout>);
    return Layout(<Component {...pageProps} />);
}

export default MyApp;
