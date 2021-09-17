import React, { useEffect, useState } from "react";
import AdminMemberEdit from "components/organism/AdminMemberEdit/AdminMemberEdit";
import { SecureRoute } from "lib/server/accessController";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import { useAlert } from "store/GlobalAlertStore";

const AdminMemberEditPage = () => {
    const { clientSideApi, auth } = useAuthStore();
    const router = useRouter();
    const { user_id } = router.query;
    const { apiErrorAlert } = useAlert();

    const [memberData, setMemberData] = useState("");

    useEffect(() => {
        if (auth) {
            getMemberDetail();
        }
    }, [auth]);

    const getMemberDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_MEMBER", { user_id: user_id });
        if (res.result === "SUCCESS") {
            setMemberData(res.data);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    return (
        <div>
            <AdminMemberEdit memberData={memberData} />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default AdminMemberEditPage;
