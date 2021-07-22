type Props = {};

const JoinDetail = () => {
    return (
        <div>
            <h2>[...episode_id]</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    return {
        props: {},
    };
}
export default JoinDetail;
