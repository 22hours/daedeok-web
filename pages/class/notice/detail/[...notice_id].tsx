import cookies from "next-cookies";
import React, { useState, useEffect } from "react";
import TutorNoticeDetail from "components/organism/TutorNoticeDetail/TutorNoticeDetail";

const NoticeDetail = (props) => {
    return <TutorNoticeDetail noticeId={props.notice_id} />;
};

export async function getServerSideProps(ctx) {
    const allCookies = cookies(ctx);
    console.log(allCookies);
    const { notice_id } = ctx.query;
    return {
        props: {
            notice_id: notice_id,
        },
    };
}

export default NoticeDetail;
