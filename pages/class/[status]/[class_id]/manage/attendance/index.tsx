import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassStore } from "store/ClassStore";

type Props = {};

const Index = () => {
    const classState = useClassStore();
    useEffect(() => {
        classState.dispatch({
            type: "SET_BREADCRUMBS_LIST",
            data: [
                { name: "강의실 입장", link: "/class" },
                { name: "강의실 입장", link: "/class" },
            ],
        });
    }, []);
    return (
        <div>
            <h2>index</h2>
        </div>
    );
};

export default Index;
