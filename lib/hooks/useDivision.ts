import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

const useDivision = (firstDivision, secondDivision) => {
    type DivisionItem = { first_division: string; second_division: string[] };
    const { clientSideApi } = useAuthStore();
    const [optionList, setOptionList] = useState<DivisionItem[] | null>(null);
    const getOptionData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FIND_DIVISION");
        if (res.result === "SUCCESS") {
            setOptionList(res.data);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        getOptionData();
    }, []);

    useEffect(() => {
        if (secondDivision) {
            secondDivision.setValue("");
        }
    }, [firstDivision.value]);

    const firstDivisionOptionList = () =>
        optionList
            ? optionList.map((it) => {
                  const first_division = it.first_division;
                  return {
                      name: first_division,
                      value: first_division,
                  };
              })
            : [];

    const secondDivisionOptionList = () => {
        if (optionList) {
            const matchItem = optionList.find((it) => it.first_division === firstDivision.value)?.second_division;
            if (matchItem) {
                return matchItem.map((cur_item) => {
                    return {
                        name: cur_item,
                        value: cur_item,
                    };
                });
            } else {
                return [];
            }
        } else {
            return [];
        }
    };

    return {
        firstDivisionOptionList,
        secondDivisionOptionList,
    };
};
export default useDivision;
