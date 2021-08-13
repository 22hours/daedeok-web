import style from "./AdminLayout.module.scss";
import GlobalLayout from "components/layout/GlobalLayout";
import AdminSidebar from "components/organism/AdminSidebar/AdminSidebar";
type Props = {};

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
