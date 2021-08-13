import Link from "next/link";
import React, { useState, useEffect } from "react";
import ClassBoardDetail from "components/organism/ClassBoardDetail/ClassBoardDetail";

const ClassBoardDetailPage = (props) => {
    return <ClassBoardDetail contentId={props.content_id} />;
};

export async function getServerSideProps(ctx) {
    const { content_id } = ctx.query;
    return {
        props: {
            content_id: content_id,
        },
    };
}

export default ClassBoardDetailPage;
