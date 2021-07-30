import Button from "@ui/buttons/Button";
import Collapse from "@ui/buttons/CollapseButton";
import Typo from "@ui/Typo";
import style from "./Sidebar.module.scss";

const Sidebar = () => {
    return (
        <div className={style.container}>
            <div className={style.user_info}>
                <Typo type="TEXT" size="large" color="brown_font" content="이연곤" />
            </div>
            <Button
                type="SQUARE"
                size="medium"
                fontSize="large"
                line="inline"
                backgroundColor="yellow_accent"
                color="white"
                content="수강신청"
                alignment="center"
            />
        </div>
    );
};
export default Sidebar;
