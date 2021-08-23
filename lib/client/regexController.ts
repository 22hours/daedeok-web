type RegexCondition = "NO_SPECIAL" | "NO_SPACE";

const pattern_light_special = /[\{\}\[\]\/<>$;:\\\\(\'\"]/gi;
const pattern_time = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm;
const pattern_special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
const pattern_space = /[\s]/g;

const check = (pattern: any, input: string) => {
    var nowInput = input.toString();
    return nowInput?.search(pattern) >= 0;
    // TRUE : Pattern Matched
    // FALSE : Pattern Not Matched
};

const checkTime = (dateString: string) => {
    var nowInput = dateString.toString();
    return nowInput?.search(pattern_time) >= 0;
};

const checkDate = (dateString: string) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
};

const isValidSingle = (regex: RegexCondition, value: string, inputName?: string): boolean => {
    switch (regex) {
        case "NO_SPACE": {
            if (check(pattern_space, value)) {
                return false;
            } else {
                return true;
            }
        }
        case "NO_SPECIAL": {
            if (check(pattern_special, value)) {
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
    minLength?: number,
    maxLength?: number,
    inputName?: string
): boolean => {
    var flag = true;
    regexConditionList.forEach((regex) => {
        if (!isValidSingle(regex, value, inputName)) {
            flag = false;
            return false;
        }
    });
    if (minLength) {
        if (value.length < minLength) return false;
    }
    if (maxLength) {
        if (value.length > maxLength) return false;
    }
    return flag;
};

const RegexController = {
    isValid,
    checkDate,
    checkTime,
};

export default RegexController;
