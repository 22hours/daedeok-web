import React from "react";
import ClassJoin from "components/organism/ClassJoin/ClassJoin";
import { ClassJoinStoreProvider } from "store/ClassJoinStore";

type Props = {};

const dummy = [
    {
        title: "요한계시록-1",
        category: "장년부 소모임",
        start_date: "2021-08-02T20:56:57.875",
        end_date: "2021-08-02T20:56:57.875",
        student_limit: 20,
        student_num: 30,
        status: "POSSIBLE",
    },
    {
        title: "요한계시록-1",
        category: "장년부 소모임",
        start_date: "2021-08-02T20:56:57.875",
        end_date: "2021-08-02T20:56:57.875",
        student_limit: 20,
        student_num: 30,
        status: "ING",
    },
    {
        title: "요한계시록-1",
        category: "장년부 소모임",
        start_date: "2021-08-02T20:56:57.875",
        end_date: "2021-08-02T20:56:57.875",
        student_limit: 20,
        student_num: 30,
        status: "POSSIBLE",
    },
    {
        title: "요한계시록-1",
        category: "장년부 소모임",
        start_date: "2021-08-02T20:56:57.875",
        end_date: "2021-08-02T20:56:57.875",
        student_limit: -1,
        student_num: 30,
        status: "IMPOSSIBLE",
    },
    {
        title: "요한계시록-1",
        category: "장년부 소모임",
        start_date: "2021-08-02T20:56:57.875",
        end_date: "2021-08-02T20:56:57.875",
        student_limit: 20,
        student_num: 30,
        status: "POSSIBLE",
    },
    {
        title: "요한계시록-1",
        category: "장년부 소모임",
        start_date: "2021-08-02T20:56:57.875",
        end_date: "2021-08-02T20:56:57.875",
        student_limit: 50,
        student_num: 30,
        status: "POSSIBLE",
    },
];

const ClassJoinPage = () => {
    return (
        <div>
            <ClassJoinStoreProvider>
                <ClassJoin dummy={dummy} />
            </ClassJoinStoreProvider>
        </div>
    );
};

export default ClassJoinPage;
