import Typo from "@ui/Typo";
import React, { useState, useEffect } from "react";
type Props = {};

const index = (props) => {
    return (
        <div>
            <Typo type={"HEADER"} size={"h1"} content={"STATUS"} />
            <Typo type={"HEADER"} size={"h2"} content={"STATUS"} />
            <Typo type={"HEADER"} size={"h3"} content={"STATUS"} />
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
