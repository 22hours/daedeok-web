import cookies from "next-cookies";
import React, { useState, useEffect } from "react";
import TutorNoticeDetail from "components/organism/TutorNoticeDetail/TutorNoticeDetail";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";

const NoticeDetail = (props) => {
    return <TutorNoticeDetail />;
};

export async function getServerSideProps(ctx) {
    const { notice_id } = ctx.query;
    const { role } = cookies(ctx);
    if (role === "ROLE_ADMIN") {
        return {
            redirect: {
                destination: `/admin/tutor-notice/detail/${notice_id}`,
                permanent: false,
            },
        };
    }
    return SecureRoute(ctx, "ROLE_TUTOR");
}

export default NoticeDetail;
