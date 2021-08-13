import PageHeader from "@ui/PageHeader";
import CategoryList from "components/organism/CategoryList/CategoryList";
import React, { useState, useEffect } from "react";
import { ListCommonProvider } from "store/ListCommonStore";
type Props = {};

const index = () => {
    return (
        <>
            <PageHeader title={"강의 카테고리"} />
            <ListCommonProvider>
                <CategoryList />
            </ListCommonProvider>
        </>
    );
};

export default index;
