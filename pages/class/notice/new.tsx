import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("components/molecule/TextEditor/TextEditor"), { ssr: false });

type Props = {};

const ClassNoticeNew = () => {
    return (
        <div>
            <h2>new</h2>
            <TextEditor />
        </div>
    );
};

export default ClassNoticeNew;
