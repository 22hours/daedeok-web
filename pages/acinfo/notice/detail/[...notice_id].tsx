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
    return {
        props: {},
    };
}

export default NoticeDetail;
