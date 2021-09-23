import React, { useState, useEffect } from "react";
import style from "./LecturePlanItem.module.scss";
import { meta_types } from "@global_types";
import Typo from "@ui/Typo";
import DateController from "lib/client/dateController";
import WindowController from "lib/client/windowController";

type LecturePlanList = {
    lecture_plan: {
        id: string;
        week: string;
        title: string;
        location: string;
        type: meta_types.classType;
        date: string;
        tutor: string;
    }[];
    type?: string;
};

const LecturePlanItem = (props: LecturePlanList) => {
    const [mode, setMode] = useState<"lecture_list_pc" | "lecture_list_tablet" | "lecture_list_mobile">(
        "lecture_list_pc"
    );
    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
        if (props.type === "class") {
            if (width > 1150) {
                setMode("lecture_list_pc");
            } else if (width <= 1150 && width > 850) {
                setMode("lecture_list_tablet");
            } else {
                setMode("lecture_list_mobile");
            }
        } else {
            if (width > 950) {
                setMode("lecture_list_pc");
            } else if (width <= 950 && width > 700) {
                setMode("lecture_list_tablet");
            } else {
                setMode("lecture_list_mobile");
            }
        }
    };

    useEffect(() => {
        setModeByWindowSize();
        window.addEventListener("resize", setModeByWindowSize);
        return () => {
            window.removeEventListener("resize", setModeByWindowSize);
        };
    }, []);

    return (
        <>
            {props?.lecture_plan?.map((it, idx) => (
                <div key={`lectureplanitem:${idx}`} className={`${style[mode]}`}>
                    <div className={style.title}>
                        <div className={style.week}>
                            <Typo
                                type={"TEXT"}
                                size={"small"}
                                color={"gray_accent"}
                                content={mode === "lecture_list_pc" ? `${it.week}주차` : `${it.week}주`}
                            />
                        </div>
                        <div>
                            <Typo type={"TEXT"} size={"normal"} color={"gray_accent"} content={it.title} />
                        </div>
                    </div>
                    <div className={style.detail_item}>
                        <div className={style.date}>
                            <Typo
                                type={"TEXT"}
                                size={"small"}
                                color={"gray_accent"}
                                content={`${DateController.getFormatedDate("YYYY/MM/DD HH:MM", it.date)}`}
                            />
                        </div>
                        <div className={style.tutor_location}>
                            <div>
                                <Typo type={"TEXT"} size={"small"} content={it.tutor} color={"gray_accent"} />
                            </div>
                            <div>
                                <Typo
                                    type={"TEXT"}
                                    size={"small"}
                                    content={
                                        it.location === "ZOOM"
                                            ? "ZOOM"
                                            : it.location === "ONLINE"
                                            ? "영상강의"
                                            : it.location
                                    }
                                    color={"gray_accent"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default LecturePlanItem;
