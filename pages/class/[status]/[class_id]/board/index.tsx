import TutorClassBoardList from "components/organism/TutorClassBoardList/TutorClassBoardList";
import { ListCommonProvider } from "store/ListCommonStore";

const index = () => {
    return (
        <div>
            <ListCommonProvider>
                <TutorClassBoardList />
            </ListCommonProvider>
        </div>
    );
};

export default index;
