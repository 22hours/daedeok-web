import React, { useState, useEffect } from "react";
import style from "./PwChangeTab.module.scss";
import PhoneAuth from "components/molecule/PhoneAuth";
import Typo from "@ui/Typo";
import TextInput from "@ui/input/TextInput";
import useInput from "lib/hooks/useInput";
import Button from "@ui/buttons/Button";
import PageHeader from "@ui/PageHeader";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import PasswordController from "lib/client/passwordController";
import { useAlert } from "store/GlobalAlertStore";
type PhoneAuthTabProps = {
    onAuthStateCallBack: (authState: string | null) => void;
};
const PhoneAuthTab = (props: PhoneAuthTabProps) => {
    return (
        <div>
            <PhoneAuth
                innerContainerClassName={style.phone_num_row}
                inputClassName={style.register_form}
                buttonClassName={style.register_button}
                onAuthStateCallBack={props.onAuthStateCallBack}
            />
            <Typo
                type={"TEXT"}
                size={"smaller"}
                content={"비밀번호 변경을 위해선 본인인증이 필요합니다"}
                color={"gray_accent"}
            />
        </div>
    );
};

type FormGroupTabProps = {
    submitPwChange: (newPassword: String) => void;
};
const FormGroupTab = (props: FormGroupTabProps) => {
    const { alertOn } = useAlert();
    const pw = useInput();
    const rePw = useInput();

    const handleSubmit = () => {
        if (!PasswordController.checkPasswordValidate(pw.value, "password")) {
            alertOn({
                title: "",
                message: "비밀번호는 8자 이상, 15자 이하로 구성해 주세요",
                type: "WARN",
            });
            return;
        }
        if (pw.value !== rePw.value) {
            alertOn({
                title: "",
                message: "비밀번호 확인이 다릅니다",
                type: "WARN",
            });
            return;
        }
        if (pw.value === rePw.value) {
            props.submitPwChange(pw.value);
            return;
        }
    };

    return (
        <div className={style.form_container}>
            <TextInput
                className={style.pw_form}
                {...pw}
                form={"box"}
                type={"password"}
                placeholder={"새로운 비밀번호 입력"}
            />
            <TextInput
                className={style.pw_form}
                {...rePw}
                form={"box"}
                type={"password"}
                placeholder={"비밀번호 재 입력"}
            />
            <Button
                className={style.pw_submit}
                type={"ROUND"}
                size={"medium"}
                fontSize={"small"}
                content={"완료"}
                backgroundColor={"mint_accent"}
                color={"white"}
                onClick={handleSubmit}
            />
        </div>
    );
};

const PwChangeTab = () => {
    const router = useRouter();
    const { auth, clientSideApi } = useAuthStore();
    const [isCertified, setIsCertified] = useState<string | null>(null);
    const { alertOn, apiErrorAlert } = useAlert();
    const onAuthStateCallBack = (authState: string | null) => {
        setIsCertified(authState);
    };

    useEffect(() => {
        router.beforePopState(() => {
            setIsCertified(null);
            return true;
        });
    });

    const submitPwChange = async (newPassword: String) => {
        const res = await clientSideApi("PUT", "MAIN", "USER_PASSWORD_RESET", undefined, {
            phone_num: isCertified,
            password: PasswordController.hashPassword(newPassword.toString()),
        });
        if (res.result === "SUCCESS") {
            alertOn({
                title: "",
                //@ts-ignore
                message: "비밀번호를 성공적으로 변경하였습니다",
                type: "POSITIVE",
            });
            router.replace("/");
        } else {
            apiErrorAlert(res.msg);
        }
    };

    const renderTab = () => {
        if (isCertified === null) {
            // PHONE AUTH
            return <PhoneAuthTab onAuthStateCallBack={onAuthStateCallBack} />;
        } else {
            // NOW
            return <FormGroupTab submitPwChange={submitPwChange} />;
        }
    };

    return (
        <div className={style.container}>
            <PageHeader title={"비밀번호 변경"} isUnderbar />
            <div className={style.body}> {renderTab()}</div>
        </div>
    );
};

export default PwChangeTab;
