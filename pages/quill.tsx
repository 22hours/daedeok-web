import dynamic from "next/dynamic";
type Props = {};

const QuillEditor = dynamic(() => import("components/organism/QuillEditor/QuillEditor"), { ssr: false });

const quill = (props: Props) => {
    return (
        <div>
            <QuillEditor />
        </div>
    );
};

export default quill;
