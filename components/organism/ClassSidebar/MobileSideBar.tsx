import Typo from "@ui/Typo";
import style from "./MobileSideBar.module.scss";

// icons
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@ui/drawer";
import useBoolean from "lib/hooks/useBoolean";

type Props = {
    children: JSX.Element;
};

const MobileSideBar = (props: Props) => {
    const drawer = useBoolean(true);
    // @ts-ignore
    const toggleDrawer = () => drawer.onChange();

    const DrawerInner = () => {
        return <div className={style.inner_container}>{props.children}</div>;
    };
    return (
        <Drawer
            isOpen={drawer.value}
            toggleDrawer={toggleDrawer}
            drawerAnchor={"left"}
            drawerButtonChildren={
                <div className={style.container}>
                    <MenuIcon />
                    <Typo type={"TEXT"} size={"medium"} content={"강의실 상세 메뉴"} />
                </div>
            }
            drawerInnerChildren={<DrawerInner />}
        />
    );
};

export default MobileSideBar;
