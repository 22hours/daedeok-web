import { meta_types } from "@global_types";
import { useEffect, useReducer, useState } from "react";
const STORE_NAME = "daedeok-user";

type token = {
    access_token: string;
    refresh_token: string;
} | null;

// USER
const getUserDataInStorage = (): meta_types.user => {
    const rawStorageData = localStorage.getItem(STORE_NAME);
    const storageData: meta_types.user = rawStorageData ? JSON.parse(rawStorageData) : null;
    return storageData;
};

const setUserDataInStorgae = (user_data: meta_types.user) => {
    localStorage.setItem(STORE_NAME, JSON.stringify(user_data));
};

const removeUserDataInStorage = () => {
    localStorage.removeItem(STORE_NAME);
};

// TOKEN
const getTokenInStorage = (): token => {
    const rawStorageData = localStorage.getItem(STORE_NAME);
    const storageData: meta_types.user = rawStorageData ? JSON.parse(rawStorageData) : null;
    return { access_token: storageData.access_token, refresh_token: storageData.refresh_token };
};

const setAccessTokenInStorage = (access_token: string) => {
    if (access_token) {
        const storageData = getUserDataInStorage();
        localStorage.setItem(
            STORE_NAME,
            JSON.stringify({
                ...storageData,
                access_token: access_token,
            })
        );
    }
};

const StorageController = {
    getUserDataInStorage,
    setUserDataInStorgae,
    removeUserDataInStorage,
    getTokenInStorage,
    setAccessTokenInStorage,
};

export default StorageController;
