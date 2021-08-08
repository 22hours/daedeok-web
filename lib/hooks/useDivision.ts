import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

const useDivision = (firstDivision, secondDivision) => {
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

    useEffect(() => {
        if (optionList) {
            console.log(
                optionList.map((it) => {
                    const first_division = it.first_division;
                    return {
                        name: first_division,
                        value: first_division,
                    };
                })
            );
            console.log();
        }
    }, [optionList]);

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
