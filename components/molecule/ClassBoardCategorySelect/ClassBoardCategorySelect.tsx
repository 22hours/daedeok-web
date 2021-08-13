import Select from "@ui/input/Select";
import useClassBoardCategory from "lib/hooks/useClassBoardCategory";
import style from "./ClassBoardCategorySelect.module.scss";
type Props = {
    category?: string;
    changeCategory: (string) => void;
    className?: string;
    form?: "underline" | "box";
};

const ClassBoardCategorySelect = (props: Props) => {
    const categoryOptionState = useClassBoardCategory();
    return (
        <Select
            value={props.category || "ALL"}
            onChange={(e) => {
                props.changeCategory(e.target.value);
            }}
            form={props.form || "box"}
            placeholder={"카테고리별 보기"}
            option_list={[{ name: "전체", value: "ALL" }].concat(categoryOptionState.categoryOptionList)}
            className={`${props.className || ""} ${style.select}`}
        />
    );
};

export default ClassBoardCategorySelect;
