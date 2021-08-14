import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import useBoolean from "lib/hooks/useBoolean";
import GlobalLoader from "components/molecule/GlobalLoader/GlobalLoader";

// STATE TYPES
type State = {
    value: any;
    setValue: React.Dispatch<any>;
    onChange: (e: any) => void;
    toggle: () => void;
};

// CONTEXT
const GlobalLoaderContext = React.createContext<State | null>(null);

// REDUCER

export const GlobalLoaderProvider = ({ children }) => {
    const loader = useBoolean();
    return (
        <GlobalLoaderContext.Provider value={loader}>
            {children}
            <GlobalLoader />
        </GlobalLoaderContext.Provider>
    );
};

export const useGlobalLoader = () => {
    const state = useContext(GlobalLoaderContext);
    if (!state) throw new Error("Cannot find GlobalLoaderProvider");
    return state;
};
