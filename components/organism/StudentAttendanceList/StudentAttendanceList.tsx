import React, { useState, useEffect } from "react";
import style from "./StudentAttendanceList.module.scss";
import { res_types } from "@global_types";
//component
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import TableWrapper from "@ui/board/TableWrapper";
//store
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";

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
    const { class_id } = useClassDetailStore();

    const [attendanceList, setAttendanceList] = useState<State["studentAttendanceList"]>(
        initState["studentAttendanceList"]
    );

    useEffect(() => {
        getStudentAttendanceList();
    }, []);

    const getStudentAttendanceList = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_USER_ATTENDANCE", {
            lecture_id: class_id,
        });
        if (res.result === "SUCCESS") {
            var data = res.data;
            setAttendanceList(data);
        }
    };

    return (
        <div className={style.class_attendance_wrapper}>
            <TableWrapper>
                {attendanceList?.map((it, idx) => (
                    <div key={`attendancelist${idx}`}>
                        <TableRow week={it.week.toString() + "주차"} weekTitle={it.title}>
                            <div style={{ width: "90px" }}>
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
