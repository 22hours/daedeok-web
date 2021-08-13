import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

const useClassBoardCategory = () => {
    const [categoryOptionList, setCategoryOptionList] = useState<{ name: string; value: string }[]>([]);
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_FIND_CLASS_BOARD", undefined);
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
        getData();
    }, []);
    return { categoryOptionList, setCategoryOptionList };
};
export default useClassBoardCategory;
