import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { meta_types, req_types, res_types } from "@global_types";
import { useAuthStore } from "./AuthStore";

// STATE TYPES
type State = req_types.classNewItem;

// ELEMENT TYPES
const initState: State = {
    title: "",
    content: "",
    category: "",
    division_list: [],
    student_limit: 0,
    reference: "",
    handout_list: [],
    plan_list: [],
};

// ACTION TYPES
type Action =
    | { type: "SET_TITLE"; data: State["title"] }
    | { type: "SET_CONTENT"; data: State["content"] }
    | { type: "SET_CATEGORY"; data: State["category"] }
    // | { type: "SET_FIRST_DIVISION"; data: { idx: number; first_division: string } }
    // | { type: "SET_SECOND_DIVISION"; data: { idx: number; second_division: string } }
    | { type: "ADD_DIVISION_LIST"; data: { first_division: string; second_division: string } }
    | { type: "REMOVE_DIVISION_LIST"; data: number }
    | { type: "SET_LIMIT"; data: State["student_limit"] }
    | { type: "SET_REFERENCE"; data: State["reference"] }
    | { type: "SET_PLAN_WEEK"; data: State["plan_list"] }
    | { type: "ADD_HANDOUT_FILE"; data: req_types.classHandoutItem }
    | { type: "REMOVE_HANDOUT_FILE"; data: number }
    | { type: "SET_FILE"; data: State["handout_list"] }
    | { type: "SET_STATE"; data: State }
    | { type: "ADD_PLAN"; data: meta_types.classType }
    | { type: "REMOVE_PLAN"; data: number }
    | { type: "SET_PLAN_WEEK"; data: { idx: number; week: number } }
    | { type: "SET_PLAN_TITLE"; data: { idx: number; title: string } }
    | { type: "SET_PLAN_TUTOR"; data: { idx: number; tutor: string } }
    | { type: "SET_PLAN_LOCATION"; data: { idx: number; location: string } }
    | { type: "SET_PLAN_INTRO"; data: { idx: number; introduce: string } }
    | { type: "SET_PLAN_VIDEO_LINK"; data: { idx: number; video_link: string } }
    | { type: "SET_PLAN_ZOOM_LINK"; data: { idx: number; zoom_link: string } }
    | { type: "SET_PLAN_DATE"; data: { idx: number; date: string } }
    | { type: "SET_PLAN_TIME"; data: { idx: number; time: string } };

// STORE TYPE
type Store = {
    saveClass: Function;
} & State;

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const ClassNewStoreContext = React.createContext<Store | null>(null);
const ClassNewStoreDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
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
        case "SET_CATEGORY": {
            return {
                ...state,
                category: action.data,
            };
        }
        // DIVISION
        case "ADD_DIVISION_LIST": {
            var { first_division, second_division } = action.data;
            if (
                state.division_list.findIndex(
                    (it) => it.first_division === first_division && it.second_division === second_division
                ) === -1
            ) {
                var new_division_list = state.division_list.slice();
                new_division_list.push({
                    first_division: first_division,
                    second_division: second_division,
                });
                return {
                    ...state,
                    division_list: new_division_list,
                };
            } else {
                return state;
            }
        }

        case "REMOVE_DIVISION_LIST": {
            var new_division_list = state.division_list.slice();
            new_division_list.splice(action.data, 1);
            return {
                ...state,
                division_list: new_division_list,
            };
        }

        case "SET_LIMIT": {
            return {
                ...state,
                student_limit: action.data,
            };
        }
        case "SET_REFERENCE": {
            return {
                ...state,
                reference: action.data,
            };
        }
        case "ADD_HANDOUT_FILE": {
            var new_handout_list = state.handout_list.slice();
            new_handout_list.push(action.data);
            return {
                ...state,
                handout_list: new_handout_list,
            };
        }
        case "REMOVE_HANDOUT_FILE": {
            var new_handout_list = state.handout_list.slice();
            const targetIdx: number = action.data;
            new_handout_list.splice(targetIdx, 1);
            return {
                ...state,
                handout_list: new_handout_list,
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

        case "SET_PLAN_INTRO": {
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

        case "SET_STATE": {
            return action.data;
        }

        case "ADD_PLAN": {
            var new_plan_list = state.plan_list.slice();
            const newPlanType: meta_types.classType = action.data;

            var newPlanItem: req_types.classPlanListItem = {
                // @ts-ignore
                week: "",
                title: "",
                location: "",
                type: newPlanType,
                tutor: "",
                date: "",
                time: "",
            };
            if (newPlanType === "ONLINE") {
                newPlanItem = {
                    ...newPlanItem,
                    video_link: "",
                    introduce: "",
                };
            } else if (newPlanType === "ZOOM") {
                newPlanItem = {
                    ...newPlanItem,
                    zoom_link: "",
                };
            }
            new_plan_list.push(newPlanItem);
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        case "REMOVE_PLAN": {
            var new_plan_list = state.plan_list.slice();
            new_plan_list.splice(action.data, 1);
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        default:
            throw new Error("STATE REDUCER ERROR :: CLASSSTORE");
    }
};

export const ClassNewStoreProvider = ({ children }: { children: JSX.Element }) => {
    const { clientSideApi } = useAuthStore();
    const [state, dispatch] = useReducer(reducer, initState);

    const makeDivisionList = () => {
        var reqDivisionList: { first_division: string; second_division: string[] }[] = [];
        state.division_list.forEach((item) => {
            const firstDivisionIdx = reqDivisionList.findIndex((it) => it.first_division === item.first_division);
            if (firstDivisionIdx === -1) {
                // NO REMAIN
                reqDivisionList.push({
                    first_division: item.first_division,
                    second_division: [item.second_division],
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

    const saveClass = async (valueList: { title: string; content: string; reference: string }) => {
        const { title, content, reference } = valueList;
        const reqDivionList = makeDivisionList();
        const reqObj = {
            title: title,
            content: content,
            category: state.category,
            division_list: reqDivionList,
            student_limit: state.student_limit,
            reference: reference,
            handout_list: state.handout_list,
            plan_list: state.plan_list,
        };

        console.log(reqObj);
        const res = await clientSideApi("POST", "MAIN", "LECTURE_NEW", undefined, reqObj);
        if (res.result === "SUCCESS") {
            console.log(res.data);
            console.log(res);

            alert("강의가 성공적으로 개설되었습니다");
        }
    };

    const store = { ...state, saveClass };
    return (
        <ClassNewStoreContext.Provider value={store}>
            <ClassNewStoreDispatchContext.Provider value={dispatch}>{children}</ClassNewStoreDispatchContext.Provider>
        </ClassNewStoreContext.Provider>
    );
};

export const useClassNewStore = () => {
    const state = useContext(ClassNewStoreContext);
    if (!state) throw new Error("Cannot find ClassStoreProvider");
    return state;
};

export const useClassNewDispatch = () => {
    const dispatch = useContext(ClassNewStoreDispatchContext);
    if (!dispatch) throw new Error("Cannot find ClassStoreProvider");
    return dispatch;
};
