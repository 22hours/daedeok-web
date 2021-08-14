type RegexCondition = "NO_SPECIAL" | "NO_SPACE";

const pattern_light_special = /[\{\}\[\]\/<>$;:\\\\(\'\"]/gi;
const pattern_special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
const pattern_space = /[\s]/g;

const check = (pattern: any, input: string) => {
    var nowInput = input.toString();
    return nowInput?.search(pattern) >= 0;
    // TRUE : Pattern Matched
    // FALSE : Pattern Not Matched
};

const isValidSingle = (regex: RegexCondition, value: string, inputName?: string): boolean => {
    switch (regex) {
        case "NO_SPACE": {
            if (check(pattern_space, value)) {
                alert(`${inputName}에는 공백을 포함할 수 없습니다`);
                return false;
            } else {
                return true;
            }
        }
        case "NO_SPECIAL": {
            if (check(pattern_special, value)) {
                alert(`${inputName}에는 특수문자를 포함할 수 없습니다`);
                return false;
            } else {
                return true;
            }
        }
        default:
            return true;
    }
};
const isValid = (
    regexConditionList: RegexCondition[],
    value: string,
    inputName?: string,
    minLength?: number,
    maxLength?: number
): boolean => {
    var flag = true;
    regexConditionList.forEach((regex) => {
        if (!isValidSingle(regex, value, inputName)) {
            flag = false;
            return false;
        }
    });
    return flag;
};

const RegexController = () => {
    isValid;
};

export default RegexController;
