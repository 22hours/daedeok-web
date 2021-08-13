import AdminLayout from "components/layout/AdminLayout";
import { useRouter } from "next/router";
import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { useAuthStore } from "./AuthStore";

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
    const router = useRouter();
    const { auth } = useAuthStore();

    useEffect(() => {
        if (auth) {
            if (auth.role !== "ROLE_ADMIN") {
                router.replace("/class");
            }
        }
    }, [auth]);

    return (
        <AdminStoreContext.Provider value={null}>
            <AdminLayout>{children}</AdminLayout>
        </AdminStoreContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(AdminStoreContext);
    if (!state) throw new Error("Cannot find AdminStoreProvider");
    return state;
};
