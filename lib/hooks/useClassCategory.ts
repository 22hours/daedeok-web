import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

type optionItem = { value: string; name: string };
const useClassCategory = () => {
    const [categoryOptionList, setCategoryOptionList] = useState<optionItem[]>([]);

    const { clientSideApi } = useAuthStore();

    const getCategoryData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_FIND_ALL");
        if (res.result === "SUCCESS") {
            setCategoryOptionList(
                res.data.map((it) => {
                    return {
                        value: it.category,
                        name: it.category,
                    };
                })
            );
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        getCategoryData();
    }, []);

    return { categoryOptionList, setCategoryOptionList };
};
export default useClassCategory;
