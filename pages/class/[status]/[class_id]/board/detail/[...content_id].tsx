/* eslint-disable react/display-name */
import Layout from "components/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
type Props = {};

const ClassBoardDetail = ({ article_id }) => {
    return (
        <div>
            <h2>[...article_id]</h2>
            <Link href={"/class/open"}>
                <button>gogo</button>
            </Link>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: {},
    };
}

export default ClassBoardDetail;
