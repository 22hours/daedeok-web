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
        const res = await clientSideApi("GET", "MAIN", "TOTAL_NOTICE_EDIT", { article_id: article_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
            });
            console.log(res.data);
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
        router.push(`/acinfo/notice/detail/${article_id}`);
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
                        ep: "TOTAL_NOTICE_EDIT",
                        url_query: { article_id: article_id },
                    }}
                    onEdited={handleEdited}
                    imgPath={"GLOBAL_NOTICE"}
                    originData={originData}
                />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    const { notice_id } = ctx.query;
    const { role } = cookies(ctx);
    if (role === "ROLE_TUTOR" || role === "ROLE_MEMBER") {
        return {
            redirect: {
                destination: `/acinfo/notice`,
                permanent: false,
            },
        };
    }
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NoticeEdit;
