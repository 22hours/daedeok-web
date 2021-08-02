import React, { useRef, useCallback, useEffect, useState } from "react";

import { nanoid } from "nanoid";

//ui
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import TextInput from "@ui/input/TextInput";
import Select from "@ui/input/Select";
import CheckBox from "@ui/input/CheckBox";
import FileInput from "@ui/input/FileInput";

//icons
import AddIcon from "@material-ui/icons/Add";
//style
import style from "./ClassNew.module.scss";
//store
import { useClassNewDispatch, useClassNewStore } from "store/ClassNewStore";
import Icon from "@ui/Icon";
import { req_types } from "@global_types";
import TextArea from "@ui/input/TextArea";
import useFileInput from "lib/hooks/useFileInput";

//input 라벨
const ClassLabel = ({ text }) => {
    return (
        <div className={style.label}>
            <Typo type="TEXT" size="small" color="brown_font" content={text} />
        </div>
    );
};

type PlanItemType = {
    type: "ZOOM" | "ONLINE" | "OFFLINE";
    itemData: req_types.classPlanListItem;
    idx: number;
};

const PlanItemInput = (props: PlanItemType) => {
    const dispatch = useClassNewDispatch();
    const itemData = props.itemData;
    const CommonFirstInputList = [
        {
            id: 1,
            type: "text",
            value: itemData.week,
            placeholder: "주차",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_WEEK", data: { idx: props.idx, week: value } }),
        },
        {
            id: 2,
            type: "text",
            value: itemData.title,
            placeholder: "제목",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_TITLE", data: { idx: props.idx, title: value } }),
        },
        {
            id: 3,
            type: "text",
            value: itemData.tutor,
            placeholder: "강사명",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_TUTOR", data: { idx: props.idx, tutor: value } }),
        },
        {
            id: 4,
            type: "text",
            value: itemData.location,
            placeholder: "장소",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_LOCATION", data: { idx: props.idx, location: value } }),
        },
    ];
    const CommonLastInputList = [
        {
            id: 5,
            type: "date",
            value: itemData.date,
            placeholder: "날짜",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_DATE", data: { idx: props.idx, date: value } }),
        },
        {
            id: 6,
            type: "time",
            value: itemData.time,
            placeholder: "시간",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_TIME", data: { idx: props.idx, time: value } }),
        },
    ];
    const OnlineInputList = [
        {
            id: 7,
            type: "text",
            // @ts-ignore
            value: itemData.video_link,
            placeholder: "영상링크",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_VIDEO_LINK", data: { idx: props.idx, video_link: value } }),
        },
        {
            id: 8,
            type: "text",
            // @ts-ignore
            value: itemData.introduce,
            placeholder: "설명",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_INTRO", data: { idx: props.idx, introduce: value } }),
        },
    ];
    const ZoomInputList = [
        {
            id: 8,
            type: "text",
            // @ts-ignore
            value: itemData.zoom_link,
            placeholder: "ZOOM 링크",
            onChange: ({ target: { value } }) =>
                dispatch({ type: "SET_PLAN_ZOOM_LINK", data: { idx: props.idx, zoom_link: value } }),
        },
    ];

    var RenderList = CommonFirstInputList;
    if (props.type === "ONLINE") {
        RenderList = RenderList.concat(OnlineInputList);
    } else if (props.type === "ZOOM") {
        RenderList = RenderList.concat(ZoomInputList);
    }

    return (
        <div className={style.PlanItemInput}>
            {RenderList.map((it, idx) => {
                return (
                    <TextInput
                        key={`classItemInput::${idx}`}
                        // @ts-ignore
                        type={it.type}
                        form="box"
                        placeholder={it.placeholder}
                        value={it.value}
                        onChange={it.onChange}
                        className={style.plan_list_input}
                    />
                );
            })}
            <div className={style.plan_item_date_input}>
                {CommonLastInputList.map((it, idx) => {
                    return (
                        <TextInput
                            key={`classItemInput::${idx}`}
                            // @ts-ignore
                            type={it.type}
                            form="box"
                            placeholder={it.placeholder}
                            // @ts-ignore
                            value={it.value}
                            onChange={it.onChange}
                            className={style.plan_list_input}
                        />
                    );
                })}
                <div
                    onClick={() => dispatch({ type: "REMOVE_PLAN", data: props.idx })}
                    className={style.plan_item_delete_btn}
                >
                    삭제
                </div>
            </div>
        </div>
    );
};

