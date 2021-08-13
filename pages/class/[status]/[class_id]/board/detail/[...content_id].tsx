import Link from "next/link";
import React, { useState, useEffect } from "react";
import ClassBoardDetail from "components/organism/ClassBoardDetail/ClassBoardDetail";
import { SecureRoute } from "lib/server/accessController";

const ClassBoardDetailPage = () => {
    return <ClassBoardDetail />;
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default ClassBoardDetailPage;
