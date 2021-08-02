import Button from "@ui/buttons/Button";
import Collapse from "@ui/buttons/CollapseButton";
import Typo from "@ui/Typo";
import style from "./PcSideBar.module.scss";
type Props = {};

const PcSideBar = ({ children }) => {
    return <div className={style.container}>{children}</div>;
};

export default PcSideBar;
