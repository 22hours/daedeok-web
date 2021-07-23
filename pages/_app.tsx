import "../styles/global.scss";
function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout || ((page) => page);
    return Layout(<Component {...pageProps} />);
}

export default MyApp;
