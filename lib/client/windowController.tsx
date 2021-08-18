const getWindowSize = () => {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width;
};
const WindowController = {
    getWindowSize,
};
export default WindowController;
