import dynamic from "next/dynamic";

type Props = {};
const VideoClass = dynamic(import("components/organism/VideoClass/VideoClass"), {});
const YouTube = () => {
    return (
        <div>
            <h2>youtube</h2>
            <VideoClass />
        </div>
    );
};

YouTube.Layout = (page: any) => <div style={{ padding: "10px" }}>{page}</div>;

export default YouTube;
