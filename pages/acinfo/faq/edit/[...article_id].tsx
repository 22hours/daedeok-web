import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";

type State = {
    title: string;
    content: string;
};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const NoticeEdit = () => {
    const router = useRouter();
    const { article_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FAQ_EDIT", { article_id: article_id });
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
        alert("수정되었습니다");
        router.push(`/acinfo/faq/detail/${article_id}`);
    };

    if (originData === null) {
        return <div>NOW LOADING FAQ EDITOR</div>;
    } else {
        return (
            <div>
                <ContentEditor
                    type={"EDIT"}
                    editApiConfig={{
                        method: "PUT",
                        domain: "MAIN",
                        ep: "FAQ_EDIT",
                        url_query: { article_id: article_id },
                    }}
                    onEdited={handleEdited}
                    imgPath={"FAQ"}
                    originData={originData}
                />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NoticeEdit;
