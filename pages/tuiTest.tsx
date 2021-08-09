type Props = {};
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("components/molecule/TextEditor/TextEditor"), { ssr: false });

const tuiTest = () => {
    return (
        <div>
            <h2>tuiTest</h2>
            <TextEditor />
        </div>
    );
};

export default tuiTest;
