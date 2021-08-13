import React, { useState, useEffect } from "react";
import NoticeList from "components/organism/NoticeList/NoticeList";
import { ListCommonProvider } from "store/ListCommonStore";
import PageHeader from "@ui/PageHeader";

const index = () => {
    return (
        <>
            <PageHeader title={"공지사항"} />
            <ListCommonProvider>
                <NoticeList />
            </ListCommonProvider>
        </>
    );
};

export default index;
