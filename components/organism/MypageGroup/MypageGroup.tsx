import style from "./MypageGroup.module.scss";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import PageHeader from "@ui/PageHeader";
import Typo from "@ui/Typo";
import TextInput from "@ui/input/TextInput";
import useInput from "lib/hooks/useInput";
import Select from "@ui/input/Select";
import Button from "@ui/buttons/Button";
import useDivision from "lib/hooks/useDivision";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { meta_types } from "@global_types";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
type Props = {};

const InputRow = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return <div className={style.InputRow}>{children}</div>;
};

const MypageGroup = () => {
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();
    const { auth, update, clientSideApi } = useAuthStore();
    const router = useRouter();
    const name = useInput(auth?.name);
    const duty = useInput(auth?.duty);
    const phoneNum = useInput(auth?.phone_num);
    const firstDivision = useInput(auth?.first_division);
    const secondDivsion = useInput(auth?.second_division);
    const DivisionOption = useDivision(firstDivision, secondDivsion);

    useEffect(() => {
        if (auth) {
            name.setValue(auth.name);
            duty.setValue(auth.duty);
            phoneNum.setValue(auth.phone_num);
            firstDivision.setValue(auth.first_division);
            secondDivsion.setValue(auth.second_division);
        }
    }, [auth]);

    const firstRef = useRef(true);
    useEffect(() => {
        if (firstDivision.value) {
            setTimeout(() => {
                if (auth?.first_division === firstDivision.value) {
                    if (firstRef.current) {
                        secondDivsion.setValue(auth?.second_division);
                        firstRef.current = false;
                    }
                }
            }, 100);
        }
    }, [firstDivision.value]);

    const updateMyPage = async () => {
        const res = await clientSideApi("PUT", "MAIN", "USER_UPDATE_INFO", undefined, {
            name: name.value,
            duty: duty.value,
            first_division: firstDivision.value,
            second_division: secondDivsion.value,
        });
        if (res.result === "SUCCESS") {
            alertOn({
                title: "",
                //@ts-ignore
                message: "성공적으로 반영되었습니다",
                type: "POSITIVE",
            });
            //@ts-ignore
            if (auth) {
                const updateReqObj: meta_types.user = {
                    ...auth,
                    name: name.value,
                    duty: duty.value,
                    first_division: firstDivision.value,
                    second_division: secondDivsion.value,
                };
                update(updateReqObj);
            }
        } else {
            apiErrorAlert(res.msg);
        }
    };

    const deleteMe = async () => {
        confirmOn({
            message: "정말로 회원탈퇴 하시겠습니까?\n회원 탈퇴시 회원님의 정보는 모두 삭제되며 되돌릴 수 없습니다",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "USER_DELETE");
                if (res.result === "SUCCESS") {
                    alertOn({
                        title: "",
                        //@ts-ignore
                        message: "회원 탈퇴 되었습니다\n확인을 누르시면 메인페이지로 이동합니다",
                        type: "POSITIVE",
                    });
                    router.replace("/logout");
                } else {
                    apiErrorAlert(res.msg);
                }
            },
        });
    };

    if (auth) {
        return (
            <>
                <PageHeader title={"마이페이지"} isUnderbar />
                <div className={style.header}>
                    <Typo
                        className={style.hello_text}
                        type={"HEADER"}
                        color={"red_accent"}
                        size={"h2"}
                        content={`${auth?.name} ${auth.duty}`}
                    />
                    <Typo className={style.hello_text} type={"HEADER"} size={"h2"} content={`님 환영합니다`} />
                    <div className={style.division_row}>
                        <Typo className={style.hello_text} type={"HEADER"} size={"h4"} content={auth.first_division} />
                        <Typo className={style.hello_text} type={"HEADER"} size={"h4"} content={" / "} />
                        <Typo className={style.hello_text} type={"HEADER"} size={"h4"} content={auth.second_division} />
                    </div>
                </div>

                <div>
                    <InputRow>
                        <TextInput {...name} className={style.register_form} type={"text"} form={"box"} />
                    </InputRow>
                    <InputRow>
                        <TextInput {...phoneNum} className={style.register_form} type={"text"} form={"box"} disable />
                    </InputRow>
                    <InputRow>
                        <TextInput {...duty} className={style.register_form} type={"text"} form={"box"} />
                    </InputRow>
                    <InputRow>
                        <div className={style.input_division_row}>
                            <Select
                                {...firstDivision}
                                className={style.register_form}
                                form={"box"}
                                option_list={DivisionOption.firstDivisionOptionList()}
                                placeholder={"상위 소속"}
                            />
                            <Select
                                {...secondDivsion}
                                className={style.register_form}
                                form={"box"}
                                option_list={DivisionOption.secondDivisionOptionList()}
                                placeholder={"하위 소속"}
                            />
                        </div>
                    </InputRow>
                    <div className={style.btn_row}>
                        <Link href={`/pwchange`} passHref>
                            <Button
                                type={"ROUND"}
                                size={"medium"}
                                fontSize={"small"}
                                content={"비밀번호 변경"}
                                line={"outline"}
                                className={style.btn}
                            />
                        </Link>
                        <Button
                            onClick={updateMyPage}
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"수정"}
                            backgroundColor={"mint_accent"}
                            color={"white"}
                            className={style.btn}
                        />
                    </div>
                    <div className={style.danger_btn_row}>
                        <Link href={"/logout"} passHref>
                            <Button
                                type={"ROUND"}
                                size={"medium"}
                                fontSize={"small"}
                                content={"로그아웃"}
                                backgroundColor={"brown_base"}
                                color={"white"}
                                className={style.btn}
                            />
                        </Link>

                        <Button
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"회원탈퇴"}
                            backgroundColor={"gray_accent"}
                            color={"white"}
                            className={style.btn}
                            onClick={deleteMe}
                        />
                    </div>
                </div>
            </>
        );
    } else {
        return <div></div>;
    }
};

export default MypageGroup;
