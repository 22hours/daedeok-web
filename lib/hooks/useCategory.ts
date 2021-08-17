import { api_config_type } from "@api_config_type";
import { meta_types } from "@global_types";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";

const useCategory = (type: meta_types.Category) => {
    const [categoryOptionList, setCategoryOptionList] = useState<{ name: string; value: string }[]>([]);
    const { clientSideApi } = useAuthStore();
    const getEp = (): api_config_type.api_params["ep"] => {
        switch (type) {
            case "CLASS": {
                return "CATEGORY_FIND_ALL";
            }
            case "CLASS_BOARD": {
                return "CATEGORY_FIND_CLASS_BOARD";
            }
            case "QNA": {
                return "CATEGORY_QNA";
            }
        }
    };
    const getData = async () => {
        const ep = getEp();
        if (ep) {
            const res = await clientSideApi("GET", "MAIN", ep, undefined);
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
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return { categoryOptionList, setCategoryOptionList };
};
export default useCategory;
