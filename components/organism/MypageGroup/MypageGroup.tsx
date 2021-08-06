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
import { useEffect } from "react";
type Props = {};

const InputRow = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return <div className={style.InputRow}>{children}</div>;
};

const MypageGroup = () => {
    const { auth } = useAuthStore();

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
                        <Button
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"비밀번호 변경"}
                            line={"outline"}
                            className={style.btn}
                        />
                        <Button
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
                        <Button
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"로그아웃"}
                            backgroundColor={"brown_base"}
                            color={"white"}
                            className={style.btn}
                        />
                        <Button
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"회원탈퇴"}
                            backgroundColor={"gray_accent"}
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

export default MypageGroup;
