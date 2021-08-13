import React, { useState, useEffect } from "react";
import style from "./ClassMain.module.scss";
//ui
import Typo from "@ui/Typo";
import { useAuthStore } from "store/AuthStore";
import { res_types } from "@global_types";
import { nanoid } from "nanoid";

type State = res_types.tutorMainList;

const LectureItem = () => {
    return (
        <div className={style.lecture_item}>
            <div className={style.head_item}>
                <Typo />
                <div className={style.class_type_label}>
                    <Typo />
                </div>
            </div>
            <div className={style.bottom_item}>
                <Typo />
            </div>
        </div>
    );
};

const ClassMain = () => {
    const { auth, clientSideApi } = useAuthStore();
    const [mainData, setMainData] = useState<State | null>();
    const role = auth?.role;

    const getClassMainData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_MAIN");
        if (res.result === "SUCCESS") {
            setMainData(res.data);
        }
    };

    useEffect(() => {
        getClassMainData();
    }, []);

    return (
        <div>
            <div className={style.open_lecture}>
                <Typo type="HEADER" size="h3" content={"현재 진행강의"} />
                {mainData?.lecture_list.map((it, idx) => (
                    <div key={nanoid()}>
                        <LectureItem />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ClassMain;
