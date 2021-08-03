import { meta_types } from "@global_types";
import cookie from "react-cookies";

const HTTP_ONLY = false;

type user = meta_types.user;

type token = {
    access_token: string;
    refresh_token: string;
} | null;

const getTokenInCookie = (): token => {
    return {
        access_token: cookie.load("access_token"),
        refresh_token: cookie.load("refresh_token"),
    };
};

const getUserWithCookie = (): user => {
    const cookieData = cookie.loadAll();
    return {
        user_id: cookieData.user_id,
        name: cookieData.name,
        role: cookieData.role,
        duty: cookieData.duty,
        lecture_num: cookieData.lecture_num,
        access_token: cookieData.access_token,
        refresh_token: cookieData.refresh_token,
    };
};

const setUserWithCookie = (user: user) => {
    const expires = new Date();
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
    for (const [key, value] of Object.entries(user)) {
        cookie.save(key, value.toString(), {
            path: "/",
            expires,
            httpOnly: HTTP_ONLY,
        });
    }
};

const removeUserInCookie = () => {
    const userObj: user = {
        user_id: "",
        name: "",
        role: "ROLE_MEMBER",
        duty: "string",
        lecture_num: 3,
        access_token: "",
        refresh_token: "string",
    };
    for (const [key, _] of Object.entries(userObj)) {
        cookie.remove(key);
    }
};

const CookieController = {
    setUserWithCookie,
    removeUserInCookie,
    getUserWithCookie,
    getTokenInCookie,
};

export default CookieController;