import style from "./AdminLayout.module.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import dynamic from "next/dynamic";
type Props = {};

const AdminSidebar = dynamic(() => import("components/organism/AdminSidebar/AdminSidebar"), {
    ssr: false,
});

const AdminLayout = ({ children }) => {
    return (
        <div className={style.container}>
            <div className={style.aside}>
                <div></div>
                <AdminSidebar />
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

AdminLayout.Layout = (page: any) => <GlobalLayout>{page}</GlobalLayout>;

export default AdminLayout;
