import React, { useState, useEffect } from "react";
type Props = {};

const CategoryDetail = () => {
    return (
        <div>
            <h2>[...category_id]</h2>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    console.log(ctx);
    return {
        props: {},
    };
}
export default CategoryDetail;
