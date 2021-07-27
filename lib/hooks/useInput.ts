import { useState } from "react";

const useInput = (initialValue?: any, cb?: any) => {
    const [value, setValue] = useState<any>(initialValue || "");
    const onChange = (e) => {
        setValue(e.target.value);
        if (cb) {
            cb(e.target.value);
        }
    };
    return { value, onChange };
};
export default useInput;
