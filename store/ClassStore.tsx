import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";

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
    const [state, dispatch] = useReducer(reducer, {});
    useEffect(() => {
        console.log("CLASS STORE MOUNT");
    }, []);

    useEffect(() => {
        console.log("CLASS STORE RERENDER");
    });
    return (
        <ClassStoreContext.Provider value={state}>
            <ClassStoreDispatchContext.Provider value={dispatch}>{children}</ClassStoreDispatchContext.Provider>
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
