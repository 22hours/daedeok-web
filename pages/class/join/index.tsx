import React from "react";
import Board from "@ui/board/Board";
import Button from "@ui/buttons/Button";
import UseDate from "lib/hooks/useDate";

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

const JoinButton = ({ state }) => {
    console.log(state);
    switch (state) {
        case "POSSIBLE":
            return (
                <Button
                    content={"수강신청"}
                    backgroundColor="brown_base"
                    fontSize="small"
                    color="white"
                    alignment="center"
                    size="small"
                    line="inline"
                    type="SQUARE"
                />
            );
        case "IMPOSSIBLE":
            return (
                <Button
                    content={"신청마감"}
                    backgroundColor="gray_accent"
                    fontSize="small"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                />
            );
        case "ING":
            return (
                <Button
                    content={"수강중"}
                    backgroundColor="yellow_accent"
                    fontSize="small"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                />
            );
        default:
            return <div></div>;
    }
};

const ClassJoin = () => {
    return (
        <div>
            <div className=""></div>
            {dummy.map((it, idx) => (
                <div key={idx}>
                    <Board
                        title={it.title}
                        category={it.category}
                        date={UseDate("YYYY-MM-DD", it.start_date) + "~" + UseDate("YYYY-MM-DD", it.end_date)}
                        studentLimit={{
                            student_limit: it.student_limit === -1 ? "무제한" : it.student_limit,
                            student_num: it.student_num,
                        }}
                    >
                        <JoinButton state={it.status} />
                    </Board>
                </div>
            ))}
        </div>
    );
};

export default ClassJoin;
