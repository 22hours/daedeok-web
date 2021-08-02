import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { meta_types, req_types, res_types } from "@global_types";

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
    handout_list: [
        {
            name: "",
            url: "",
        },
    ],
    plan_list: [
        {
            week: 1,
            title: "",
            location: "",
            type: "",
            link: "",
            introduce: "",
            tutor: "",
            date: { date: "", time: "" },
        },
    ],
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
    | { type: "SET_FILE"; data: State["handout_list"] }
    | { type: "SET_STATE"; data: State }
    | { type: "ADD_PLAN"; data: string }
    | { type: "REMOVE_PLAN"; data: number }
    | { type: "SET_PLAN_WEEK"; data: { idx: number; week: number } }
    | { type: "SET_PLAN_TITLE"; data: { idx: number; title: string } }
    | { type: "SET_PLAN_TUTOR"; data: { idx: number; tutor: string } }
    | { type: "SET_PLAN_LOCATION"; data: { idx: number; location: string } }
    | { type: "SET_PLAN_INTRO"; data: { idx: number; intro: string } }
    | { type: "SET_PLAN_LINK"; data: { idx: number; link: string } }
    | { type: "SET_PLAN_DATE"; data: { idx: number; date: string } }
    | { type: "SET_PLAN_TIME"; data: { idx: number; time: string } };

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const ClassNewStoreContext = React.createContext<State | null>(null);
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
        // case "SET_FIRST_DIVISION": {
        //     var new_division_list = state.division_list.slice();
        //     //@ts-ignore
        //     var { idx, first_division } = action.data;
        //     console.log(first_division);
        //     new_division_list[idx] = {
        //         ...new_division_list[idx],
        //         //@ts-ignore
        //         first_division: first_division,
        //     };
        //     return {
        //         ...state, //@ts-ignore
        //         division_list: new_division_list,
        //     };
        // }
        // case "SET_SECOND_DIVISION": {
        //     var new_division_list = state.division_list.slice();
        //     //@ts-ignore
        //     var { idx, second_division } = action.data;
        //     console.log(second_division);
        //     new_division_list[idx] = {
        //         ...new_division_list[idx],
        //         //@ts-ignore
        //         second_division: second_division,
        //     };
        //     return {
        //         ...state, //@ts-ignore
        //         division_list: new_division_list,
        //     };
        // }

        case "ADD_DIVISION_LIST": {
            var new_division_list = state.division_list.slice();
            //@ts-ignore
            var { first_division, second_division } = action.data;
            new_division_list.push({
                first_division: first_division,
                second_division: second_division,
            });
            return {
                ...state,
                division_list: new_division_list,
            };
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
        case "SET_FILE": {
            return {
                ...state,
                handout_list: action.data,
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
            var { idx, intro } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                introduce: intro,
            };
            return {
                ...state,
                plan_list: new_plan_list,
            };
        }
        case "SET_PLAN_LINK": {
            var new_plan_list = state.plan_list.slice();
            //@ts-ignore
            var { idx, link } = action.data;
            new_plan_list[idx] = {
                ...new_plan_list[idx],
                link: link,
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
                date: {
                    ...new_plan_list[idx].date,
                    date: date,
                },
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
                date: {
                    ...new_plan_list[idx].date,
                    time: time,
                },
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
            new_plan_list.push({
                week: 0,
                title: "",
                location: "",
                type: action.data,
                link: "",
                introduce: "",
                tutor: "",
                date: {
                    date: "",
                    time: "",
                },
            });
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
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <ClassNewStoreContext.Provider value={state}>
            <ClassNewStoreDispatchContext.Provider value={dispatch}>{children}</ClassNewStoreDispatchContext.Provider>
        </ClassNewStoreContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(ClassNewStoreContext);
    if (!state) throw new Error("Cannot find ClassStoreProvider");
    return state;
};

export const useStoreDispatch = () => {
    const dispatch = useContext(ClassNewStoreDispatchContext);
    if (!dispatch) throw new Error("Cannot find ClassStoreProvider");
    return dispatch;
};
