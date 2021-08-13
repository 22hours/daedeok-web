import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";

const TutorNoticeEditor = dynamic(() => import("components/organism/TutorNoticeEditor/TutorNoticeEditor"), {
    ssr: false,
});

type Props = {};

const ClassNoticeNew = () => {
    return (
        <div>
            <TutorNoticeEditor type={"NEW"} />
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
