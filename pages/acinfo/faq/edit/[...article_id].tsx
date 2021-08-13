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

const FaqEditor = dynamic(() => import("components/organism/FaqEditor/FaqEditor"), {
    ssr: false,
});

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
    if (!originData) {
        return <div>NOW LOADING</div>;
    } else {
        return (
            <div>
                <FaqEditor
                    type={"EDIT"}
                    //@ts-ignore
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
