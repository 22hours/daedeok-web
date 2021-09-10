/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import style from "./ClassEditor.module.scss";
import { class_types } from "@global_types";
import ClassTextInput from "./items/ClassTextInput";
import ClassTextareaInput from "./items/ClassTextareaInput";
import CategoryInput from "./CategoryInput";
import DivisionInput from "./DivisionListInput";
import StudentLimitInput from "./StudentLimitInput";
import HandoutInput from "./HandoutInput";
import PlanListInput from "./PlanListInput";
import Button from "@ui/buttons/Button";
import { useAuthStore } from "store/AuthStore";
import ListController from "lib/client/listController";
import { useRouter } from "next/router";
import { useClassDetailStore } from "store/ClassDetailStore";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

import ClassCategorySelect from "components/molecule/ClassCategorySelect/ClassCategorySelect";
import useClassCategory from "lib/hooks/useClassCategory";
import RegexController from "lib/client/regexController";
import DaySelectInput from "./items/DaySelectInput";
import TimeInput from "./items/TimeInput";

type Props = {
    data?: class_types.ClassInfo;
    type: "NEW" | "EDIT";
    createClass?: Function;
    editClass?: Function;
};

type State = class_types.ClassInfo;
type Action =
    | { type: "SET_INIT_STATE"; data: State }
    | { type: "SET_TITLE"; data: State["title"] }
    | { type: "SET_CONTENT"; data: State["content"] }
    | { type: "SET_REFERENCE"; data: State["reference"] }
    | { type: "SET_CATEGORY"; data: State["category"] }
    | { type: "ADD_DIVISION"; data: class_types.Division }
    | { type: "ADD_DIVISION_LIST"; data: class_types.Division[] }
    | { type: "REMOVE_DIVISION"; data: number }
    | { type: "SET_STUDENT_LIMIT"; data: State["student_limit"] }
    | { type: "ADD_HANDOUT"; data: class_types.Handout }
    | { type: "REMOVE_HANDOUT"; data: number }
    | { type: "ADD_PLAN"; data: class_types.PlanType }
    | { type: "SET_PLAN"; data: class_types.PlanItem; idx: number }
    | { type: "SET_PLAN_WEEK"; data: { idx: number; week: string } }
    | { type: "SET_PLAN_TITLE"; data: { idx: number; title: string } }
    | { type: "SET_PLAN_TUTOR"; data: { idx: number; tutor: string } }
    | { type: "SET_PLAN_LOCATION"; data: { idx: number; location: string } }
    | { type: "SET_PLAN_DATE"; data: { idx: number; date: string } }
    | { type: "SET_PLAN_TIME"; data: { idx: number; time: string } }
    | { type: "SET_PLAN_VIDEO_LINK"; data: { idx: number; video_link: string } }
    | { type: "SET_PLAN_INTRODUCE"; data: { idx: number; introduce: string } }
    | { type: "SET_PLAN_ZOOM_LINK"; data: { idx: number; zoom_link: string } }
    | { type: "REMOVE_PLAN"; data: number }
    | { type: "SET_DAY"; data: State["day"] }
    | { type: "SET_TIME"; data: string };

