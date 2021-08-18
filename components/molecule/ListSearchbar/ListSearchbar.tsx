import SearchBar from "@ui/input/SearchBar";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./ListSearchbar.module.scss";
type Props = {};

const ListSearchbar = (props: Props) => {
    const { state, changeKeyword } = useListCommonStore();
    return (
        <SearchBar
            initialValue={state.keyword}
            className={style.search}
            form="box"
            placeholder={"검색어를 입력하세요"}
            onEnterKeyDown={(e) => changeKeyword(e.target.value)}
        />
    );
};

export default ListSearchbar;
