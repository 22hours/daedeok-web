import TutorClassPlanList from "components/organism/TutorClassPlanList/TutorClassPlanList";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassStore } from "store/ClassStore";

type Props = {};

const Index = () => {
    const classState = useClassStore();
    useEffect(() => {
        classState.dispatch({
            type: "SET_CLASS_INFO",
            data: {
                breadCrumbList: [
                    { name: "강의실 입장", link: "/class" },
                    { name: "강의실 입장", link: "/class" },
                ],
                pageTitle: "출석관리",
            },
        });
    }, []);
    return (
        <div>
            <TutorClassPlanList />
        </div>
    );
};

export default Index;
