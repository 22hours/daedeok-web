type Props = {};

const index = () => {
    return (
        <div>
            <h2>CLASS MAIN</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    return {
        props: {},
    };
}

export default index;
