import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import PageHeader from "@ui/PageHeader";
const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const ClassNoticeNew = () => {
    const router = useRouter();
    const onCreated = (notice_id) => {
        alert("게시글을 작성하였습니다");
        router.push(`/class/notice/detail/${notice_id}`);
    };
    return (
        <div>
            <ContentEditor
                type={"NEW"}
                submitApiConfig={{
                    method: "POST",
                    domain: "MAIN",
                    ep: "TOTAL_NOTICE_NEW",
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
