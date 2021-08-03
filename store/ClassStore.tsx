import { meta_types } from "@global_types";
import BreadCrumbs from "@ui/BreadCrumbs";
import Typo from "@ui/Typo";
import { match } from "assert/strict";
import ClassLayout from "components/layout/ClassLayout";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { ClassDetailProvider } from "./ClassDetailStore";

// ELEMENT TYPES

// STATE TYPES
type State = {
    breadCrumbList: meta_types.BreadCrumbItem[];
    pageTitle: string;
};

// ACTION TYPES
type Action =
    | { type: "SET_INIT" }
    | { type: "SET_BREADCRUMBS_LIST"; data: meta_types.BreadCrumbItem[] }
    | { type: "SET_PAGE_TITLE"; data: string };

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
type Store = {
    state: State;
    dispatch: React.Dispatch<Action>;
};
const ClassStoreContext = React.createContext<Store | null>(null);

export const ClassStoreProvider = ({ children }) => {
    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "SET_INIT": {
                return {
                    breadCrumbList: [],
                    pageTitle: "",
                };
            }
            case "SET_BREADCRUMBS_LIST": {
                return {
                    ...state,
                    breadCrumbList: action.data,
                };
            }
            case "SET_PAGE_TITLE": {
                return {
                    ...state,
                    pageTitle: action.data,
                };
            }
            default:
                throw new Error("REDUCER ERROR IN CLASS STORE");
        }
    };
    const [state, dispatch] = useReducer(reducer, {
        breadCrumbList: [],
        pageTitle: "",
    });

    const store = {
        state,
        dispatch,
    };

    return (
        <ClassStoreContext.Provider value={store}>
            <ClassLayout>
                <RenderChildren state={state}>{children}</RenderChildren>
            </ClassLayout>
        </ClassStoreContext.Provider>
    );
};
const RenderChildren = ({ state, children }) => {
    const router = useRouter();
    if (router.pathname.includes("/class/[status]/[class_id]")) {
        return (
            <ClassDetailProvider BreadCrumbsComponent={<BreadCrumbs item_list={state.breadCrumbList} />}>
                <div>{children}</div>
            </ClassDetailProvider>
        );
    } else {
        return (
            <div>
                <BreadCrumbs item_list={state.breadCrumbList} />
                {children}
            </div>
        );
    }
};

export const useClassStore = () => {
    const state = useContext(ClassStoreContext);
    if (!state) throw new Error("Cannot find ClassStoreProvider");
    return state;
};
