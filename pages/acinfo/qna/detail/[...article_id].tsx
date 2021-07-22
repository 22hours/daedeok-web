import React, { useState, useEffect } from "react";
type Props = {};

const QNADetail = () => {
    return (
        <div>
            <h2>[...article_id]</h2>
        </div>
    );
};

export async function getStaticProps({ params }) {
    return {
        props: {
            data: {},
        },
    };
}

export async function getStaticPaths() {
    const paths = [];
    return { paths, fallback: true };
}

export default QNADetail;
