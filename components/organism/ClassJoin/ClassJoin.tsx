import React from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassJoin.module.scss";
//store
import { useStoreDispatch, useStoreState } from "store/ClassJoinStore";

const JoinButton = ({ state }) => {
    switch (state) {
        case "POSSIBLE":
            return (
                <Button
                    content={"수강신청"}
                    backgroundColor="brown_base"
                    fontSize="smaller"
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
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                    className={style.cursor_none}
                />
            );
        case "ING":
            return (
                <Button
                    content={"수강중"}
                    backgroundColor="yellow_accent"
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                    className={style.cursor_none}
                />
            );
        default:
            return <div></div>;
    }
};

const ClassJoin = ({ dummy }) => {
    const data = useStoreState();

    console.log(data);

    return (
        <div>
            <TableWrapper>
                {dummy.map((it, idx) => (
                    <div key={idx}>
                        <TableRow
                            title={it.title}
                            category={it.category}
                            date={UseDate("YYYY-MM-DD", it.start_date) + "~" + UseDate("YYYY-MM-DD", it.end_date)}
                            studentLimit={{
                                student_limit: it.student_limit === -1 ? "무제한" : it.student_limit,
                                student_num: it.student_num,
                            }}
                            href={"/ui/buttons"}
                        >
                            <div style={{ width: "90px", marginRight: "20px" }}>
                                <JoinButton state={it.status} />
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
        </div>
    );
};
export default ClassJoin;
