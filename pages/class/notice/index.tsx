import { ListCommonProvider } from "store/ListCommonStore";

type Props = {};

const ClassNotice = () => {
    return (
        <ListCommonProvider>
            <div>
                <h2>ClassNotice</h2>
            </div>
        </ListCommonProvider>
    );
};

export default ClassNotice;
