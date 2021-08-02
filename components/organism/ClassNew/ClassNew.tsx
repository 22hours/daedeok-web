import React, { useRef, useCallback, useEffect, useState } from "react";
import BreadCrumbs from "@ui/BreadCrumbs";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import TextInput from "@ui/input/TextInput";
import Select from "@ui/input/Select";
import CheckBox from "@ui/input/CheckBox";
//icons
import AddIcon from "@material-ui/icons/Add";
//style
import style from "./ClassNew.module.scss";
//store
import { useStoreState, useStoreDispatch } from "store/ClassNewStore";

//input 라벨
const ClassLabel = ({ text }) => {
    return (
        <div className={style.label}>
            <Typo type="TEXT" size="small" color="brown_font" content={text} />
        </div>
    );
};

//오프라인
const OfflineForm = React.memo(
    ({ idx, dispatch, item, delete_form }: { idx: number; dispatch: any; item: any; delete_form: any }) => {
        return (
            <div>
                <TextInput
                    type="text"
                    form="box"
                    value={item.week}
                    placeholder="주차"
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_WEEK", data: { idx: idx, week: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"제목"}
                    value={item.title}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TITLE", data: { idx: idx, title: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"강사명"}
                    value={item.tutor}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TUTOR", data: { idx: idx, tutor: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"장소"}
                    value={item.location}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_LOCATION", data: { idx: idx, location: value } })
                    }
                />
                <TextInput
                    type="date"
                    form="box"
                    placeholder={"날짜"}
                    value={item.date}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_DATE", data: { idx: idx, date: value } })
                    }
                />
                <TextInput
                    type="time"
                    form="box"
                    placeholder={"시간"}
                    value={item.date}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TIME", data: { idx: idx, time: value } })
                    }
                />
                <Button
                    type="TEXT"
                    size="small"
                    fontSize="smaller"
                    line="inline"
                    backgroundColor="white"
                    color="gray_accent"
                    content="삭제"
                    alignment="center"
                    onClick={delete_form}
                />
            </div>
        );
    }
);

//줌강의
const ZoomForm = React.memo(
    ({ idx, dispatch, item, delete_form }: { idx: number; dispatch: any; item: any; delete_form: any }) => {
        console.log(item);
        return (
            <div>
                <TextInput
                    type="text"
                    form="box"
                    value={item.week}
                    placeholder="주차"
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_WEEK", data: { idx: idx, week: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"제목"}
                    value={item.title}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TITLE", data: { idx: idx, title: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"강사명"}
                    value={item.tutor}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TUTOR", data: { idx: idx, tutor: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"장소"}
                    value={item.location}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_LOCATION", data: { idx: idx, location: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"영상링크"}
                    value={item.link}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_LINK", data: { idx: idx, link: value } })
                    }
                />
                <TextInput
                    type="date"
                    form="box"
                    placeholder={"날짜"}
                    value={item.date}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_DATE", data: { idx: idx, date: value } })
                    }
                />
                <TextInput
                    type="time"
                    form="box"
                    placeholder={"시간"}
                    value={item.date}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TIME", data: { idx: idx, time: value } })
                    }
                />
                <Button
                    type="TEXT"
                    size="small"
                    fontSize="smaller"
                    line="inline"
                    backgroundColor="white"
                    color="gray_accent"
                    content="삭제"
                    alignment="center"
                    onClick={delete_form}
                />
            </div>
        );
    }
);

//온라인강의
const OnlineForm = React.memo(
    ({ idx, dispatch, item, delete_form }: { idx: number; dispatch: any; item: any; delete_form: any }) => {
        return (
            <div>
                <TextInput
                    type="text"
                    form="box"
                    value={item.week}
                    placeholder="주차"
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_WEEK", data: { idx: idx, week: value } })
                    }
                />

                <TextInput
                    type="text"
                    form="box"
                    placeholder={"제목"}
                    value={item.title}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TITLE", data: { idx: idx, title: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"강사명"}
                    value={item.tutor}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TUTOR", data: { idx: idx, tutor: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"장소"}
                    value={item.location}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_LOCATION", data: { idx: idx, location: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"설명"}
                    value={item.intro}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_INTRO", data: { idx: idx, intro: value } })
                    }
                />
                <TextInput
                    type="text"
                    form="box"
                    placeholder={"영상링크"}
                    value={item.link}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_LINK", data: { idx: idx, link: value } })
                    }
                />
                <TextInput
                    type="date"
                    form="box"
                    placeholder={"날짜"}
                    value={item.date}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_DATE", data: { idx: idx, date: value } })
                    }
                />
                <TextInput
                    type="time"
                    form="box"
                    placeholder={"시간"}
                    value={item.date}
                    onChange={({ target: { value } }) =>
                        //@ts-ignore
                        dispatch({ type: "SET_PLAN_TIME", data: { idx: idx, time: value } })
                    }
                />
                <Button
                    type="TEXT"
                    size="small"
                    fontSize="smaller"
                    line="inline"
                    backgroundColor="white"
                    color="gray_accent"
                    content="삭제"
                    alignment="center"
                    onClick={delete_form}
                />
            </div>
        );
    }
);

