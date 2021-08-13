import Select from "@ui/input/Select";
import useClassCategory from "lib/hooks/useClassCategory";
import style from "./ClassCategorySelect.module.scss";
type Props = {
    category?: string;
    changeCategory: (string) => void;
    className?: string;
    form?: "underline" | "box";
};

const ClassCategorySelect = (props: Props) => {
    const categoryOptionState = useClassCategory();
    return (
        <Select
            value={props.category}
            onChange={(e) => {
                props.changeCategory(e.target.value);
            }}
            form={props.form || "box"}
            placeholder={"선택"}
            option_list={categoryOptionState.categoryOptionList}
            className={`${props.className || ""} ${style.select}`}
        />
    );
};

export default ClassCategorySelect;
