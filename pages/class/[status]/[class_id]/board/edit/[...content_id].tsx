import React, { useState, useEffect } from "react";
type Props = {};

const ClassBoardEdit = () => {
    return (
        <div>
            <h2>[...article_id]</h2>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    console.log(ctx);
    return {
        props: {},
    };
}
export default ClassBoardEdit;
