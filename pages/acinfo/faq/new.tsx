import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useAlert } from "store/GlobalAlertStore";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const NewFaq = () => {
    const router = useRouter();
    const { alertOn, apiErrorAlert } = useAlert();
    const onCreated = (article_id) => {
        alertOn({
            title: "",
            //@ts-ignore
            message: "게시글을 작성하였습니다",
            type: "POSITIVE",
        });
        router.push(`/acinfo/faq/detail/${article_id}`);
    };

    return (
        <>
            <PageHeader title={"자주묻는 질문"} />
            <ContentEditor
                type={"NEW"}
                submitApiConfig={{
                    method: "POST",
                    domain: "MAIN",
                    ep: "FAQ_NEW",
                }}
                onCreated={onCreated}
            />
        </>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NewFaq;
