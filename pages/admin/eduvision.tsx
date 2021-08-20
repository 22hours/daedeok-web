import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });
type State = {
    title: string;
    content: string;
};
const Eduvision = () => {
    const router = useRouter();
    const { auth, clientSideApi } = useAuthStore();
    const { alertOn } = useAlert();
    const { confirmOn } = useConfirm();

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
        confirmOn({
            message: "게시글을 수정하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => {
                if (typeof window !== "undefined") {
                    location.reload();
                }
            },
            isFailButtonRemove: true,
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
