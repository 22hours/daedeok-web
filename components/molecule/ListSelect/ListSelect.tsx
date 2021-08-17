import { meta_types } from "@global_types";
import Select from "@ui/input/Select";
import useCategory from "lib/hooks/useCategory";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./ListSelect.module.scss";
type Props = {
    categoryType: meta_types.Category;
    className?: string;
};

const ListSelect = (props: Props) => {
    const { state, changeCategory } = useListCommonStore();
    const { categoryOptionList } = useCategory(props.categoryType);
    return (
        <Select
            value={state.category || "ALL"}
            onChange={(e) => {
                changeCategory(e.target.value);
            }}
            form="box"
            placeholder={"카테고리별 보기"}
            option_list={[{ name: "전체", value: "ALL" }].concat(categoryOptionList)}
            className={`${style.select} ${style.className || ""}`}
        />
    );
};

export default ListSelect;
