import Typo from "@ui/Typo";
import AxiosClient from "lib/api/api";
import useAsync from "lib/hooks/useAsync";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";

type Props = {};

const LoginTestComponent = () => {
    const { auth, login, logout, clientSideApi } = useAuthStore();

    const CallClientSideApi = async () => {
        const data = await clientSideApi("POST", "MAIN", "TOTAL_NOTICE_FIND", "url_query", { params: 1 });
        if (data.result === "SUCCESS") {
            console.log(data);
        } else {
            console.log(data);
        }
    };

    const TestLoginCall = async () => {
        const res = await clientSideApi("POST", "MAIN", "TEST", undefined, undefined);
        if (res.result === "SUCCESS") {
            const data = res.data;
            login({
                user_id: data.user_id,
                name: data.name,
                role: data.role,
                duty: data.duty,
                lecture_num: data.lecture_num,
                access_token: data.access_token,
                refresh_token: data.refresh_token,
            });
        } else {
        }
    };

    const TestApiCall = async () => {
        const res = await clientSideApi("POST", "MAIN", "TEST2", undefined, {});
        if (res.result === "SUCCESS") {
            console.log(res);
        } else {
            console.log(res);
        }
    };

    useEffect(() => {
        if (auth) {
            // CallClientSideApi();
        }
    }, [auth]);

    return (
        <>
            {auth ? (
                <>
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
                </>
            ) : (
                <button
                    onClick={() => {
                        login({
                            user_id: "test_user",
                            name: "이정환",
                            role: "ROLE_MEMBER",
                            duty: "개발자",
                            lecture_num: 3,
                            access_token: "test_access_token",
                            refresh_token: "test_refresh_token",
                        });
                    }}
                >
                    LOGIN !
                </button>
            )}

            {/* <button
                onClick={() => {
                    CallClientSideApi();
                }}
            >
                API CALL
            </button> */}

            <button onClick={() => TestLoginCall()}>LOGIN</button>
            <button onClick={() => TestApiCall()}>CALL TEST</button>
        </>
    );
};

const logintest = () => {
    return (
        <div>
            <h2>logintest</h2>
            <LoginTestComponent />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    // AxiosClient.serverSideApi("GET", "MAIN", "TOTAL_NOTICE_FIND", "test_query", { params: 1 });
    return {
        props: {
            ...ctx.query.status,
        },
    };
}

export default logintest;
