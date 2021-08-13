import React, { useState, useEffect } from "react";
import FaqDetail from "components/organism/FaqDetail/FaqDetail";
import PageHeader from "@ui/PageHeader";

const FAQDetailPage = (props) => {
    return (
        <div>
            <PageHeader title={"자주묻는 질문"} />
            <FaqDetail articleId={props.article_id} />
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

export default FAQDetailPage;
