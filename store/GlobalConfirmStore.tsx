import React, { useEffect, Dispatch, createContext, useReducer, useContext, useState } from "react";
import { useCallback } from "react";
import Confirm from "components/molecule/Confirm/Confirm";

type Store = {
    state: State;
    setState: (newState: State) => void;
    confirmOn: ({
        message,
        onSuccess,
        onFail,
        title,
    }: {
        message: string;
        onSuccess: Function;
        onFail?: Function;
        title?: string | undefined;
        isFailButtonRemove?: boolean;
    }) => void;
};
type State =
    | { isOpen: false }
    | {
          isOpen: true;
          title?: string;
          message: string;
          onSuccess: Function;
          onFail?: Function;
          isFailButtonRemove?: boolean;
      };
const initState: State = {
    isOpen: false,
};
// CONTEXT
const GlobalConfirmContext = React.createContext<Store | null>(null);

export const GlobalConfirmProvider = ({ children }) => {
    const makeChild = useCallback(() => {
        return <>{children}</>;
    }, [children]);

    const [state, setState] = useState<State>(initState);

    const confirmOn = ({
        message,
        onSuccess,
        onFail,
        title,
        isFailButtonRemove,
    }: {
        message: string;
        onSuccess: Function;
        onFail?: Function;
        title?: string;
        isFailButtonRemove?: boolean;
    }) => {
        setState({
            isOpen: true,
            message: message,
            title: title,
            onSuccess: onSuccess,
            onFail: onFail,
            isFailButtonRemove: isFailButtonRemove,
        });
    };

    const store: Store = {
        state,
        setState,
        confirmOn,
    };
    return (
        <GlobalConfirmContext.Provider value={store}>
            <Confirm />
            {makeChild()}
        </GlobalConfirmContext.Provider>
    );
};

export const useConfirm = (): Store => {
    const state = useContext(GlobalConfirmContext);
    if (state) return state;
    else {
        throw new Error("Cannot find GlobalConfirmContext");
    }
};
