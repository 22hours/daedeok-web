type Props = {};

const ClassJoinDetail = () => {
    return (
        <div>
            <h2>[...class_id]</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return {
        props: {
            ...ctx.query.status,
        },
    };
}

export default ClassJoinDetail;
