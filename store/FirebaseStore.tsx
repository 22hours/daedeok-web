import React, { useState, useEffect, Dispatch, createContext, useReducer, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useAlert } from "store/GlobalAlertStore";

const TEST = false;

const firebaseConfig = {
    apiKey: "AIzaSyBlzidD-PYqWdqoCyLNHkf9VJNNyJPxQmE",
    authDomain: "class-assignment-5d78c.firebaseapp.com",
    projectId: "class-assignment-5d78c",
    storageBucket: "class-assignment-5d78c.appspot.com",
    messagingSenderId: "200887423991",
    appId: "1:200887423991:web:d69ab750cca51eb169d4f2",
    measurementId: "G-DSB4G6MFRR",
};

// ELEMENT TYPES

// STATE TYPES
type Store = {
    phoneNumberAuth: any;
    firebaseError: any;
};

// ACTION TYPES
type Action = {};

// DISPATCH TYPES
type ContextDispatch = Dispatch<Action>;

// CONTEXT
const FirebaseContext = React.createContext<Store | null>(null);

export const FirebaseProvider = ({ children }) => {
    const { alertOn, apiErrorAlert } = useAlert();
    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // @ts-ignore
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
            size: "invisible",
            callback: (response) => {
                console.log("recaptcha solved");
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
        });
    }, []);

    const firebaseError = (error) => {
        switch (error) {
            case "auth/missing-verification-code": {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "인증번호를 입력해주세요",
                    type: "ERROR",
                });
                break;
            }
            case "auth/invalid-verification-code": {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "인증번호가 유효하지 않습니다",
                    type: "ERROR",
                });
                break;
            }
            case "auth/code-expired": {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "인증번호가 만료되었습니다",
                    type: "ERROR",
                });
                break;
            }
            case "auth/seesion-expired": {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "인증번호가 만료되었습니다",
                    type: "ERROR",
                });
                break;
            }
            case "auth/too-many-requests": {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "잠시 후 다시 시도해 주세요",
                    type: "ERROR",
                });
                break;
            }
            default: {
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "인증번호를 정확히 입력해주세요",
                    type: "ERROR",
                });
            }
        }
    };

    const phoneNumberAuth = async (phoneNumber: string, callBack: Function) => {
        const onlyNumberPhoneNumber = phoneNumber.replaceAll("-", "");

        firebase.auth().languageCode = "ko";
        const requestPhoneNumber = `+82${onlyNumberPhoneNumber}`;

        // @ts-ignore
        const appVerifier = window.recaptchaVerifier;
        return await firebase
            .auth()
            .signInWithPhoneNumber(requestPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // @ts-ignore
                window.confirmationResult = confirmationResult;
                // ...
                callBack(true);
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                callBack(false);
            });
    };

    const store = {
        phoneNumberAuth,
        firebaseError,
    };

    return (
        <FirebaseContext.Provider value={store}>
            {/* <div id="recaptcha-container"></div> */}
            <div id="sign-in-button"></div>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebaseAuth = () => {
    const state = useContext(FirebaseContext);
    if (!state) throw new Error("Cannot find FirebaseProvider");
    return state;
};
