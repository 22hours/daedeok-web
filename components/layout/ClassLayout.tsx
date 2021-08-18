import style from "./ClassLayout.module.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import dynamic from "next/dynamic";

const ClassSideBar = dynamic(() => import("components/organism/ClassSidebar/ClassSideBar"), {
    ssr: false,
});
type Props = {};

const ClassLayout = ({ children }) => {
    return (
        <div className={style.container}>
            <div className={style.aside}>
                <div></div>
                <ClassSideBar />
                <div></div>
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
