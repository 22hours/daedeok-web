import AdminLayout from "components/layout/AdminLayout";
import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";

// ELEMENT TYPES

// STATE TYPES
type State = {};

// ACTION TYPES
type Action = {};

// CONTEXT
const AdminStoreContext = React.createContext<State | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    return "";
};

export const AdminStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {});
    useEffect(() => {
        console.log("REDNER");
    });
    return (
        <AdminStoreContext.Provider value={state}>
            <AdminLayout>{children}</AdminLayout>
        </AdminStoreContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(AdminStoreContext);
    if (!state) throw new Error("Cannot find AdminStoreProvider");
    return state;
};
