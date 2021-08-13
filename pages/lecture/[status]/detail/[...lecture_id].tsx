import PageHeader from "@ui/PageHeader";
import LectureDetailPage from "components/organism/LectureDetailPage/LectureDetailPage";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const LectureDetail = () => {
    // return <LectureDetail />;
    const router = useRouter();
    const { status } = router.query;
    return (
        <div>
            <PageHeader title={status === "open" ? "현재 진행중인 강의" : "종료된 강의"} />
            <LectureDetailPage />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return {
        props: {},
    };
}
export default LectureDetail;
