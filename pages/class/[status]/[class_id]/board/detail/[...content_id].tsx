/* eslint-disable react/display-name */
import Layout from "components/Layout";
import React, { useState, useEffect } from "react";
type Props = {};

const ClassBoardDetail = ({ article_id }) => {
    return (
        <div>
            <h2>[...article_id]</h2>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: {},
    };
}

ClassBoardDetail.Layout = (page) => (
    <Layout>
        <div>{page}</div>
    </Layout>
);
export default ClassBoardDetail;
