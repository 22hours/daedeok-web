import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { WysiwygEditorProvider } from "store/WysiwygEditorStore";
type Props = {};

const ClassBoardEditor = dynamic(() => import("components/organism/ClassBoardEditor/ClassBoardEditor"), { ssr: false });

const ClassBoardEdit = () => {
    return (
        <WysiwygEditorProvider>
            <ClassBoardEditor type={"EDIT"} />
        </WysiwygEditorProvider>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: {},
    };
}
export default ClassBoardEdit;
