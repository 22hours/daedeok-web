import React, { useState, useEffect } from "react";
import FaqDetail from "components/organism/FaqDetail/FaqDetail";
import PageHeader from "@ui/PageHeader";
import GuideDetail from "components/molecule/GuideDetail/GuideDetail";

const GuideDetailPage = (props) => {
    return (
        <div>
            <PageHeader title={"아카데미 사용법"} />
            <GuideDetail articleId={props.article_id} />
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

export default GuideDetailPage;
