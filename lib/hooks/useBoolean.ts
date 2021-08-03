import { useState } from "react";

const useBoolean = (initialValue?: boolean) => {
    const [value, setValue] = useState<any>(initialValue || false);
    const onChange = (e) => {
        setValue(!value);
    };
    return { value, onChange };
};
export default useBoolean;
