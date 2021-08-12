import Select from "@ui/input/Select";
import useClassCategory from "lib/hooks/useClassCategory";
import { useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./ClassCategorySelect.module.scss";
type Props = {
    category?: string;
    changeCategory: (string) => void;
    className?: string;
};

const ClassCategorySelect = (props: Props) => {
    const categoryOptionState = useClassCategory();
    return (
        <Select
            value={props.category || "ALL"}
            onChange={(e) => {
                props.changeCategory(e.target.value);
            }}
            form="box"
            placeholder={"카테고리별 보기"}
            option_list={[{ name: "전체", value: "ALL" }].concat(categoryOptionState.categoryOptionList)}
            className={`${props.className || ""} ${style.select}`}
        />
    );
};

export default ClassCategorySelect;