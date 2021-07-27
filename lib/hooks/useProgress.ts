import { useState } from "react";

const useProgress = (initialValue?: any, cb?: any) => {
    const [value, setValue] = useState<number>(initialValue || 1);

    return { value, setValue };
};
export default useProgress;
