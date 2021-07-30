import style from "./ClassLayout.module.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import ClassSidebar from "components/organism/ClassSidebar/ClassSideBar";

type Props = {};

const ClassLayout = ({ children }) => {
    return (
        <div className={style.container}>
            <div className={style.aside}>
                <ClassSidebar />
            </div>
            <div className={style.article}>
                <div></div>
                {children}
                <div></div>
            </div>
        </div>
    );
};

ClassLayout.Layout = (page: any) => <GlobalLayout>{page}</GlobalLayout>;

export default ClassLayout;
