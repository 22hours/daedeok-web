import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useConfirm } from "store/GlobalConfirmStore";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const NewGuide = () => {
    const router = useRouter();
    const { confirmOn } = useConfirm();

    const onCreated = (article_id) => {
        confirmOn({
            message: "게시글을 작성하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/acinfo/guide/detail/${article_id}`),
            isFailButtonRemove: true,
        });
    };

    return (
        <>
            <PageHeader title={"아카데미 사용법"} />
            <ContentEditor
                type={"NEW"}
                submitApiConfig={{
                    method: "POST",
                    domain: "MAIN",
                    ep: "GUIDE_NEW",
                }}
                onCreated={onCreated}
            />
        </>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NewGuide;