const initState: State = {
    title: "",
    content: "",
    category: "",
    division_list: [],
    student_limit: 0,
    reference: "",
    handout_list: [],
    plan_list: [],
    day: "",
    time: "",
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_INIT_STATE": {
            return {
                ...action.data,
            };
        }
        case "SET_TITLE": {
            return {
                ...state,
                title: action.data,
            };
        }
        case "SET_CONTENT": {
            return {
                ...state,
                content: action.data,
            };
        }
        case "SET_REFERENCE": {
            return {
                ...state,
                reference: action.data,
            };
        }
        case "SET_CATEGORY": {
            return {
                ...state,
                category: action.data,
            };
        }
        case "ADD_DIVISION": {
            const { first_division, second_division } = action.data;
            const matchIdx = state.division_list.findIndex(
                (it) => it.first_division === first_division && it.second_division === second_division
            );
            if (matchIdx === -1) {
                const newDivisonList = state.division_list.slice();
                newDivisonList.push(action.data);

                return {
                    ...state,
                    division_list: newDivisonList,
                };
            } else {
                return state;
            }
        }
        case "ADD_DIVISION_LIST": {
            var newDivisonList = state.division_list.slice();
            newDivisonList = newDivisonList.concat(action.data);
            return {
                ...state,
                division_list: newDivisonList,
            };
        }
        case "REMOVE_DIVISION": {
            const newDivisonList = state.division_list.slice();
            newDivisonList.splice(action.data, 1);
            return {
                ...state,
                division_list: newDivisonList,
            };
        }
        case "SET_STUDENT_LIMIT": {
            return {
                ...state,
                student_limit: action.data,
            };
        }
        case "SET_DAY": {
            return {
                ...state,
                day: action.data,
            };
        }
        case "SET_TIME": {
            return {
                ...state,
                time: action.data,
            };
        }
        case "ADD_HANDOUT": {
            const newHandoutList = state.handout_list.slice();
            newHandoutList.push(action.data);

            return {
                ...state,
                handout_list: newHandoutList,
            };
        }
        case "REMOVE_HANDOUT": {
            const newHandoutList = state.handout_list.slice();
            newHandoutList.splice(action.data, 1);
            return {
                ...state,
                handout_list: newHandoutList,
            };
        }
        case "ADD_PLAN": {
            const newPlanList = state.plan_list.slice();
            var newPlanObj = {
                type: action.data,
                week: "",
                title: "",
                tutor: "",
                location: "",
                date: "",
                time: "",
            };
            if (action.data === "ONLINE") {
                newPlanObj = {
                    ...newPlanObj,
                    // @ts-ignore
                    video_link: "",
                    introduce: "",
                };
            } else if (action.data === "ZOOM") {
                newPlanObj = {
                    ...newPlanObj,
                    // @ts-ignore
                    zoom_link: "",
                };
            }
            newPlanList.push(newPlanObj);
            return {
                ...state,
                plan_list: newPlanList,
            };
        }
        case "SET_PLAN": {
            const newPlanList = state.plan_list.slice();
            newPlanList[action.idx] = {
                ...action.data,
            };
            return {
                ...state,
                plan_list: newPlanList,
            };
        }
        case "SET_PLAN_WEEK": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, week } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                week: week,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        case "SET_PLAN_TITLE": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, title } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                title: title,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }

        case "SET_PLAN_TUTOR": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, tutor } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                tutor: tutor,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }

        case "SET_PLAN_LOCATION": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, location } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                location: location,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }

        case "SET_PLAN_INTRODUCE": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, introduce } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                introduce: introduce,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        case "SET_PLAN_VIDEO_LINK": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, video_link } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                video_link: video_link,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        case "SET_PLAN_ZOOM_LINK": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, zoom_link } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                zoom_link: zoom_link,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        case "SET_PLAN_DATE": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, date } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                date: date,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }

        case "SET_PLAN_TIME": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, time } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                time: time,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }

        case "REMOVE_PLAN": {
            const newPlanList = state.plan_list.slice();
            newPlanList.splice(action.data, 1);
            return {
                ...state,
                plan_list: newPlanList,
            };
        }
        default:
            throw new Error("REDUCER ERROR IN CLASS EDITOR");
    }
};

