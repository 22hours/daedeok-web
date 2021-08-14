import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";

type State = {
    title: string;
    content: string;
    secret: boolean;
    category: string;
};

const QnaEditor = dynamic(() => import("components/organism/QnaEditor/QnaEditor"), {
    ssr: false,
});

const QnaEdit = () => {
    const router = useRouter();
    const { article_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "QNA_FIND_DETAIL", { article_id: article_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
                category: res.data.category,
                secret: res.data.secret,
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
    if (!originData) {
        return <div>NOW LOADING QNA EDITOR</div>;
    } else {
        return (
            <div>
                <QnaEditor
                    type={"EDIT"}
                    //@ts-ignore
                    originData={originData}
                />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default QnaEdit;
