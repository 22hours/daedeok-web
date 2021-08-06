import AxiosClient from "lib/api/api";
import { api_config_type } from "@api_config_type";
import React, { useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import { meta_types } from "@global_types";
import CookieController from "lib/client/cookieController";

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
};

// ACTION TYPES
type Action = { type: "LOGIN"; data: State } | { type: "LOGOUT" };

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const AuthContext = React.createContext<Store | null>(null);
const AuthDispatchContext = createContext<ContextDispatch | null>(null);

// REDUCER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
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

    const [auth, dispatch] = useReducer(reducer, null);

    const getNewAccessToken = async () => {
        const token = CookieController.getTokenInCookie();
        const res_data = await apiClient.API_CALL("POST", "MAIN", "REFRESH", undefined, { ...token });
        if (res_data.result === "SUCCESS") {
            return res_data.data.access_token;
        } else {
            alert("다시 로그인하십시오");
            logout();
        }
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
            console.log(res_data.statusCode);
            switch (res_data.statusCode) {
                case 701: {
                    // 토큰 만료
                    if (res_data.config) {
                        const newAccessToken = await getNewAccessToken();
                        const errorConfig = res_data.config;
                        return apiClient.client({
                            method: errorConfig.method,
                            url: errorConfig.url,
                            data: errorConfig.data,
                            params: errorConfig.params,
                            headers: { ...errorConfig.headers, Authorization: newAccessToken },
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
                user_id: userData.user_id,
                name: userData.name,
                role: userData.role,
                duty: userData.duty,
                lecture_num: userData.lecture_num || 0,
            },
        });
        CookieController.setUserWithCookie(userData);
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        CookieController.removeUserInCookie();
    };

    const initAuth = () => {
        const userData: meta_types.user = CookieController.getUserWithCookie();
        if (userData.user_id) {
            dispatch({
                type: "LOGIN",
                data: {
                    user_id: userData.user_id,
                    name: userData.name,
                    role: userData.role,
                    duty: userData.duty,
                    lecture_num: userData.lecture_num || 0,
                },
            });
        }
    };

    const store: Store = {
        auth,
        // @ts-ignore
        clientSideApi,
        login,
        logout,
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
