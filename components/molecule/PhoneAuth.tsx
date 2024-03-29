import React, { useEffect, useReducer, useRef, useState } from "react";
import style from "./PhoneAuth.module.scss";

// Stores
import { useFirebaseAuth } from "store/FirebaseStore";

// @ui
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import TextInput from "@ui/input/TextInput";
import { CircularProgress } from "@material-ui/core";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";

type Props = {
    innerContainerClassName: string;
    inputClassName: string;
    buttonClassName: string;
    onAuthStateCallBack: (authState: string | null) => void;
    isRegister?: boolean;
};
type State = {
    smsState: "IDLE" | "LOAD";
    authState: boolean;
    phoneNumber: string;
    authCode: string;
};
type Action =
    | { type: "SET_INIT" }
    | { type: "SET_STATE"; data: State }
    | { type: "SET_SMS_STATE"; data: State["smsState"] }
    | { type: "SET_AUTH_STATE"; data: State["authState"] }
    | { type: "SET_PHONENUM"; data: State["phoneNumber"] }
    | { type: "SET_AUTHCODE"; data: State["authCode"] };
const initState: State = {
    smsState: "IDLE",
    authState: false,
    phoneNumber: "",
    authCode: "",
};

const PhoneAuth = (props: Props) => {
    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "SET_INIT": {
                return initState;
            }

            case "SET_STATE": {
                return action.data;
            }

            case "SET_SMS_STATE": {
                return {
                    ...state,
                    smsState: action.data,
                };
            }

            case "SET_AUTH_STATE": {
                return {
                    ...state,
                    authState: action.data,
                };
            }

            case "SET_PHONENUM": {
                var phoneNumber = action.data.replace(/[^0-9]/gi, "");
                return {
                    ...state,
                    phoneNumber: phoneNumber,
                };
            }

            case "SET_AUTHCODE": {
                return {
                    ...state,
                    authCode: action.data,
                };
            }
            default:
                throw new Error("REDUCER ERROR IN PHONE AUTH");
        }
    };

    const { alertOn } = useAlert();
    const { clientSideApi } = useAuthStore();
    const [state, dispatch] = useReducer(reducer, initState);
    const firebaseAuth = useFirebaseAuth();

    // 인증번호 요청
    const requestAuth = async () => {
        console.log(state.phoneNumber);
        const registerCallBack = (result: boolean) => {
            if (result) {
                alertOn({
                    title: "핸드폰 번호 인증",
                    message: "인증번호를 성공적으로 발송했습니다",
                    type: "POSITIVE",
                });
            } else {
                alertOn({
                    title: "핸드폰 번호 인증오류",
                    message: "인증번호 발송에 실패하였습니다\n번호를 알맞게 입력했는지 확인 해 주세요",
                    type: "ERROR",
                });
            }
            dispatch({ type: "SET_SMS_STATE", data: "IDLE" });
        };

        if (props.isRegister) {
            const res = await clientSideApi("GET", "MAIN", "USER_CHECK", undefined, {
                phone_num: state.phoneNumber,
            });
            if (res.result === "SUCCESS") {
                dispatch({ type: "SET_SMS_STATE", data: "LOAD" });
                firebaseAuth.phoneNumberAuth(state.phoneNumber, registerCallBack);
            } else {
                alertOn({
                    title: "",
                    // @ts-ignore
                    message: res.msg,
                    type: "ERROR",
                });
            }
        } else {
            const res = await clientSideApi("GET", "MAIN", "USER_CHECK", undefined, {
                phone_num: state.phoneNumber,
            });
            if (res.result === "SUCCESS") {
                alertOn({
                    title: "",
                    message: "해당 유저는 존재하지 않습니다\n전화번호를 다시 입력해주세요",
                    type: "ERROR",
                });
            } else {
                dispatch({ type: "SET_SMS_STATE", data: "LOAD" });
                firebaseAuth.phoneNumberAuth(state.phoneNumber, registerCallBack);
            }
        }
    };

    // 인증번호 확인
    const checkAuthNumber = () => {
        const successCheck = () => dispatch({ type: "SET_AUTH_STATE", data: true });
        const failCheck = () => dispatch({ type: "SET_AUTHCODE", data: "" });
        // @ts-ignore
        try {
            // @ts-ignore
            window.confirmationResult
                .confirm(state.authCode)
                .then((result) => {
                    // @ts-ignore
                    alertOn({
                        title: "핸드폰 번호 인증",
                        message: "인증이 완료되었습니다",
                        type: "POSITIVE",
                    });
                    successCheck();
                })
                .catch((error) => {
                    failCheck();
                    firebaseAuth.firebaseError(error.code);
                });
        } catch (error) {
            failCheck();
            firebaseAuth.firebaseError(error.code);
        } finally {
        }
    };
    const changePhoneNumber = () => {
        // @ts-ignore
        window.confirmationResult = null;
        dispatch({ type: "SET_INIT" });
    };

    useEffect(() => {
        props.onAuthStateCallBack(state.authState ? state.phoneNumber : null);
    }, [state.authState]);

    if (state.authState) {
        return (
            <>
                <Typo type={"TEXT"} size={"small"} content={"인증 완료"} color={"mint_accent"} />
                <div className={props.innerContainerClassName}>
                    <TextInput
                        // @ts-ignore
                        className={props.inputClassName}
                        value={state.phoneNumber}
                        type={"text"}
                        form={"box"}
                        disable
                    />
                    <Button
                        type={"SQUARE"}
                        size={"free"}
                        fontSize={"smaller"}
                        content={"번호 변경"}
                        className={props.buttonClassName}
                        onClick={changePhoneNumber}
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className={props.innerContainerClassName}>
                    <TextInput
                        // @ts-ignore
                        className={props.inputClassName}
                        value={state.phoneNumber}
                        onChange={(e) => dispatch({ type: "SET_PHONENUM", data: e.target.value })}
                        type={"text"}
                        form={"box"}
                        placeholder={"휴대폰 번호"}
                    />
                    {state.smsState !== "LOAD" ? (
                        <Button
                            type={"SQUARE"}
                            size={"free"}
                            fontSize={"smaller"}
                            content={"본인 인증"}
                            className={props.buttonClassName}
                            onClick={requestAuth}
                        />
                    ) : (
                        <CircularProgress />
                    )}
                </div>

                <div className={props.innerContainerClassName}>
                    <TextInput
                        // @ts-ignore
                        value={state.authCode}
                        onChange={(e) => dispatch({ type: "SET_AUTHCODE", data: e.target.value })}
                        className={props.inputClassName}
                        type={"text"}
                        form={"box"}
                        placeholder={"인증 번호"}
                    />
                    {state.smsState !== "LOAD" ? (
                        <Button
                            type={"SQUARE"}
                            size={"free"}
                            fontSize={"smaller"}
                            content={"인증 확인"}
                            className={props.buttonClassName}
                            onClick={checkAuthNumber}
                        />
                    ) : (
                        <CircularProgress />
                    )}
                </div>
            </>
        );
    }
};

export default PhoneAuth;
