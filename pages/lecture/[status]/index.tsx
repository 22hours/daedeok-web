import React, { useState, useEffect } from "react";
type Props = {};

const index = (props) => {
    console.log(props);

    return (
        <div>
            <h2>STATUS</h2>
            <h4>{props.data.status}</h4>
        </div>
    );
};

export async function getStaticProps({ params }) {
    return {
        props: {
            data: params,
        },
    };
}

export async function getStaticPaths() {
    const paths = [{ params: { status: "open" } }, { params: { status: "close" } }];
    return { paths, fallback: false };
}

export default index;
