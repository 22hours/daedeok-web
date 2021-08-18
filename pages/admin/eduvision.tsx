import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });
type State = {
    title: string;
    content: string;
};
const Eduvision = () => {
    const router = useRouter();
    const { auth, clientSideApi } = useAuthStore();
    const { alertOn } = useAlert();
    const [originData, setOriginData] = useState<State | null>(null);

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ACINFO_EDUVISION");
        if (res.result === "SUCCESS") {
            setOriginData({
                title: "",
                content: res.data.content,
            });
        } else {
            alertOn({
                title: "에러가 발생하였습니다",
                message: "기존 데이터를 불러오는데에 실패하였습니다",
                type: "ERROR",
            });
        }
    };
    useEffect(() => {
        if (auth) {
            getOriginData();
        }
    }, [auth]);

    const handleEdited = () => {
        alertOn({
            title: "",
            message: "성공적으로 수정되었습니다",
            type: "POSITIVE",
        });
    };

    if (originData === null) {
        return <div>LOAD NOW</div>;
    } else {
        return (
            <div>
                <PageHeader title={"교육비전 관리"} />
                <ContentEditor
                    type={"EDIT"}
                    editApiConfig={{
                        method: "PUT",
                        domain: "MAIN",
                        ep: "ACINFO_EDUVISION",
                    }}
                    onEdited={handleEdited}
                    isHeaderHide={true}
                    imgPath={"AC_INFO"}
                    originData={originData}
                />
            </div>
        );
    }
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Eduvision;
