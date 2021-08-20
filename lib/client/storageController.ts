import { meta_types } from "@global_types";
import { useEffect, useReducer, useState } from "react";
const STORE_NAME = "daedeok-user-id";

const getIdFromStorage = () => {
    const storedId = localStorage.getItem(STORE_NAME);
    return storedId || false;
};

const saveIdInStorage = (id: string) => {
    localStorage.setItem(STORE_NAME, id);
};

const removeIdInStorage = () => {
    localStorage.removeItem(STORE_NAME);
};

const StorageController = {
    getIdFromStorage,
    saveIdInStorage,
    removeIdInStorage,
};

export default StorageController;
