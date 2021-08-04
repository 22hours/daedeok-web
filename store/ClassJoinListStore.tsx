import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { useAuthStore } from "./AuthStore";

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
};

// ELEMENT TYPES
const initState: State = {
    lecture_list_item: { lecture_list: [], total_count: 0, total_page: 0 },
    now_page: 0,
};
// ACTION TYPES
type Action =
    | { type: "SET_CLASS_LIST"; data: State["lecture_list_item"] }
    | { type: "SET_NOW_PAGE"; data: State["now_page"] };

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
        case "SET_NOW_PAGE": {
            return {
                ...state,
                now_page: action.data,
            };
        }
        default:
            throw new Error("CLASS JOIN REDUCER ERROR");
    }
};

export const ClassJoinListStoreProvider = ({ children }: { children: JSX.Element }) => {
    const { clientSideApi } = useAuthStore();
    const [state, dispatch] = useReducer(reducer, initState);

    const getClassListData = async () => {
        const res_data = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, {
            page: state.now_page,
            required_count: 7,
        });
        console.log(res_data);
        if (res_data.result === "SUCCESS") {
            var data = res_data.data;
            dispatch({ type: "SET_CLASS_LIST", data: data });
        }
    };

    useEffect(() => {
        getClassListData();
    }, [state.now_page]);

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
