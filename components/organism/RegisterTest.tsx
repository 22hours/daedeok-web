import { useContext, useRef, useState } from "react";
import { FirebaseProvider, useFirebaseAuth } from "store/FirebaseStore";

const RegisterTest = () => {
    return (
        <FirebaseProvider>
            <RegisterTestInner />
        </FirebaseProvider>
    );
};

const RegisterTestInner = () => {
    const [isSuccess, setIsSuccess] = useState<"LOAD" | "SUCCESS" | "FAIL">("LOAD");
    const ref = useRef(null);
    const firebaseAuth = useFirebaseAuth();

    const registerCallBack = (result: boolean) => {
        setIsSuccess(result ? "SUCCESS" : "FAIL");
    };

    const register = async () => {
        setIsSuccess("LOAD");
        const callAuth = firebaseAuth.phoneNumberAuth(registerCallBack);
    };

    const checkRegister = () => {
        if (ref.current) {
            // @ts-ignore
            const authCode = ref.current.value;
            try {
                // @ts-ignore
                window.confirmationResult
                    .confirm(authCode)
                    .then((result) => {
                        alert("인증 완료");
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        firebaseAuth.firebaseError(error.code);
                    });
            } catch {}
        }
    };
    return (
        <div>
            <button onClick={register}>휴대전화번호 인증하기</button>
            <div>
                <input ref={ref} type="text" placeholder={"인증번호6자리"} />
                <button onClick={checkRegister}>인증하기</button>
            </div>
            {isSuccess === "LOAD" && <div>LOAD</div>}
            {isSuccess === "FAIL" && <div>FAIL</div>}
            {isSuccess === "SUCCESS" && <div>SUCCESS</div>}
        </div>
    );
};

export default RegisterTest;
