import { meta_types } from "@global_types";
import BreadCrumbs from "@ui/BreadCrumbs";
import ClassDetailTopTab from "components/molecule/ClassDetailTopTab";
import { useRouter } from "next/router";
import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { useAuthStore } from "./AuthStore";
import { useClassStore } from "./ClassStore";

// STATE TYPES
type State = {
    class_id: string;
    class_title: string;
    class_status: meta_types.classStatus;
} | null;

// ACTION TYPES
type Action = {};

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const ClassDetailContext = React.createContext<State | null>(null);
const ClassDetailDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
type ProviderType = {
    children: JSX.Element;
    BreadCrumbsComponent: JSX.Element;
    PageTitle: JSX.Element;
};
export const ClassDetailProvider = (props: ProviderType) => {
    const router = useRouter();
    const asPath = router.asPath;
    const [classInfo, setClassInfo] = useState<State>(null);
    const { auth, clientSideApi } = useAuthStore();
    const getClassInfo = async () => {
        console.log("CALL");
        // @ts-ignore
        const { class_id, status }: { class_id: string; status: meta_types.classStatus } = router.query;
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_CLASS_TITLE", { lecture_id: class_id });
        console.log(res);
        if (res.result === "SUCCESS") {
            setClassInfo({
                class_id: class_id,
                class_title: res.data.title,
                class_status: status,
            });
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        console.log({ router, auth });
        if (router.query.class_id && auth?.user_id) {
            getClassInfo();
        }
    }, [router, auth]);

    return (
        <ClassDetailContext.Provider value={classInfo}>
            <div>
                {classInfo && (
                    <>
                        {props.BreadCrumbsComponent}
                        {props.PageTitle}
                        <ClassDetailTopTab status={classInfo.class_status} class_id={classInfo.class_id} />
                        {props.children}
                    </>
                )}
            </div>
        </ClassDetailContext.Provider>
    );
};

export const useClassDetailStore = () => {
    const state = useContext(ClassDetailContext);
    if (!state) throw new Error("Cannot find ClassDetailProvider");
    return state;
};

export const useStoreDispatch = () => {
    const dispatch = useContext(ClassDetailDispatchContext);
    if (!dispatch) throw new Error("Cannot find ClassDetailProvider");
    return dispatch;
};