// PLAN LIST
const PlanListInput = () => {
    const { plan_list } = useClassNewStore();
    const dispatch = useClassNewDispatch();
    const add_offline = () => dispatch({ type: "ADD_PLAN", data: "OFFLINE" });
    const add_online = () => dispatch({ type: "ADD_PLAN", data: "ONLINE" });
    const add_zoom = () => dispatch({ type: "ADD_PLAN", data: "ZOOM" });
    return (
        <div className={style.PlanListInput}>
            <div className={style.input_form}>
                <ClassLabel text={"강의 계획"} />
            </div>
            {plan_list.map((it: any, idx: number) => {
                return (
                    <div key={`LIST::${idx}`} className={style.PlanItem}>
                        <PlanItemInput type={it.type} itemData={it} idx={idx} />
                    </div>
                );
            })}

            <div>
                <div className={style.button_group}>
                    <div className={style.class_type_button} onClick={() => add_offline()}>
                        오프라인 <AddIcon style={{ fontSize: "18px" }} />
                    </div>
                    <div className={style.class_type_button} onClick={() => add_zoom()}>
                        ZOOM <AddIcon style={{ fontSize: "18px" }} />
                    </div>
                    <div className={style.class_type_button} onClick={() => add_online()}>
                        영상 <AddIcon style={{ fontSize: "18px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// HANDOUT FILE INPUT
const HandoutFileInput = () => {
    const { handout_list } = useClassNewStore();
    const dispatch = useClassNewDispatch();
    const handout = useFileInput();

    useEffect(() => {
        if (handout.value) {
            const fileName: string = handout.value.name;
            dispatch({ type: "ADD_HANDOUT_FILE", data: { name: fileName, url: "1" } });
        }
    }, [handout.value]);

    const HandoutItem = (props: req_types.classHandoutItem & { idx: number }) => {
        return (
            <div className={style.HandoutItem}>
                <div className={style.item_text}>
                    <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.name} />
                </div>
                <div onClick={() => dispatch({ type: "REMOVE_HANDOUT_FILE", data: props.idx })}>
                    <Icon type={"delete"} />
                </div>
            </div>
        );
    };

    return (
        <div className={style.HandoutFileInput}>
            <div className={style.input_form}>
                <ClassLabel text={"수업자료"} />
                <div className={style.file_input_outter}>
                    <FileInput
                        {...handout}
                        //@ts-ignore
                        accept={"image/*,.hwp,.word,.docx,.pptx,.show"}
                        className={style.file_input_button}
                    >
                        <Button
                            type={"SQUARE"}
                            size={"smaller"}
                            fontSize={"smaller"}
                            line={"inline"}
                            backgroundColor={"brown_base"}
                            color={"white"}
                            alignment={"center"}
                            content={"찾아보기"}
                        />
                    </FileInput>
                </div>
                <div className={style.handout_item_list}>
                    {handout_list.map((it, idx) => (
                        <HandoutItem key={`handoutitem::${nanoid()}`} {...it} idx={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// STUDENT LIMIT
const StudentLimitInput = () => {
    const { student_limit } = useClassNewStore();
    const dispatch = useClassNewDispatch();

    const isInfinite = student_limit === -1;
    return (
        <div className={style.input_form}>
            <ClassLabel text={"정원"} />
            <div className={style.limit_form}>
                {isInfinite ? (
                    <>
                        <TextInput
                            className={style.limit_input}
                            type="text"
                            form="box"
                            value={"무제한"}
                            disable={true}
                        />
                    </>
                ) : (
                    <>
                        <TextInput
                            className={style.limit_input}
                            type="number"
                            form="box"
                            value={student_limit}
                            onChange={({ target: { value } }) => dispatch({ type: "SET_LIMIT", data: value })}
                        />
                    </>
                )}

                <div className={style.check_box}>
                    <CheckBox
                        labelContent="무제한"
                        value={student_limit === -1 ? true : false}
                        onChange={(e) => {
                            if (e.target.checked) {
                                dispatch({ type: "SET_LIMIT", data: -1 });
                            } else {
                                dispatch({ type: "SET_LIMIT", data: 0 });
                            }
                        }}
                        isLabelRight={true}
                    />
                </div>
            </div>
        </div>
    );
};

// DIVISION
const DivisionInput = () => {
    type divisionState = {
        first_division: string;
        second_division: string;
    };
    const { division_list } = useClassNewStore();
    const disaptch = useClassNewDispatch();

    const first_division_list = [
        {
            value: "고등부",
            name: "고등부",
        },
        {
            value: "초등부",
            name: "초등부",
        },
    ];
    const second_division_list = [
        {
            value: "1학년",
            name: "1학년",
        },
        {
            value: "2학년",
            name: "2학년",
        },

        {
            value: "3학년",
            name: "3학년",
        },
    ];
    const [divisionItem, setDivisionItem] = useState<divisionState>({
        first_division: "",
        second_division: "",
    });

    useEffect(() => {
        if (divisionItem.second_division !== "") {
            disaptch({ type: "ADD_DIVISION_LIST", data: divisionItem });
        }
    }, [divisionItem.second_division]);

    const DivisionItem = (props: divisionState & { idx: number }) => {
        return (
            <div className={style.division_item}>
                <div className={style.item_text}>
                    <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.first_division} />
                    <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.second_division} />
                </div>
                <div onClick={() => disaptch({ type: "REMOVE_DIVISION_LIST", data: props.idx })}>
                    <Icon type={"delete"} />
                </div>
            </div>
        );
    };

    return (
        <div className={style.DivisionInput}>
            <div className={style.input_form}>
                <ClassLabel text={"상위 소속"} />
                <Select
                    form="box"
                    placeholder={"상위 소속 선택"}
                    onChange={({ target: { value } }) => {
                        setDivisionItem({ first_division: value, second_division: "" });
                    }}
                    option_list={first_division_list}
                    className={style.input}
                />
            </div>
            <div className={style.input_form}>
                <ClassLabel text={"하위 소속"} />
                <Select
                    form="box"
                    placeholder={"하위 소속 선택"}
                    value={divisionItem.second_division}
                    onChange={({ target: { value } }) => {
                        setDivisionItem({ ...divisionItem, second_division: value });
                    }}
                    option_list={divisionItem.first_division ? second_division_list : []}
                    className={style.input}
                />
            </div>
            <div className={style.division_item_list}>
                {division_list.map((it: any, idx: number) => {
                    return <DivisionItem key={`DIVISION::${nanoid()}`} {...it} idx={idx} />;
                })}
            </div>
        </div>
    );
};

const ClassNew = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const introRef = useRef<HTMLTextAreaElement | null>(null);
    const categoryRef = useRef<HTMLInputElement | null>(null);
    const referenceRef = useRef<HTMLInputElement | null>(null);

    const option_list = [
        {
            value: "교육부",
            name: "교육부",
        },
        {
            value: "유아부",
            name: "유아부",
        },
    ];

    return (
        <div className={style.container}>
            <div>
                <div className={style.input_form}>
                    <ClassLabel text={"강의제목"} />
                    <TextInput //@ts-ignore
                        refs={titleRef}
                        type="text"
                        form="box"
                        placeholder={"강의 제목"}
                        className={style.input}
                    />
                </div>
                <div className={style.input_form}>
                    <ClassLabel text={"강의소개"} />
                    <TextArea
                        //@ts-ignore
                        refs={introRef}
                        className={style.input}
                        placeholder={"강의 소개"}
                    />
                </div>
                <div className={style.input_form}>
                    <ClassLabel text={"수업 카테고리"} />
                    <Select
                        form="box"
                        //@ts-ignore
                        refs={categoryRef}
                        option_list={option_list}
                        className={style.input}
                        placeholder={"수업 카테고리 선택"}
                    />
                </div>
                <DivisionInput />

                <StudentLimitInput />
                <div className={style.input_form}>
                    <ClassLabel text={"참고자료"} />
                    <TextInput
                        //@ts-ignore
                        refs={referenceRef}
                        type="text"
                        form="box"
                        className={style.input}
                    />
                </div>
                <HandoutFileInput />
            </div>
            <PlanListInput />

            <div className={style.submit_row}>
                <Button
                    type="SQUARE"
                    size="small"
                    fontSize="smaller"
                    line="inline"
                    backgroundColor="yellow_accent"
                    color="white"
                    content="개설"
                    alignment="center"
                />
            </div>
        </div>
    );
};
export default ClassNew;
