import React, { useEffect, useRef, useState } from "react";
import style from "./RegisterFormGroup.module.scss";
import TextInput from "@ui/input/TextInput";
import PageHeader from "@ui/PageHeader";
import { FirebaseProvider } from "store/FirebaseStore";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import Select from "@ui/input/Select";
import CheckBox from "@ui/input/CheckBox";
import dynamic from "next/dynamic";
import useInput from "lib/hooks/useInput";
import useBoolean from "lib/hooks/useBoolean";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import useDivision from "lib/hooks/useDivision";
import PasswordController from "lib/client/passwordController";
import { useGlobalLoader } from "store/GlobalLoader";

const PhoneAuth = dynamic(import("components/molecule/PhoneAuth"));

type SectionProps = {
    helpText?: string;
    children: JSX.Element | JSX.Element[];
};
const InputSection = (props: SectionProps) => {
    return (
        <div className={style.InputSection}>
            <div className={style.section_body}>{props.children}</div>
            {props.helpText && <Typo type={"TEXT"} size={"smaller"} color={"gray_accent"} content={props.helpText} />}
        </div>
    );
};

const DivisionInput = ({ firstDivision, secondDivision }) => {
    const { clientSideApi } = useAuthStore();
    type DivisionItem = { first_division: string; second_division: string[] };

    const { firstDivisionOptionList, secondDivisionOptionList } = useDivision(firstDivision, secondDivision);

    return (
        <InputSection>
            <div className={style.select_row}>
                <Select
                    {...firstDivision}
                    className={style.register_form}
                    form={"box"}
                    option_list={firstDivisionOptionList()}
                    placeholder={"상위 소속 선택"}
                />
                <Select
                    {...secondDivision}
                    className={style.register_form}
                    form={"box"}
                    option_list={secondDivisionOptionList()}
                    placeholder={"하위 소속 선택"}
                />
            </div>
        </InputSection>
    );
};

type Props = {};

const RegisterFormGroup = () => {
    const router = useRouter();
    const { clientSideApi } = useAuthStore();
    const globalLoader = useGlobalLoader();
    const [auth, setAuth] = useState<string | null>(null);
    const onAuthStateCallBack = (authState: string | null) => {
        setAuth(authState);
    };

    const name = useInput();
    const password = useInput();
    const rePassword = useInput();
    const duty = useInput();
    const firstDivision = useInput();
    const secondDivision = useInput();
    const terms = useBoolean();
    const privacy = useBoolean();

    const checkPw = () => {};

    const handleSumbit = async () => {
        if (auth === null) {
            alert("핸드폰 인증을 먼저 완료해주세요");
            return;
        }
        if (name.value?.length < 1) {
            alert("이름을 입력해주세요");
            return;
        }
        if (password.value?.length < 1) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (rePassword.value?.length < 1) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (password.value !== rePassword.value) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }
        if (!PasswordController.checkPasswordValidate(password.value, auth)) {
            return;
        }
        if (duty.value === "") {
            alert("직분을 입력해주세요");
            return;
        }
        if (firstDivision.value === "") {
            alert("상위 소속을 입력해주세요");
            return;
        }
        // if (secondDivision.value === "") {
        //     alert("하위 소속을 입력해주세요");
        //     return;
        // }
        if (!terms.value) {
            alert("이용약관에 동의해주세요");
            return;
        }
        if (!privacy.value) {
            alert("개인정보 처리방침에 동의해주세요");
            return;
        }

        globalLoader.toggle();
        const res = await clientSideApi("POST", "MAIN", "USER_REGISTER", undefined, {
            phone_num: auth,
            name: name.value,
            password: password.value,
            duty: duty.value,
            first_division: firstDivision.value,
            second_division: secondDivision.value,
        });
        if (res.result === "SUCCESS") {
            globalLoader.setValue(false);

            alert("성공적으로 회원가입하였습니다\n확인을 누르시면 로그인페이지로 이동합니다");
            router.push("/login");
        } else {
            globalLoader.setValue(false);
            alert(res.msg);
        }
    };

    return (
        <FirebaseProvider>
            <div className={style.container}>
                <PageHeader title={"회원가입"} isUnderbar />

                <div>
                    <InputSection helpText={"휴대폰 번호는 로그인 아이디로 사용됩니다"}>
                        <PhoneAuth
                            innerContainerClassName={style.phone_num_row}
                            inputClassName={style.register_form}
                            buttonClassName={style.register_button}
                            onAuthStateCallBack={onAuthStateCallBack}
                            isRegister
                        />
                    </InputSection>
                    <InputSection>
                        <TextInput
                            {...name}
                            className={style.register_form}
                            type={"text"}
                            form={"box"}
                            placeholder={"이름"}
                        />
                    </InputSection>
                    <InputSection helpText={"비밀번호는 8자이상 영문/숫자를 조합하여 생성해주세요"}>
                        <div className={style.password_row}>
                            <TextInput
                                {...password}
                                className={style.register_form}
                                type={"password"}
                                form={"box"}
                                placeholder={"비밀번호"}
                            />
                            <TextInput
                                {...rePassword}
                                className={style.register_form}
                                type={"password"}
                                form={"box"}
                                placeholder={"비밀번호 확인"}
                            />
                        </div>
                    </InputSection>
                    <DivisionInput firstDivision={firstDivision} secondDivision={secondDivision} />
                    <InputSection>
                        <TextInput
                            {...duty}
                            className={style.register_form}
                            type={"text"}
                            form={"box"}
                            placeholder={"직분"}
                        />
                    </InputSection>

                    <InputSection>
                        <div className={style.agree_row}>
                            <CheckBox
                                {...terms}
                                className={style.register_form}
                                labelContent={"대덕바이블아카데미 이용약관 동의"}
                                isLabelRight
                            />
                            <CheckBox
                                {...privacy}
                                className={style.register_form}
                                labelContent={"개인정보 처리방침 동의"}
                                isLabelRight
                            />
                        </div>
                    </InputSection>
                    <div className={style.call_row}>
                        <Typo
                            type={"TEXT"}
                            size={"smaller"}
                            color={"gray_accent"}
                            content={"회원가입 문의사항 : 042-861-3846"}
                        />
                    </div>
                    <div className={style.submit_row}>
                        <Button
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"완료"}
                            backgroundColor={"mint_accent"}
                            color={"white"}
                            onClick={handleSumbit}
                        />
                    </div>
                </div>
            </div>
        </FirebaseProvider>
    );
};

export default RegisterFormGroup;
