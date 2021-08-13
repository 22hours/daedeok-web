import useInput from "lib/hooks/useInput";
import { useAuthStore } from "store/AuthStore";
import { meta_types } from "@global_types";
import { useRouter } from "next/router";
import Typo from "@ui/Typo";
import TextInput from "@ui/input/TextInput";
import Button from "@ui/buttons/Button";
import Link from "next/link";
import PageHeader from "@ui/PageHeader";
import style from "./LoginGroup.module.scss";
import { useEffect } from "react";
type Props = {};

const LoginGroup = (props: Props) => {
    const { auth, login, logout, clientSideApi } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // @ts-ignore
        const require_role: meta_types.accessRole | undefined = router.query.require_role;
        if (require_role) {
            console.log(require_role);
            switch (require_role) {
                case "ROLE_ADMIN": {
                    alert("관리자만 접근 가능합니다\n관리자 계정으로 로그인 해 주세요");
                    break;
                }
                case "ROLE_TUTOR": {
                    alert("강사만 접근 가능합니다강사 계정으로 로그인 해 주세요");
                    break;
                }
                case "ROLE_MEMBER": {
                    alert("수강생만 접근 가능합니다\n수강생 계정으로 로그인 해 주세요");
                    break;
                }
                case "ROLE_ALL": {
                    alert("로그인 후 이용가능합니다");
                    break;
                }
                default:
                    return;
            }
        }
    }, [router.query]);

    const idInput = useInput();
    const pwInput = useInput();
    const inputLogin = async () => {
        if (idInput.value.length <= 5) {
            alert("전화번호를 입력해주세요");
            return;
        }
        // if (pwInput.value.length < 8) {
        //     alert("비밀번호를 정확히 입력해주세요");
        //     return;
        // }
        const res = await clientSideApi("POST", "MAIN", "USER_LOGIN", undefined, {
            id: idInput.value,
            password: pwInput.value,
        });
        if (res.result === "SUCCESS") {
            login(res.data);
        } else {
            alert(res.msg);
        }
    };

    if (auth === null) {
        return (
            <div className={style.container}>
                <div className={style.form_container}>
                    <TextInput
                        className={style.form}
                        {...idInput}
                        type={"text"}
                        form={"box"}
                        placeholder={"아이디 (전화번호)"}
                    />
                    <TextInput
                        className={style.form}
                        {...pwInput}
                        type={"password"}
                        form={"box"}
                        placeholder={"비밀번호"}
                    />
                </div>
                <div className={style.control_row}>
                    <Button
                        className={style.btn}
                        onClick={inputLogin}
                        type={"ROUND"}
                        size={"free"}
                        fontSize={"small"}
                        content={"로그인"}
                        backgroundColor={"yellow_accent"}
                        color={"white"}
                    />
                    <Link href={`/pwchange`} passHref>
                        <Button
                            className={style.btn}
                            type={"ROUND"}
                            size={"free"}
                            fontSize={"small"}
                            content={"비밀번호 찾기"}
                            backgroundColor={"gray_accent"}
                            color={"white"}
                        />
                    </Link>
                </div>
                <div className={style.divider}></div>
                <div className={style.control_row}>
                    <Link href={`/register`} passHref>
                        <Button
                            className={style.btn}
                            type={"ROUND"}
                            size={"free"}
                            fontSize={"small"}
                            content={"회원가입"}
                            backgroundColor={"mint_accent"}
                            color={"white"}
                        />
                    </Link>
                </div>
                <div className={style.label_row}>
                    <Link href={`/`} passHref>
                        <Typo type={"TEXT"} size={"small"} content={"메인페이지로 가기 >"} color={"gray_accent"} />
                    </Link>
                </div>
            </div>
        );
    } else {
        router.replace("/");
        return (
            <div>
                <div>
                    <label>USER ID</label>
                    <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={auth?.user_id} />
                </div>
                <div>
                    <label>USER NAME</label>
                    <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={auth?.name} />
                </div>
                <div>
                    <label>USER ROLE</label>
                    <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={auth?.role} />
                </div>
                <div>
                    <label>USER DUTY</label>
                    <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={auth?.duty} />
                </div>
                <div>
                    <label>USER LECTURE NUM</label>
                    <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={auth?.lecture_num.toString()} />
                </div>
                <button onClick={() => logout()}>LOGOUT</button>
            </div>
        );
    }
};

export default LoginGroup;