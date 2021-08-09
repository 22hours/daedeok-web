import { ListCommonProvider } from "store/ListCommonStore";
import TutorNoticeList from "components/organism/TutorNoticeList/TutorNoticeList";

type Props = {};

const ClassNotice = () => {
    return (
        <ListCommonProvider>
            <div>
                <TutorNoticeList />
            </div>
        </ListCommonProvider>
    );
};

export default ClassNotice;
