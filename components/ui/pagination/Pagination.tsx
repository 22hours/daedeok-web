import React from "react";
import Pagination from "@material-ui/lab/Pagination";

type Props = {
    totalCount: number;
    handleChange: any;
    pageNum: number;
    requiredCount: number;
};

const PaginationRounded = (props: Props) => {
    const { totalCount, handleChange, pageNum, requiredCount } = props;
    var nowPageNum = pageNum + 1;
    var pageCount = 0;
    if (totalCount % requiredCount === 0) {
        pageCount = totalCount / requiredCount;
    } else {
        pageCount = Math.floor(totalCount / requiredCount) + 1;
    }

    return (
        <div className="pagination_wrapper">
            <Pagination
                count={pageCount}
                shape="rounded"
                page={parseInt(nowPageNum.toString())}
                onChange={(_, page) => handleChange(page - 1)}
            />
        </div>
    );
};
export default PaginationRounded;
