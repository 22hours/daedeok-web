import style from "./PageHeader.module.scss";
import Typo from "@ui/Typo";
type Props = {
    title: string;
    isUnderbar?: boolean;
};

const PageHeader = (props: Props) => {
    const containerStyle = props.isUnderbar ? `${style.container} ${style.underbar_container}` : `${style.container}`;
    return (
        <div className={containerStyle}>
            <Typo type={"HEADER"} size={"h4"} content={props.title} />
        </div>
    );
};

export default PageHeader;
