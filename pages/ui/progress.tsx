import ProgressBar from "@ui/ProgressBar";
import useProgress from "lib/hooks/useProgress";

const Progress = () => {
    const progress = useProgress();
    return (
        <div>
            <h2>progress</h2>
            <ProgressBar {...progress} />
        </div>
    );
};
Progress.Layout = (page: any) => <div style={{ padding: "10px" }}>{page}</div>;

export default Progress;
