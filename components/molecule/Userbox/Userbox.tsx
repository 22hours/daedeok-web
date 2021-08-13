import { Style } from "@material-ui/icons";
import Button from "@ui/buttons/Button";
import CheckBox from "@ui/input/CheckBox";
import TextInput from "@ui/input/TextInput";
import Typo from "@ui/Typo";
import useBoolean from "lib/hooks/useBoolean";
import useInput from "lib/hooks/useInput";
import Link from "next/link";
import React from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./Userbox.module.scss";
type Props = {
    className?: string;
};

const Userbox = (props: Props) => {
    const { auth, login, logout, clientSideApi } = useAuthStore();

    const phone_num = useInput();
    const pw = useInput();
    const rememberUser = useBoolean();

    const handleLogin = async () => {
        const res = await clientSideApi("POST", "MAIN", "USER_LOGIN", undefined, {
            id: phone_num.value,
            password: pw.value,
        });
        if (res.result === "SUCCESS") {
            phone_num.setValue("");
            pw.setValue("");
            login(res.data);
        } else {
            alert(res.msg);
        }
        pw.setValue("");
    };

    if (auth === null) {
        return (
            <div className={`${style.not_login_container} ${props.className || ""}`}>
                <div className={style.head}>
                    <Typo type={"TEXT"} size={"large"} content={"LOG IN"} className={style.login_text} />
                </div>
                <div className={style.login_row}>
                    <div className={style.input_col}>
                        <TextInput
                            className={style.input}
                            {...phone_num}
                            type={"text"}
                            form={"box"}
                            placeholder={"아이디"}
                        />
                        <TextInput
                            className={style.input}
                            {...pw}
                            type={"text"}
                            form={"box"}
                            placeholder={"비밀번호"}
                        />
                    </div>
                    <Button
                        type={"SQUARE"}
                        size={"free"}
                        backgroundColor={"red_accent"}
                        content={"로그인"}
                        fontSize={"small"}
                        color={"white"}
                        onClick={handleLogin}
                    />
                </div>
                <div className={style.footer}>
                    <div className={style.remember_col}>
                        <CheckBox labelContent={"ID 저장"} {...rememberUser} />
                    </div>
                    <div className={style.link_col}>
                        <Link href={`/register`} passHref>
                            <div>
                                <Typo
                                    color={"gray_accent"}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"회원가입 >"}
                                    className={style.link_text}
                                />
                            </div>
                        </Link>
                        <Link href={`/pwchange`} passHref>
                            <div>
                                <Typo
                                    color={"gray_accent"}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"비밀번호찾기 >"}
                                    className={style.link_text}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        const role_kr = auth.role === "ROLE_ADMIN" ? "최고관리자" : auth.role === "ROLE_TUTOR" ? "강사" : "집사";
        const welcom_text = auth.role === "ROLE_ADMIN" ? "님 반갑습니다" : `${auth.duty}님 반갑습니다`;
        return (
            <div className={`${style.container} ${props.className || ""}`}>
                <div className={style.head}>
                    <Typo type={"TEXT"} size={"large"} content={auth.name} className={style.user} />
                    &nbsp; &nbsp;
                    <Typo type={"TEXT"} size={"normal"} content={welcom_text} className={style.wellcome} />
                </div>
                <div>
                    <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={role_kr} />
                </div>
                <div className={style.bottom}>
                    {auth.role !== "ROLE_ADMIN" && (
                        <>
                            <Typo
                                type={"TEXT"}
                                size={"small"}
                                content={`${auth.role === "ROLE_TUTOR" ? "진행중인" : "수강중인"} 강의`}
                            />
                            &nbsp;
                            <Typo type={"TEXT"} size={"small"} color={"mint_accent"} content={"3"} />
                        </>
                    )}
                </div>

                <div className={style.control_row}>
                    <Link href={"/mypage"}>
                        <div className={style.control_btn}>
                            <Typo
                                className={style.control_typo}
                                type={"TEXT"}
                                size={"small"}
                                content={`마이페이지 > `}
                            />
                        </div>
                    </Link>

                    <div className={style.control_btn} onClick={logout}>
                        <Typo className={style.control_typo} type={"TEXT"} size={"small"} content={`로그아웃 > `} />
                    </div>
                </div>
            </div>
        );
    }
};

export default Userbox;
