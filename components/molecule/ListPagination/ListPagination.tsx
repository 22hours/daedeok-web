import Pagination from "@ui/pagination/Pagination";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./ListPagination.module.scss";
type Props = {
    total_count: number;
    required_count: number;
};

const ListPagination = (props: Props) => {
    const { state, changePage } = useListCommonStore();

    return (
        <Pagination
            totalCount={props.total_count}
            handleChange={(page: number) => changePage((page + 1).toString())}
            pageNum={state.page ? parseInt(state.page) - 1 : 0}
            requiredCount={props.required_count}
        />
    );
};

export default ListPagination;
