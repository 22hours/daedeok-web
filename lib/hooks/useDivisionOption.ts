import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

const useDivisionOption = () => {
    type DivisionItem = { first_division: string; second_division: string[] };
    const { clientSideApi } = useAuthStore();
    const [optionList, setOptionList] = useState<DivisionItem[] | null>(null);
    const getOptionData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FIND_DIVISION");
        if (res.result === "SUCCESS") {
            setOptionList([
                {
                    first_division: "고등부",
                    second_division: ["1학년", "2학년", "3학년"],
                },
                {
                    first_division: "소년부",
                    second_division: ["1학년", "2학년", "3학년"],
                },
            ]);
            // setOptionList(res.data);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        getOptionData();
    }, []);

    return {
        optionList,
        setOptionList,
    };
};
export default useDivisionOption;
