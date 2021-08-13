import Typo from "@ui/Typo";
import Link from "next/link";
import React from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./Userbox.module.scss";
type Props = {
    className?: string;
};

const Userbox = (props: Props) => {
    const { auth } = useAuthStore();

    if (auth === null) {
        return <div></div>;
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
            </div>
        );
    }
};

export default Userbox;
