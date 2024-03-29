import { meta_types } from "@global_types";
import cookie from "react-cookies";

const HTTP_ONLY = false;

type user = meta_types.user;

type token = {
    access_token: string;
    refresh_token: string;
} | null;

const getExpiredDate = () => {
    const expires = new Date();
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
    return expires;
};

const setAccessTokenInCokkie = async (access_token: string) => {
    const expires = getExpiredDate();
    cookie.save("access_token", access_token.toString(), {
        path: "/",
        expires,
        httpOnly: HTTP_ONLY,
    });
};

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
        phone_num: cookieData.phone_num,
        first_division: cookieData.first_division,
        second_division: cookieData.second_division,
        access_token: cookieData.access_token,
        refresh_token: cookieData.refresh_token,
    };
};

const setUserWithCookie = async (user: user) => {
    const expires = getExpiredDate();

    for (const [key, value] of Object.entries(user)) {
        if (value !== null) {
            cookie.save(key, value.toString(), {
                path: "/",
                expires,
                httpOnly: HTTP_ONLY,
            });
        }
    }
    return "";
};

const removeUserInCookie = () => {
    const cookieData = cookie.loadAll();
    for (const [key, _] of Object.entries(cookieData)) {
        cookie.remove(key);
    }
};

const removeUserInCookieWithCallBack = (cb: Function) => {
    const cookieData = cookie.loadAll();
    for (const [key, _] of Object.entries(cookieData)) {
        cookie.remove(key);
    }
    if (cb !== null) {
        cb();
    }
};

const CookieController = {
    setUserWithCookie,
    removeUserInCookie,
    getUserWithCookie,
    getTokenInCookie,
    setAccessTokenInCokkie,
    removeUserInCookieWithCallBack,
};

export default CookieController;
