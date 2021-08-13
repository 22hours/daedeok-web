import LectureList from "components/organism/LectureList/LectureList";
import { ListCommonProvider } from "store/ListCommonStore";

const StatusLectureList = (props) => {
    console.log(props);
    const { status } = props.data;

    switch (status) {
        //종료된 강의
        case "close": {
            return (
                <div>
                    <ListCommonProvider>
                        <LectureList status={"FINISH"} />
                    </ListCommonProvider>
                </div>
            );
        }
        case "open": {
            return (
                <ListCommonProvider>
                    <LectureList status={"OPEN"} />
                </ListCommonProvider>
            );
        }
        default:
            return <div>{"ERROR"}</div>;
    }
};

export async function getStaticProps({ params }) {
    console.log(params);
    return {
        props: {
            data: params,
        },
    };
}

export async function getStaticPaths() {
    const paths = [{ params: { status: "open" } }, { params: { status: "close" } }];
    return { paths, fallback: false };
}

export default StatusLectureList;