const ClassEditor = (props: Props) => {
    const { clientSideApi } = useAuthStore();
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();
    const [originHandoutList, setOriginHandoutList] = useState<class_types.Handout[]>([]);
    const [originPlanList, setOriginPlanList] = useState<class_types.PlanItem[]>([]);
    const [state, dispatch] = useReducer(reducer, initState);

    const childCompRef = React.useRef(null);
    const router = useRouter();
    const { status, class_id } = router.query;

    const option_list = useClassCategory();
    const date_list = [
        {
            value: "월요일",
            name: "월요일",
        },
        {
            value: "화요일",
            name: "화요일",
        },
        {
            value: "수요일",
            name: "수요일",
        },
        {
            value: "목요일",
            name: "목요일",
        },
        {
            value: "금요일",
            name: "금요일",
        },
        {
            value: "토요일",
            name: "토요일",
        },
        {
            value: "일요일",
            name: "일요일",
        },
    ];

    const firstRef = useRef(true);
    useEffect(() => {
        if (props.type === "EDIT" && props.data) {
            if (firstRef.current) {
                dispatch({ type: "SET_INIT_STATE", data: props.data });
                setOriginHandoutList(props.data.handout_list.slice());
                // @ts-ignore
                setOriginPlanList(props.data.plan_list.map((it) => it.id));
                firstRef.current = false;
            }
        }
    }, [props]);

    const titleChange = useCallback((e) => dispatch({ type: "SET_TITLE", data: e.target.value }), [state.title]);
    const contentChange = useCallback((e) => dispatch({ type: "SET_CONTENT", data: e.target.value }), [state.content]);
    const referenceChange = useCallback(
        (e) => dispatch({ type: "SET_REFERENCE", data: e.target.value }),
        [state.reference]
    );
    const categoryChange = useCallback(
        (e) => dispatch({ type: "SET_CATEGORY", data: e.target.value }),
        [state.category]
    );
    const dayChange = useCallback((e) => dispatch({ type: "SET_DAY", data: e.target.value }), [state.day]);

    const timeChange = useCallback((e) => dispatch({ type: "SET_TIME", data: e.target.value }), [state.time]);

    const addDivisionItem = useCallback(
        (division: class_types.Division) => dispatch({ type: "ADD_DIVISION", data: division }),
        [state.division_list]
    );
    const addDivisonList = useCallback(
        (division_list: class_types.Division[]) => {
            dispatch({ type: "ADD_DIVISION_LIST", data: division_list });
        },
        [state.division_list]
    );
    const removeDivisionItem = useCallback(
        (idx: number) => dispatch({ type: "REMOVE_DIVISION", data: idx }),
        [state.division_list]
    );
    const studentLimitChange = useCallback(
        (value: number) => dispatch({ type: "SET_STUDENT_LIMIT", data: value }),
        [state.student_limit]
    );
    const addHandoutItem = useCallback(
        (item: class_types.Handout) => dispatch({ type: "ADD_HANDOUT", data: item }),
        [state.handout_list]
    );
    const removeHandoutItem = useCallback(
        (idx: number) => dispatch({ type: "REMOVE_HANDOUT", data: idx }),
        [state.handout_list]
    );

    const addPlanItem = useCallback(
        (planType: class_types.PlanType) => dispatch({ type: "ADD_PLAN", data: planType }),
        [state.plan_list]
    );
    const setPlanItem = useCallback(
        (
            planType:
                | "week"
                | "title"
                | "tutor"
                | "location"
                | "date"
                | "time"
                | "video_link"
                | "introduce"
                | "zoom_link",
            data: class_types.PlanItem,
            idx: number
        ) =>
            dispatch({
                // @ts-ignore
                type: `SET_PLAN_${planType.toUpperCase()}`,
                // @ts-ignore
                data: {
                    idx: idx,
                    [planType]: data,
                },
            }),
        [state.plan_list]
    );

    const removePlanItem = useCallback(
        (idx: number) => dispatch({ type: "REMOVE_PLAN", data: idx }),
        [state.plan_list]
    );

    //강의종료
    const handleFinish = async () => {
        confirmOn({
            message: "정말 종료하겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi("POST", "MAIN", "LECTURE_FINISH", {
                    lecture_id: class_id,
                });
                if (res.result === "SUCCESS") {
                    confirmOn({
                        message: "강의가 종료되었습니다\n확인을 클릭하면 강의실 메인으로 이동합니다",
                        onSuccess: () => location.replace("/class"),
                        isFailButtonRemove: true,
                    });
                } else {
                    alertOn({
                        title: "에러가 발생하였습니다",
                        //@ts-ignore
                        message: "다시 시도해주세요",
                        type: "ERROR",
                    });
                }
            },
        });
    };

    //강의삭제
    const handleDelete = async () => {
        confirmOn({
            message: "정말 삭제하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi(
                    "DELETE",
                    "MAIN",
                    "LECTURE_DELETE",
                    { lecture_id: class_id },
                    undefined
                );
                if (res.result === "SUCCESS") {
                    confirmOn({
                        message: "강의가 삭제되었습니다\n확인을 클릭하면 강의실 메인으로 이동합니다",
                        onSuccess: () => location.replace("/class"),
                        isFailButtonRemove: true,
                    });
                } else {
                    alertOn({
                        title: "에러가 발생하였습니다",
                        //@ts-ignore
                        message: "다시 시도해주세요",
                        type: "ERROR",
                    });
                }
            },
        });
    };

    const checkValidation = () => {
        // TITLE VALIDATION
        if (!RegexController.isValid(["NO_SPACE", "NO_SPECIAL"], state.title, 3, 50)) {
            alertOn({
                title: "",
                message: "강의 제목은 특수문자, 공백을 포함할 수 없으며 3자이상, 50자 미만으로 이루어져야 합니다",
                type: "WARN",
            });
            return false;
        }

        // INTRODUCE VALIDATION
        if (!RegexController.isValid(["NO_SPECIAL"], state.content, 5, 100)) {
            alertOn({
                title: "",
                message: "강의 소개는 특수문자, 공백을 포함할 수 없으며 5자 이상, 100자 미만으로 이루어져야 합니다",
                type: "WARN",
            });
            return false;
        }

        // STUDENT LIMIT VALIDATION
        if (!state.student_limit) {
            alertOn({
                title: "",
                message: "정원은 숫자 또는 무제한으로 입력하여야 합니다",
                type: "WARN",
            });
            return false;
        }

        // PLAN LIST VALIDATION
        if (state.plan_list.length < 1) {
            alertOn({
                title: "",
                message: "강의 계획은 최소 1개 이상이여야 합니다",
                type: "WARN",
            });
            return false;
        }

        // PLAN ITEM VALIDATION
        var flag = true;
        state.plan_list.forEach((plan_item) => {
            // WEEK
            if (!plan_item.week) {
                flag = false;
                alertOn({
                    title: "",
                    message: "강의계획의 주차는 숫자로만 입력 가능합니다",
                    type: "WARN",
                });
                return false;
            }

            // TITLE
            if (!RegexController.isValid(["NO_SPACE", "NO_SPECIAL"], plan_item.title, 1, 50)) {
                flag = false;
                alertOn({
                    title: "",
                    message: "강의계획의 제목은 특수문자를 포함할 수 없으며, 최소 1자이상, 50자 이하로 작성해야합니다",
                    type: "WARN",
                });
                return false;
            }

            // TUTOR
            if (!RegexController.isValid(["NO_SPACE", "NO_SPECIAL"], plan_item.tutor, 1, 50)) {
                flag = false;
                alertOn({
                    title: "",
                    message:
                        "강의계획의 강사명은 특수문자를 포함할 수 없으며, 최소 1자이상, 50자 이하로 작성해야합니다",
                    type: "WARN",
                });
                return false;
            }

            // DATE
            if (!RegexController.checkDate(plan_item.date)) {
                flag = false;
                alertOn({
                    title: "",
                    message: "날짜는 YYYY-MM-DD 형식에 맞게 입력해야합니다",
                    type: "WARN",
                });
                return false;
            }

            // TIME
            if (!RegexController.checkTime(plan_item.time)) {
                flag = false;
                alertOn({
                    title: "",
                    message: "시간은 HH:MM 형식에 맞게 입력해야합니다",
                    type: "WARN",
                });
                return false;
            }
        });
        if (!flag) {
            return false;
        }

        return true;
    };

    const handleSumbit = async () => {
        const makeDivisionList = () => {
            var reqDivisionList: { first_division: string; second_division: string[] }[] = [];
            state.division_list.forEach((item) => {
                const firstDivisionIdx = reqDivisionList.findIndex((it) => it.first_division === item.first_division);
                if (firstDivisionIdx === -1) {
                    // NO REMAIN
                    const second_division_list: any[] = [];
                    second_division_list.push(item.second_division);
                    reqDivisionList.push({
                        first_division: item.first_division,
                        second_division: second_division_list,
                    });
                } else {
                    // REMIAN
                    const newSecondDivisionList = reqDivisionList[firstDivisionIdx].second_division.slice();
                    newSecondDivisionList.push(item.second_division);

                    reqDivisionList[firstDivisionIdx] = {
                        first_division: reqDivisionList[firstDivisionIdx].first_division,
                        second_division: newSecondDivisionList,
                    };
                }
            });
            return reqDivisionList;
        };

        // if (!checkValidation()) {
        //     return;
        // }

        if (state.student_limit < 0 && state.student_limit !== -1) {
            alertOn({
                message: "정원은 음수가 될 수 없습니다",
                type: "WARN",
            });
            return;
        }

        if (props.type === "NEW") {
            // NEW

            if (state.student_limit !== 0) {
                const res = await clientSideApi("POST", "MAIN", "LECTURE_NEW", undefined, {
                    title: state.title,
                    content: state.content,
                    category: state.category,
                    division_list: makeDivisionList(),
                    student_limit: state.student_limit,
                    reference: state.reference,
                    handout_list: state.handout_list,
                    plan_list: state.plan_list,
                    //추가해야함
                    day: state.day,
                    time: state.time,
                });
                if (res.result === "SUCCESS") {
                    confirmOn({
                        message: "강의 개설에 성공하였습니다\n확인을 클릭하면 해당 강의로 이동합니다",
                        onSuccess: () => location.replace(`/class/open/${res.data}/board`),
                        isFailButtonRemove: true,
                    });
                } else {
                    apiErrorAlert(res.msg);
                }
            } else {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "정원은 0명이 될 수 없습니다.",
                    type: "WARN",
                });
            }
        } else {
            // EDIT
            const current_plan_id_list: string[] = [];
            state.plan_list.forEach((plan_item) => {
                if (plan_item.id) {
                    current_plan_id_list.push(plan_item.id);
                }
            });
            const deletePlanList = ListController.getDeletedItemInList(originPlanList, current_plan_id_list, true);
            const diffItemList = ListController.getUpdateInList(originHandoutList, state.handout_list);
            if (state.student_limit !== 0) {
                const res = await clientSideApi(
                    "PUT",
                    "MAIN",
                    "LECTURE_UPDATE",
                    { lecture_id: class_id },
                    {
                        title: state.title,
                        content: state.content,
                        category: state.category,
                        division_list: makeDivisionList(),
                        student_limit: state.student_limit,
                        reference: state.reference,
                        handout_list: {
                            new_file_list: diffItemList.new_item_list,
                            delete_file_list: diffItemList.deleted_item_list,
                        },
                        delete_plan_list: deletePlanList,
                        plan_list: state.plan_list,
                        //추가해야함
                        day: state.day,
                        time: state.time,
                    }
                );
                if (res.result === "SUCCESS") {
                    confirmOn({
                        message: "강의가 성공적으로 수정되었습니다\n확인을 클릭하면 해당 강의로 이동합니다",
                        onSuccess: () => location.replace(`/class/${status}/${class_id}/board`),
                        isFailButtonRemove: true,
                    });
                } else {
                    alertOn({
                        title: "에러가 발생하였습니다",
                        //@ts-ignore
                        message: res.msg,
                        type: "ERROR",
                    });
                }
            } else {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "정원은 0명이 될 수 없습니다.",
                    type: "WARN",
                });
            }
        }
    };

    return (
        <div>
            <ClassTextInput
                labelName={"강의제목"}
                type={"text"}
                placeholder={"제목 입력"}
                value={state.title}
                onChange={titleChange}
            />
            <ClassTextareaInput
                labelName={"강의 소개"}
                placeholder={""}
                value={state.content}
                onChange={contentChange}
            />
            <CategoryInput
                labelName={"수업 카테고리"}
                placeholder={"카테고리 입력"}
                value={state.category}
                onChange={categoryChange}
                //@ts-ignore
                option_list={option_list.categoryOptionList || []}
            />
            <DaySelectInput
                labelName={"요일"}
                placeholder={"강의 요일을 선택하세요"}
                value={state.day}
                onChange={dayChange}
                //@ts-ignore
                option_list={date_list || []}
            />
            <TimeInput labelName="시간" onChange={timeChange} value={state.time} />
            <DivisionInput
                divisionList={state.division_list}
                addDivisionItem={addDivisionItem}
                addDivisonList={addDivisonList}
                removeDivisionItem={removeDivisionItem}
            />
            <ClassTextInput
                labelName={"참고자료"}
                type={"text"}
                placeholder={"참고자료 입력"}
                value={state.reference}
                onChange={referenceChange}
            />
            <StudentLimitInput value={state.student_limit} onChange={studentLimitChange} />
            <HandoutInput
                value={state.handout_list}
                addHandoutItem={addHandoutItem}
                removeHandoutItem={removeHandoutItem}
            />
            <PlanListInput
                //@ts-ignore
                forwardRef={childCompRef}
                value={state.plan_list}
                addPlanItem={addPlanItem}
                setPlanItem={setPlanItem}
                removePlanItem={removePlanItem}
            />

            <div className={style.submit_row}>
                {status !== "close" ? (
                    props.type === "NEW" ? (
                        <Button
                            className={style.submit_btn}
                            type="SQUARE"
                            size="small"
                            fontSize="smaller"
                            line="inline"
                            backgroundColor="yellow_accent"
                            color="white"
                            content={"개설"}
                            alignment="center"
                            onClick={handleSumbit}
                        />
                    ) : (
                        <>
                            <Button
                                className={style.submit_btn}
                                type="SQUARE"
                                size="small"
                                fontSize="smaller"
                                line="inline"
                                backgroundColor="brown_base"
                                color="white"
                                content={"강의삭제"}
                                alignment="center"
                                onClick={handleDelete}
                            />
                            <Button
                                className={style.submit_btn}
                                type="SQUARE"
                                size="small"
                                fontSize="smaller"
                                line="inline"
                                backgroundColor="red_accent"
                                color="white"
                                content={"강의종료"}
                                alignment="center"
                                onClick={handleFinish}
                            />
                            <Button
                                className={style.submit_btn}
                                type="SQUARE"
                                size="small"
                                fontSize="smaller"
                                line="inline"
                                backgroundColor="yellow_accent"
                                color="white"
                                content={"수정"}
                                alignment="center"
                                onClick={handleSumbit}
                            />
                        </>
                    )
                ) : (
                    <>
                        <Button
                            className={style.submit_btn}
                            type="SQUARE"
                            size="small"
                            fontSize="smaller"
                            line="inline"
                            backgroundColor="brown_base"
                            color="white"
                            content={"강의삭제"}
                            alignment="center"
                            onClick={handleDelete}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ClassEditor;
