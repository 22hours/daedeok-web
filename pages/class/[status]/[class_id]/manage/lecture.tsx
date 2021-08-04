import ClassEditor from "components/organism/ClassEditor/ClassEditor";

const LectureEditPage = () => {
    return (
        <>
            <ClassEditor type={"EDIT"} />
        </>
    );
};

const lecture = () => {
    return <LectureEditPage />;
};

export default lecture;
