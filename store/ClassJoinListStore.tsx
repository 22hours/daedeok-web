import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { useAuthStore } from "./AuthStore";
import { useRouter } from "next/router";

// STATE TYPES
type State = {
    lecture_list_item: {
        lecture_list: Array<{
            id: number;
            title: string;
            category: string;
            start_date: string;
            end_date: string;
            student_limit: number;
            student_num: number;
            status: "IMPOSSIBLE" | "POSSIBLE" | "ING";
        }>;
        total_count: number;
        total_page: number;
    };
    now_page: number;
    now_category: string;
};

// ELEMENT TYPES
const initState: State = {
    lecture_list_item: { lecture_list: [], total_count: 0, total_page: 0 },
    now_page: 0,
    now_category: "ALL",
};
// ACTION TYPES
type Action =
    | { type: "SET_CLASS_LIST"; data: State["lecture_list_item"] }
    | { type: "SET_NOW_STATE"; data: { now_page: number; now_category: string } };

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const ClassJoinListStoreContext = React.createContext<State | null>(null);
const ClassJoinListStoreDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_CLASS_LIST": {
            return {
                ...state,
                lecture_list_item: action.data,
            };
        }
        case "SET_NOW_STATE": {
            const { now_page, now_category } = action.data;
            return {
                ...state,
                now_category: now_category,
                now_page: now_page,
            };
        }
        default:
            throw new Error("CLASS JOIN REDUCER ERROR");
    }
};

export const ClassJoinListStoreProvider = ({ children }: { children: JSX.Element }) => {
    const { clientSideApi } = useAuthStore();
    const [state, dispatch] = useReducer(reducer, initState);
    const router = useRouter();

    const getClassListData = async () => {
        console.log(state.now_page);
        const req =
            state.now_category === "ALL"
                ? { page: state.now_page, required_count: 7 }
                : { category: state.now_category, page: state.now_page, required_count: 7 };

        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, req);
        if (res.result === "SUCCESS") {
            var data = res.data;
            dispatch({ type: "SET_CLASS_LIST", data: data });
        }
    };

    useEffect(() => {
        var category = router.query.category ? router.query.category : "ALL";
        var page = router.query.page ? router.query.page : 1;
        console.log(page);
        console.log(category);
        dispatch({
            type: "SET_NOW_STATE",
            //@ts-ignore
            data: { now_page: page - 1, now_category: category },
        });
    }, [router.query]);

    useEffect(() => {
        getClassListData();
    }, [state.now_page, state.now_category]);

    return (
        <ClassJoinListStoreContext.Provider value={state}>
            <ClassJoinListStoreDispatchContext.Provider value={dispatch}>
                {children}
            </ClassJoinListStoreDispatchContext.Provider>
        </ClassJoinListStoreContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(ClassJoinListStoreContext);
    if (!state) throw new Error("Cannot find ClassJoinListStoreProvider");
    return state;
};

export const useStoreDispatch = () => {
    const dispatch = useContext(ClassJoinListStoreDispatchContext);
    if (!dispatch) throw new Error("Cannot find ClassJoinListStoreProvider");
    return dispatch;
};
