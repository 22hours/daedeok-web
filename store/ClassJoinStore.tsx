import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { useAuthStore } from "./AuthStore";

// STATE TYPES
type State = {
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

// ELEMENT TYPES
const initState: State = {
    lecture_list: [],
    total_count: 0,
    total_page: 0,
};
// ACTION TYPES
type Action = { type: "SET_CLASS_LIST"; data: State };

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const ClassJoinStoreContext = React.createContext<State | null>(null);
const ClassJoinStoreDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_CLASS_LIST": {
            return action.data;
        }

        default:
            throw new Error("CLASS JOIN REDUCER ERROR");
    }
};

export const ClassJoinStoreProvider = ({ children }: { children: JSX.Element }) => {
    const { clientSideApi } = useAuthStore();
    const [state, dispatch] = useReducer(reducer, initState);

    const getClassListData = async () => {
        const res_data = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, {
            page: 1,
            required_count: 7,
        });
        if (res_data) {
            console.log(res_data);
            //@ts-ignore
            if (res_data.result === "SUCCESS") {
                var data = res_data.data;
                dispatch({ type: "SET_CLASS_LIST", data: data });
            }
        }
    };

    useEffect(() => {
        getClassListData();
    }, []);

    return (
        <ClassJoinStoreContext.Provider value={state}>
            <ClassJoinStoreDispatchContext.Provider value={dispatch}>{children}</ClassJoinStoreDispatchContext.Provider>
        </ClassJoinStoreContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(ClassJoinStoreContext);
    if (!state) throw new Error("Cannot find ClassJoinStoreProvider");
    return state;
};

export const useStoreDispatch = () => {
    const dispatch = useContext(ClassJoinStoreDispatchContext);
    if (!dispatch) throw new Error("Cannot find ClassJoinStoreProvider");
    return dispatch;
};
