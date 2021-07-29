import Drawer from "@ui/drawer";

type Props = {};

const drawertest = () => {
    return (
        <div>
            <h2>drawertest</h2>

            <Drawer
                drawerAnchor={"left"}
                drawerButtonChildren={<button>CLICK!</button>}
                drawerInnerChildren={
                    <div>
                        <h2>HAHAgsgs</h2>
                    </div>
                }
            />
        </div>
    );
};

export default drawertest;
