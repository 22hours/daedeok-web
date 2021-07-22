import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout || ((page) => page);
    return Layout(<Component {...pageProps} />);
}

export default MyApp;
