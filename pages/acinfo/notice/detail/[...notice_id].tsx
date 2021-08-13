import React, { useState, useEffect } from "react";
import NoticeDetail from "components/organism/NoticeDetail/NoticeDetail";
import PageHeader from "@ui/PageHeader";

const NoticeDetailPage = (props) => {
    return (
        <div>
            <PageHeader title={"공지사항"} />
            <NoticeDetail noticeId={props.notice_id} />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { notice_id } = ctx.query;
    return {
        props: {
            notice_id: notice_id,
        },
    };
}

export default NoticeDetailPage;
