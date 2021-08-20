import style from "./PageHeader.module.scss";
import Typo from "@ui/Typo";
import Head from "next/head";
type Props = {
    title: string;
    isUnderbar?: boolean;
};

const PageHeader = (props: Props) => {
    const containerStyle = props.isUnderbar ? `${style.container} ${style.underbar_container}` : `${style.container}`;
    return (
        <div className={containerStyle}>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Typo type={"HEADER"} size={"h4"} content={props.title} />
        </div>
    );
};

export default PageHeader;
