import React, { useState, useEffect } from "react";
import TutorNoticeEditor from "components/organism/TutorNoticeEditor/TutorNoticeEditor";

type Props = {};

const ClassNoticeNew = () => {
    return (
        <div>
            <TutorNoticeEditor type={"NEW"} />
        </div>
    );
};

export default ClassNoticeNew;
