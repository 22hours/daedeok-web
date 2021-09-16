import crypto from "crypto";
const checkPasswordValidate = (password: string, phone_num: string) => {
    if (password.length < 8 || password.length > 15) {
        return false;
    }
    // if (!/^[a-zA-Z0-9]{8,15}$/.test(password)) {
    //     return false;
    // }
    // var checkNumber = password.search(/[0-9]/g);
    // var checkEnglish = password.search(/[a-z]/gi);
    // if (checkNumber < 0 || checkEnglish < 0) {
    //     return false;
    // }

    // if (/(\w)\1\1\1/.test(password)) {
    //     alert("동일한 문자를 4번 이상 사용하실 수 없습니다.");
    //     return false;
    // }

    // if (password.search(phone_num) > -1) {
    //     alert("비밀번호에 전화번호 또는 유추하기 쉬운 단어가 포함되었습니다.");
    //     return false;
    // }

    return true;
};

const hashPassword = (password: string) => {
    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
    return hashPassword;
};

const PasswordController = {
    checkPasswordValidate,
    hashPassword,
};

export default PasswordController;