//정원제한
const StudentLimitBox = React.memo(({ data, dispatch }: { data: any; dispatch: any }) => {
    return (
        <div className={style.input_form}>
            <ClassLabel text={"정원"} />
            <div className={style.limit_form}>
                <TextInput
                    type="number"
                    form="box"
                    value={data.student_limit <= 0 ? null : data.student_limit}
                    disable={data.student_limit === -1 ? true : false}
                    onChange={({ target: { value } }) => dispatch({ type: "SET_LIMIT", data: value })}
                />
                <div className={style.check_box}>
                    <CheckBox
                        labelContent="무제한"
                        value={data.student_limit === -1 ? true : false}
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
});

const ClassNew = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const introRef = useRef<HTMLInputElement | null>(null);
    const categoryRef = useRef<HTMLInputElement | null>(null);
    const referenceRef = useRef<HTMLInputElement | null>(null);

    //소속 Select Form
    const DivisionSelectForm = ({ idx }: { idx: number }) => {
        const [divisionList, setDivisionIList] = useState({
            first_division: "",
            second_division: "",
        });

        return (
            <div>
                <div className={style.input_form}>
                    <ClassLabel text={"상위 소속"} />
                    <Select
                        form="box"
                        onChange={({ target: { value } }) => {
                            setDivisionIList({ ...divisionList, first_division: value });
                            if (divisionList.second_division !== "") {
                                dispatch({
                                    type: "ADD_DIVISION_LIST",
                                    data: {
                                        first_division: divisionList.first_division,
                                        second_division: divisionList.second_division,
                                    },
                                });
                            }
                        }}
                        option_list={first_division_list}
                    />
                </div>
                <div className={style.input_form}>
                    <ClassLabel text={"하위 소속"} />
                    <Select
                        form="box"
                        onChange={({ target: { value } }) => {
                            setDivisionIList({ ...divisionList, second_division: value });
                            if (divisionList.first_division !== "") {
                                dispatch({
                                    type: "ADD_DIVISION_LIST",
                                    data: {
                                        first_division: divisionList.first_division,
                                        second_division: divisionList.second_division,
                                    },
                                });
                            }
                        }}
                        option_list={second_division_list}
                    />
                </div>
            </div>
        );
    };

    const breadCrumbsItem = [
        { name: "강의실 메인", link: "/class" },
        { name: "강의개설", link: "/class/new" },
    ];

    const data = useStoreState();

    const dispatch = useStoreDispatch();
    const add_offline = useCallback(() => dispatch({ type: "ADD_PLAN", data: "OFFLINE" }), []);
    const add_online = useCallback(() => dispatch({ type: "ADD_PLAN", data: "ONLINE" }), []);
    const add_zoom = useCallback(() => dispatch({ type: "ADD_PLAN", data: "ZOOM" }), []);
    const delete_form = useCallback((idx) => dispatch({ type: "REMOVE_PLAN", data: idx }), []);

    const onClick = () => {
        if (titleRef.current) {
            dispatch({ type: "SET_TITLE", data: titleRef.current.value });
        }
        if (introRef.current) {
            dispatch({ type: "SET_CONTENT", data: introRef.current.value });
        }
        if (categoryRef.current) {
            dispatch({ type: "SET_CATEGORY", data: categoryRef.current.value });
        }
        if (referenceRef.current) {
            dispatch({ type: "SET_REFERENCE", data: referenceRef.current.value });
        }
        console.log(data);
    };

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

    return (
        <div>
            <BreadCrumbs item_list={breadCrumbsItem} />
            <Typo type="HEADER" size="h2" color="brown_font" content="강의 개설" />
            <div>
                <div className={style.input_form}>
                    <ClassLabel text={"강의제목"} />
                    <TextInput //@ts-ignore
                        refs={titleRef}
                        type="text"
                        form="box"
                    />
                </div>
                <div className={style.input_form}>
                    <ClassLabel text={"강의소개"} />
                    <TextInput
                        //@ts-ignore
                        refs={introRef}
                        type="text"
                        form="box"
                    />
                </div>
                <div className={style.input_form}>
                    <ClassLabel text={"수업 카테고리"} />
                    <Select
                        form="box"
                        //@ts-ignore
                        refs={categoryRef}
                        option_list={option_list}
                    />
                </div>
                <DivisionSelectForm idx={data.division_list.length} />
                {data.division_list.map((it: any, idx: number) => {
                    return (
                        <div key={`DIVISION::${idx}`}>
                            {it.first_division ? it.first_division : "없음"}
                            {it.second_division ? it.second_division : "없음"}
                        </div>
                    );
                })}
                <StudentLimitBox data={data} dispatch={dispatch} />
                <div className={style.input_form}>
                    <ClassLabel text={"참고자료"} />
                    <TextInput
                        //@ts-ignore
                        refs={referenceRef}
                        type="text"
                        form="box"
                    />
                </div>
                <div className={style.input_form}>
                    <ClassLabel text={"수업자료"} />
                </div>
            </div>
            <div>
                <ClassLabel text={"강의 계획"} />
                {data.plan_list.map((it: any, idx: number) => {
                    return (
                        <div key={`LIST::${idx}`}>
                            {it.type === "ZOOM" ? (
                                <>
                                    <ZoomForm idx={idx} item={it} delete_form={delete_form} dispatch={dispatch} />
                                </>
                            ) : it.type === "ONLINE" ? (
                                <>
                                    <OnlineForm idx={idx} item={it} delete_form={delete_form} dispatch={dispatch} />
                                </>
                            ) : (
                                <>
                                    <OfflineForm idx={idx} item={it} delete_form={delete_form} dispatch={dispatch} />
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
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
            <Button
                type="SQUARE"
                size="small"
                fontSize="smaller"
                line="inline"
                backgroundColor="yellow_accent"
                color="white"
                content="개설"
                alignment="center"
                onClick={onClick}
            />
        </div>
    );
};
export default ClassNew;
