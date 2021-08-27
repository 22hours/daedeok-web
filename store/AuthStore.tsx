import AxiosClient from "lib/api/api";
import { api_config_type } from "@api_config_type";
import React, { useEffect, Dispatch, createContext, useReducer, useContext, useRef } from "react";
import { meta_types } from "@global_types";
import CookieController from "lib/client/cookieController";
import { useRouter } from "next/router";
import { useAlert } from "./GlobalAlertStore";
import { useConfirm } from "./GlobalConfirmStore";

// ELEMENT TYPES
type api_params = api_config_type.api_params;

// STATE TYPES
type State = meta_types.user | null;

type Store = {
    auth: State;
    clientSideApi: (
        method: api_params["method"],
        domain: api_params["domain"],
        ep: api_params["ep"],
        url_query?: api_params["url_query"],
        data?: api_params["data"]
    ) => Promise<api_config_type.api_response>;
    login: (user_data: meta_types.user) => void;
    logout: () => void;
    update: (userData: meta_types.user) => void;
};

// ACTION TYPES
type Action = { type: "UPDATE"; data: State } | { type: "LOGIN"; data: State } | { type: "LOGOUT" };

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const AuthContext = React.createContext<Store | null>(null);
const AuthDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "UPDATE": {
            return action.data;
        }
        case "LOGIN": {
            return action.data;
        }
        case "LOGOUT": {
            return null;
        }
        default:
            throw new Error("REDUCER ERROR IN :: AUTH STATE");
    }
};

export const AuthProvider = ({ children }) => {
    const apiClient = AxiosClient;

    const router = useRouter();
    const { confirmOn } = useConfirm();
    const { alertOn } = useAlert();
    const [auth, dispatch] = useReducer(reducer, null);

    let isRefreshing = false;
    let failedQueue: any[] = [];
    const processQueue = (error, token = null) => {
        failedQueue.forEach((prom: any) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        failedQueue = [];
    };

    const clientSideApi = async (
        method: api_params["method"],
        domain: api_params["domain"],
        ep: api_params["ep"],
        url_query?: api_params["url_query"],
        data?: api_params["data"]
    ) => {
        var extraHeader = {};
        if (auth?.user_id) {
            extraHeader = {
                Authorization: `Bearer ${CookieController.getTokenInCookie()?.access_token}`,
            };
        }
        const res_data = await apiClient.API_CALL(method, domain, ep, url_query, data, extraHeader);
        if (res_data.result === "SUCCESS") {
            return res_data;
        } else {
            switch (res_data.statusCode) {
                case 701: {
                    // 토큰 만료
                    if (res_data.config) {
                        const originalRequest = res_data.config;

                        if (isRefreshing) {
                            return new Promise(function (resolve, reject) {
                                failedQueue.push({ resolve, reject });
                            })
                                .then((token) => {
                                    originalRequest.headers["Authorization"] = "Bearer " + token;
                                    return apiClient.client(originalRequest);
                                })
                                .catch((err) => {
                                    return Promise.reject(err);
                                });
                        }

                        originalRequest._retry = true;
                        isRefreshing = true;

                        const token = CookieController.getTokenInCookie();
                        return new Promise(function (resolve, reject) {
                            apiClient
                                .API_CALL(
                                    "POST",
                                    "MAIN",
                                    "REFRESH",
                                    undefined,
                                    { ...token },
                                    { Authorization: undefined }
                                )
                                .then(({ data }) => {
                                    if (data?.access_token) {
                                        CookieController.setAccessTokenInCokkie(data.access_token);
                                        apiClient.client.defaults.headers.common["Authorization"] =
                                            "Bearer " + data.access_token;
                                        originalRequest.headers["Authorization"] = "Bearer " + data.access_token;
                                        processQueue(null, data.access_token);
                                        resolve(apiClient.client(originalRequest));
                                    } else {
                                        reject();
                                        confirmOn({
                                            message: "다시 로그인해주시기 바랍니다",
                                            onSuccess: () => location.replace("/logout"),
                                            isFailButtonRemove: true,
                                        });
                                        isRefreshing = false;
                                    }
                                })
                                .catch((err) => {
                                    processQueue(err, null);
                                    reject(err);
                                    confirmOn({
                                        message: "다시 로그인해주시기 바랍니다",
                                        onSuccess: () => location.replace("/logout"),
                                        isFailButtonRemove: true,
                                    });
                                })
                                .finally(() => {
                                    isRefreshing = false;
                                });
                        });
                    }
                    break;
                }
                case 702: {
                    // 토큰 변조
                    logout();
                    return res_data;
                }
                default:
                    return res_data;
            }
        }

        return res_data;
    };

    const login = (userData: meta_types.user) => {
        dispatch({
            type: "LOGIN",
            data: {
                ...userData,
                lecture_num: userData.lecture_num || 0,
            },
        });
        CookieController.setUserWithCookie(userData);
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        CookieController.removeUserInCookieWithCallBack(() => location.replace("/"));
    };

    const update = (userData: meta_types.user) => {
        dispatch({
            type: "UPDATE",
            data: {
                ...auth,
                ...userData,
            },
        });
        CookieController.setUserWithCookie({ ...auth, ...userData });
    };

    const initAuth = async () => {
        const userData: meta_types.user = CookieController.getUserWithCookie();

        if (userData.user_id) {
            if (userData.role !== "ROLE_ADMIN") {
                const res = await apiClient.API_CALL("GET", "MAIN", "USER_INFO", undefined, undefined, {
                    Authorization: `Bearer ${userData.access_token}`,
                });
                if (res.result === "SUCCESS") {
                    login({
                        ...userData,
                        ...res.data,
                        lecture_num: res.data.lecture_num || 0,
                    });
                } else {
                    dispatch({
                        type: "LOGIN",
                        data: {
                            ...userData,
                            lecture_num: userData.lecture_num || 0,
                        },
                    });
                }
            } else {
                dispatch({
                    type: "LOGIN",
                    data: {
                        ...userData,
                        lecture_num: userData.lecture_num || 0,
                    },
                });
            }
        }
    };

    const firstRef = useRef(true);

    useEffect(() => {
        if (firstRef.current) {
            firstRef.current = false;
        } else {
            if (auth === null) {
                CookieController.removeUserInCookie();
            }
        }
    }, [auth]);

    const store: Store = {
        auth,
        // @ts-ignore
        clientSideApi,
        login,
        logout,
        update,
    };

    useEffect(() => {
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={store}>
            <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
};

export const useAuthStore = (): Store => {
    const state = useContext(AuthContext);
    if (state) return state;
    else {
        throw new Error("Cannot find AuthContext");
    }
};

export const useStoreDispatch = () => {
    const dispatch = useContext(AuthDispatchContext);
    if (!dispatch) throw new Error("Cannot find AuthProvider");
    return dispatch;
};
