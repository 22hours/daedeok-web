import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";
import { useAuthStore } from "store/AuthStore";
import { meta_types } from "@global_types";
import { useRouter } from "next/router";
import Typo from "@ui/Typo";
type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Login = () => {
    const { auth, login, logout, clientSideApi } = useAuthStore();
    const router = useRouter();
    const agent = useAgent();

    useEffect(() => {
        // @ts-ignore
        const require_role: meta_types.accessRole | undefined = router.query.require_role;
        if (require_role) {
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
    }, []);

    const doLogin = (role: meta_types.user["role"]) => {
        login({
            user_id: "winterlood",
            name: "이정환",
            role: role,
            duty: "개발자",
            lecture_num: 3,
            access_token: "123k213j12kl3j1l2k",
            refresh_token: "refreferefer",
        });
    };

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <>
                <h2>Login</h2>

                {!auth && (
                    <>
                        <button onClick={() => doLogin("ROLE_TUTOR")}>강사로그인</button>
                        <button onClick={() => doLogin("ROLE_MEMBER")}>멤버로그인</button>
                        <button onClick={() => doLogin("ROLE_ADMIN")}>관리자로그인</button>
                    </>
                )}
                {auth && (
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
                            <Typo
                                type={"TEXT"}
                                size={"medium"}
                                color={"brown_base"}
                                content={auth?.lecture_num.toString()}
                            />
                        </div>
                        <button onClick={() => logout()}>LOGOUT</button>
                    </div>
                )}
            </>
        </GlobalLayout>
    );
};

Login.Layout = (page: any) => <>{page}</>;

export default Login;
