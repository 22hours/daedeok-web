import React, { useState, useEffect } from "react";
type Props = {};

const LectureDetail = (props) => {
    console.log(props);
    return (
        <div>
            <h2>[...lecture_id]</h2>
            <h4>{props.status}</h4>
            <h4>{props.lecture_id}</h4>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    console.log(ctx.query.status);
    const { status, lecture_id } = ctx.query;
    return {
        props: {
            status: status,
            lecture_id: lecture_id,
        },
    };
}
export default LectureDetail;
