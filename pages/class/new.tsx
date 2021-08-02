import ClassNew from "components/organism/ClassNew/ClassNew";

//store
import { ClassNewStoreProvider } from "store/ClassNewStore";

const NewClass = () => {
    return (
        <ClassNewStoreProvider>
            <ClassNew />
        </ClassNewStoreProvider>
    );
};

export default NewClass;
