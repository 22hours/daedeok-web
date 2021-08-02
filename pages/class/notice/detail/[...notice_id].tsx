import cookies from "next-cookies";
import React, { useState, useEffect } from "react";
type Props = {};

const NoticeDetail = ({ notice_id }) => {
    return (
        <div>
            <h2>[...article_id]</h2>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const allCookies = cookies(ctx);
    console.log(allCookies);

    return {
        props: {},
    };
}

export default NoticeDetail;
