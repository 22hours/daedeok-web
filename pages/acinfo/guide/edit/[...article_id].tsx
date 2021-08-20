import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";
import { useConfirm } from "store/GlobalConfirmStore";
import PageHeader from "@ui/PageHeader";

type State = {
    title: string;
    content: string;
};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const GuideEdit = () => {
    const router = useRouter();
    const { article_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);
    const { confirmOn } = useConfirm();

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "GUIDE_EDIT", { article_id: article_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
            });
        } else {
            alert(res.msg);
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
            onSuccess: () => router.push(`/acinfo/guide/detail/${article_id}`),
            isFailButtonRemove: true,
        });
    };

    if (originData === null) {
        return <div>NOW LOADING FAQ EDITOR</div>;
    } else {
        return (
            <div>
                <PageHeader title={"아카데미 사용법"} />
                <ContentEditor
                    type={"EDIT"}
                    editApiConfig={{
                        method: "PUT",
                        domain: "MAIN",
                        ep: "GUIDE_EDIT",
                        url_query: { article_id: article_id },
                    }}
                    onEdited={handleEdited}
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
export default GuideEdit;
