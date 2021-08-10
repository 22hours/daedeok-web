import React, { useState, useEffect } from "react";
import style from "./StudentAttendanceList.module.scss";
import { res_types } from "@global_types";
import { useRouter } from "next/router";
//component
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import TableWrapper from "@ui/board/TableWrapper";
//store
import { useAuthStore } from "store/AuthStore";

type State = res_types.studentAttendanceList;

// ELEMENT TYPES
const initState: State = {
    studentAttendanceList: [],
};

const StatusButton = ({ state }) => {
    if (state) {
        return (
            <Button
                content={"수강"}
                backgroundColor="red_accent"
                fontSize="smaller"
                color="white"
                alignment="center"
                size="small"
                line="inline"
                type="SQUARE"
                className={style.cursor_none}
            />
        );
    } else {
        return (
            <Button
                content={"미수강"}
                backgroundColor="brown_base"
                fontSize="smaller"
                color="white"
                alignment="center"
                size="small"
                line="inline"
                type="SQUARE"
                className={style.cursor_none}
            />
        );
    }
};

const StudentAttendanceList = () => {
    const { clientSideApi } = useAuthStore();
    const [attendanceList, setAttendanceList] = useState<State["studentAttendanceList"]>(
        initState["studentAttendanceList"]
    );
    const router = useRouter();

    const lectureId = router.asPath.split("/")[3];

    useEffect(() => {
        getStudentAttendanceList();
    }, []);

    const getStudentAttendanceList = async () => {
        const res = await clientSideApi(
            "GET",
            "MAIN",
            "LECTURE_FIND_USER_ATTENDANCE",
            {
                lecture_id: lectureId,
            },
            {
                lecture_id: lectureId,
            }
        );
        if (res.result === "SUCCESS") {
            var data = res.data;
            setAttendanceList(data);
        }
    };

    return (
        <div className={style.class_attendance_wrapper}>
            <TableWrapper>
                {attendanceList?.map((it, idx) => (
                    <div key={idx}>
                        <TableRow week={it.week.toString() + "주차"} weekTitle={it.title}>
                            <div style={{ width: "90px", marginRight: "20px" }}>
                                <StatusButton state={it.status} />
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
        </div>
    );
};

export default StudentAttendanceList;
