import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { useRouter } from "next/router";
import { api_config_type } from "@api_config_type";

// STATE TYPES
type State = {
    page: string;
    category?: string;
    keyword?: string;
    isLoadEnd: boolean;
};

// ACTION TYPES
type Action = {
    type: "SET_STATE";
    data: State;
};

const initalState: State = {
    page: "1",
    category: undefined,
    keyword: undefined,
    isLoadEnd: false,
};

// REDUCER
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_STATE": {
            return action.data;
        }
        default:
            throw new Error("REDUCER ERROR IN LIST COMMON STORE");
    }
};

type Query = { page?: string; category?: string; keyword?: string };

// CONTEXT
type Store = {
    state: State;
    changePage: any;
    changeCategory: any;
    changeKeyword: any;
};
const ListCommonContext = React.createContext<Store | null>(null);

export const ListCommonProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    const router = useRouter();

    useEffect(() => {
        const { page, category, keyword }: Query = router.query;
        dispatch({
            type: "SET_STATE",
            data: {
                page: page || "1",
                category: category || undefined,
                keyword: keyword || undefined,
                isLoadEnd: true,
            },
        });
    }, [router.query]);

    const makeUrl = (page, category, keyword) => {
        const baseUrl = router.asPath.split("?")[0];
        const pageParam = page ? `page=${page}` : false;
        const categoryParams = category ? `category=${category}` : false;
        const keywordParams = keyword ? `keyword=${keyword}` : false;

        return `${baseUrl}?${pageParam || ""}${categoryParams ? `&${categoryParams}` : ""}${
            keywordParams ? `&${keywordParams}` : ""
        }`;
    };

    const changePage = (value: string) => {
        // page <- value
        // category <- state (유지)
        // keyword <- state (유지)

        const nextRouteUrl = makeUrl(value, state.category, state.keyword);
        router.push(nextRouteUrl);
    };

    const changeCategory = (value: string) => {
        // page <- 1 (고정)
        // category <- value
        // keyword <- undefined

        const nextRouteUrl = makeUrl("1", value, undefined);
        router.push(nextRouteUrl);
    };

    const changeKeyword = (value: string) => {
        // page <- 1 (고정)
        // category <- undefined
        // keyword <- value

        const nextRouteUrl = makeUrl("1", undefined, value);
        router.push(nextRouteUrl);
    };

    const store = {
        state,
        changePage,
        changeCategory,
        changeKeyword,
    };
    return <ListCommonContext.Provider value={store}>{state.isLoadEnd && <>{children}</>}</ListCommonContext.Provider>;
};

export const useListCommonStore = () => {
    const state = useContext(ListCommonContext);
    if (!state) throw new Error("Cannot find ListCommonProvider");
    return state;
};
