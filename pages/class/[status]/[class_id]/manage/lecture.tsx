import { useEffect, useState } from "react";
import { class_types, res_types } from "@global_types";
import ClassEditor from "components/organism/ClassEditor/ClassEditor";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";

const Lecture = () => {
    const [data, setData] = useState<class_types.ClassInfo | null>(null);
    const { clientSideApi } = useAuthStore();
    const router = useRouter();
    const lectureId = router.asPath.split("/")[3];

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_DETAIL_UPDATE", lectureId);
        if (res.result === "SUCCESS") {
            const division_list: res_types.classDetail["division_list"] = [];
            res.data.division_list.forEach((division_raw_item) => {
                const cur_second_division_list: string[] = division_raw_item.second_division;
                cur_second_division_list.forEach((second_division_item) => {
                    division_list.push({
                        first_division: division_raw_item.first_division,
                        second_division: second_division_item,
                    });
                });
            });
            console.log(res.data);
            setData({ ...res.data, division_list: division_list });
        }
    };

    useEffect(() => {
        getData();
        console.log(data);
    }, []);

    if (data === null) {
        return (
            <div>
                <h2>LOADING</h2>
            </div>
        );
    } else {
        return (
            <div>
                <ClassEditor type={"EDIT"} data={data} />
            </div>
        );
    }
};

export default Lecture;
