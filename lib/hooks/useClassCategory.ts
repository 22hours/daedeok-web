import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

const useClassCategory = () => {
    const [categoryOptionList, setCategoryOptionList] = useState<{ name: string; value: string }[]>([]);
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_FIND", undefined, {
            page: 0,
            required_count: 100000,
        });
        if (res.result === "SUCCESS") {
            // setCategoryOptionList(res.data.category_list);
            setCategoryOptionList([
                { name: "유아부", value: "유아부" },
                { name: "교육부", value: "교육부" },
            ]);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return { categoryOptionList, setCategoryOptionList };
};
export default useClassCategory;
