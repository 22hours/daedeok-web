import { match } from "assert/strict";
import ClassLayout from "components/layout/ClassLayout";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { ClassDetailProvider } from "./ClassDetailStore";

// ELEMENT TYPES

// STATE TYPES
type State = {};

// ACTION TYPES
type Action = {};

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const ClassStoreContext = React.createContext<State | null>(null);
const ClassStoreDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    return "";
};

export const ClassStoreProvider = ({ children }) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, {});

    const RenderChildren = () => {
        if (router.pathname.includes("/class/[status]/[class_id]")) {
            return <ClassDetailProvider>{children}</ClassDetailProvider>;
        } else {
            return <>{children}</>;
        }
    };

    return (
        <ClassStoreContext.Provider value={state}>
            <ClassStoreDispatchContext.Provider value={dispatch}>
                <ClassLayout>
                    <RenderChildren />
                </ClassLayout>
            </ClassStoreDispatchContext.Provider>
        </ClassStoreContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(ClassStoreContext);
    if (!state) throw new Error("Cannot find ClassStoreProvider");
    return state;
};

export const useStoreDispatch = () => {
    const dispatch = useContext(ClassStoreDispatchContext);
    if (!dispatch) throw new Error("Cannot find ClassStoreProvider");
    return dispatch;
};
