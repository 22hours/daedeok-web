// import ClassNew from "components/organism/ClassNew/ClassNew";
import ClassEditor from "components/organism/ClassEditor/ClassEditor";

//store
// import { ClassNewStoreProvider } from "store/ClassNewStore";

const NewClass = () => {
    return (
        <ClassEditor type={"NEW"} />

        // <ClassNewStoreProvider>
        // {/* <ClassNew /> */}
        // </ClassNewStoreProvider>
    );
};

export default NewClass;
