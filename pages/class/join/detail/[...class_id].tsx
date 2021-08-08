import ClassJoinDetailList from "components/organism/ClassJoinDetailList/ClassJoinDetailList";

type Props = {};

const ClassJoinDetail = (props) => {
    return <ClassJoinDetailList classId={props.class_id} />;
};

export async function getServerSideProps(ctx) {
    const { class_id } = ctx.query;
    return {
        props: {
            class_id: class_id,
        },
    };
}

export default ClassJoinDetail;
