import React, { useState } from "react";
import style from "./AdminMemberEdit.module.scss";
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
import { meta_types } from "@global_types";
import { useAlert } from "store/GlobalAlertStore";

const InputRow = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return <div className={style.InputRow}>{children}</div>;
};

const AdminMemberEdit = (props) => {
    const { memberData } = props;
    const { alertOn, apiErrorAlert } = useAlert();
    const { update, clientSideApi } = useAuthStore();
    const router = useRouter();
    const userId = router.asPath.split("/")[3];
    const name = useInput(memberData?.name);
    const duty = useInput(memberData?.duty);
    const phoneNum = useInput(memberData?.phone_num);
    const firstDivision = useInput(memberData?.first_division);
    const secondDivsion = useInput(memberData?.second_division);
    const DivisionOption = useDivision(firstDivision, secondDivsion);
    const dutyList = [
        { name: "성도", value: "성도" },
        { name: "집사", value: "집사" },
        { name: "권사", value: "권사" },
        { name: "장로", value: "장로" },
        { name: "전도사", value: "전도사" },
        { name: "목사", value: "목사" },
    ];

    useEffect(() => {
        if (memberData) {
            name.setValue(memberData.name);
            duty.setValue(memberData.duty);
            phoneNum.setValue(memberData.phone_num);
            firstDivision.setValue(memberData.first_division);
            secondDivsion.setValue(memberData.second_division);
        }
    }, [memberData]);

    const firstRef = useRef(true);
    useEffect(() => {
        if (firstDivision.value) {
            setTimeout(() => {
                if (memberData?.first_division === firstDivision.value) {
                    if (firstRef.current) {
                        secondDivsion.setValue(memberData?.second_division);
                        firstRef.current = false;
                    }
                }
            }, 100);
        }
    }, [firstDivision.value]);

    const updateMemberDetail = async () => {
        const res = await clientSideApi(
            "PUT",
            "MAIN",
            "ADMIN_UPDATE_MEMBER",
            { user_id: userId },
            {
                name: name.value,
                duty: duty.value,
                first_division: firstDivision.value,
                second_division: secondDivsion.value !== "" ? secondDivsion.value : undefined,
            }
        );
        if (res.result === "SUCCESS") {
            alertOn({
                title: "",
                //@ts-ignore
                message: "성공적으로 반영되었습니다",
                type: "POSITIVE",
            });
        } else {
            apiErrorAlert(res.msg);
        }
    };

    if (memberData) {
        return (
            <>
                <PageHeader title={"회원 정보 수정"} isUnderbar />
                <div className={style.header}>
                    <Typo
                        className={style.hello_text}
                        type={"HEADER"}
                        color={"red_accent"}
                        size={"h2"}
                        content={`${memberData?.name}`}
                    />
                </div>

                <div>
                    <InputRow>
                        <TextInput {...name} className={style.register_form} type={"text"} form={"box"} />
                    </InputRow>
                    <InputRow>
                        <TextInput {...phoneNum} className={style.register_form} type={"text"} form={"box"} disable />
                    </InputRow>
                    <InputRow>
                        <Select
                            {...duty}
                            className={style.register_form}
                            form={"box"}
                            option_list={dutyList}
                            placeholder={"직분"}
                        />
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
                                option_list={[{ name: "없음", value: "" }].concat(
                                    DivisionOption.secondDivisionOptionList()
                                )}
                                placeholder={"하위 소속"}
                            />
                        </div>
                    </InputRow>
                    <div className={style.btn_row}>
                        <Button
                            onClick={updateMemberDetail}
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"수정"}
                            backgroundColor={"mint_accent"}
                            color={"white"}
                            className={style.btn}
                        />
                    </div>
                </div>
            </>
        );
    } else {
        return <div></div>;
    }
};

export default AdminMemberEdit;
