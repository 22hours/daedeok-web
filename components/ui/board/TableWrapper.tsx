import style from "./TableWrapper.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    category?: boolean;
    memberCategory?: boolean;
};

const TableWrapper = (props: Props) => {
    const { children, category, memberCategory } = props;
    return (
        <div>
            <div className={style.top_border}></div>
            {category && <div>카테고리</div>}
            {memberCategory && (
                <div>
                    <div>상위대상</div>
                    <div>하위대상</div>
                    <div>관리</div>
                </div>
            )}
            {children}
        </div>
    );
};
export default TableWrapper;
