import React from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassJoin.module.scss";
import Pagination from "@ui/pagination/Pagination";
//store
import { useAuthStore } from "store/AuthStore";
import { useStoreState } from "store/ClassJoinListStore";

const JoinButton = ({ state, idx, handleClassJoin }) => {
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
                    onClick={() => {
                        handleClassJoin({ idx });
                    }}
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

const ClassJoin = () => {
    const { clientSideApi } = useAuthStore();
    const data = useStoreState();

    const handleClassJoin = async ({ idx }) => {
        const res_data = await clientSideApi(
            "POST",
            "MAIN",
            "LECTURE_JOIN",
            { lecture_id: idx },
            {
                lecture_id: idx,
            }
        );
        if (res_data.result === "SUCCESS") {
            alert("수강신청이 완료되었습니다.");
        } else {
            alert("실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <TableWrapper>
                {data.lecture_list.map((it, idx) => (
                    <div key={idx}>
                        <TableRow
                            title={it.title}
                            category={it.category}
                            date={UseDate("YYYY-MM-DD", it.start_date) + "~" + UseDate("YYYY-MM-DD", it.end_date)}
                            studentLimit={{
                                student_limit: it.student_limit === -1 ? "무제한" : it.student_limit,
                                student_num: it.student_num,
                            }}
                            href={`/class/join/detail/${it.id}`}
                        >
                            <div style={{ width: "90px", marginRight: "20px" }}>
                                <JoinButton state={it.status} idx={it.id} handleClassJoin={handleClassJoin} />
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
            <div>
                <Pagination />
            </div>
        </div>
    );
};
export default ClassJoin;
