import AxiosClient from "lib/api/api";
import { api_config_type } from "@api_config_type";
import React, { useEffect, Dispatch, createContext, useReducer, useContext, useState } from "react";
import { meta_types } from "@global_types";
import CookieController from "lib/client/cookieController";
import Alert from "components/molecule/Alert/Alert";
import { useCallback } from "react";

type Store = {
    state: State;
    alertOn: ({
        message,
        title,
        type,
    }: {
        message: string;
        title?: string | undefined;
        type?: "POSITIVE" | "ERROR" | "WARN" | "DEFAULT" | undefined;
    }) => void;
    alertOff: () => void;
};
type State =
    | { isOpen: false }
    | { type: "POSITIVE" | "ERROR" | "WARN" | "DEFAULT"; isOpen: true; title?: string; message: string };
const initState: State = {
    isOpen: false,
};
// CONTEXT
const GlobalAlertContext = React.createContext<Store | null>(null);

export const GlobalAlertProvider = ({ children }) => {
    const makeChild = useCallback(() => {
        return <>{children}</>;
    }, [children]);

    const [state, setState] = useState<State>(initState);
    const alertOn = ({
        message,
        title,
        type,
    }: {
        message: string;
        title?: string;
        type?: "POSITIVE" | "ERROR" | "WARN" | "DEFAULT";
    }) => {
        setState({
            isOpen: true,
            message: message,
            title: title,
            type: type || "DEFAULT",
        });
    };
    const alertOff = () => {
        setState({
            isOpen: false,
        });
    };
    const store: Store = {
        state,
        alertOn,
        alertOff,
    };
    return (
        <GlobalAlertContext.Provider value={store}>
            <Alert />
            {makeChild()}
        </GlobalAlertContext.Provider>
    );
};

export const useAlert = (): Store => {
    const state = useContext(GlobalAlertContext);
    if (state) return state;
    else {
        throw new Error("Cannot find GlobalAlertContext");
    }
};
