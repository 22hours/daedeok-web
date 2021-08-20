import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useConfirm } from "store/GlobalConfirmStore";
const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const ClassNoticeNew = () => {
    const router = useRouter();
    const { confirmOn } = useConfirm();
    const onCreated = (notice_id) => {
        confirmOn({
            message: "게시글을 작성하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/class/notice/detail/${notice_id}`),
            isFailButtonRemove: true,
        });
    };
    return (
        <div>
            <ContentEditor
                type={"NEW"}
                submitApiConfig={{
                    method: "POST",
                    domain: "MAIN",
                    ep: "TUTOR_NOTICE_NEW",
                }}
                onCreated={onCreated}
            />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { role } = cookies(ctx);
    if (role === "ROLE_ADMIN") {
        return {
            redirect: {
                destination: `/admin/tutor-notice/new`,
                permanent: false,
            },
        };
    }
    return SecureRoute(ctx, "ROLE_TUTOR");
}

export default ClassNoticeNew;
