type Props = {};

const index = (props) => {
    const { status } = props.data;

    return (
        <div>
            <h2>index</h2>
            <h4>{props.data.status}</h4>
        </div>
    );
};
export async function getStaticProps({ params }) {
    return {
        props: {
            data: params,
        },
    };
}

export async function getStaticPaths() {
    const paths = [{ params: { status: "open" } }, { params: { status: "complete" } }, { params: { status: "close" } }];
    return { paths, fallback: false };
}
export default index;
