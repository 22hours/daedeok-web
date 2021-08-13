import React, { useState, useEffect } from "react";
import QnaDetail from "components/organism/QnaDetail/QnaDetail";
import PageHeader from "@ui/PageHeader";

const QnaDetailPage = (props) => {
    return (
        <div>
            <PageHeader title={"질문과 답변"} />
            <QnaDetail articleId={props.article_id} />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { article_id } = ctx.query;
    return {
        props: {
            article_id: article_id,
        },
    };
}

export default QnaDetailPage;
