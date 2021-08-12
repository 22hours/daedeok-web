import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

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

export default ClassNoticeNew;
