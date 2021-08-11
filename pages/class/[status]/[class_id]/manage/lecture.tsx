import { useEffect, useState } from "react";
import { class_types } from "@global_types";
import ClassEditor from "components/organism/ClassEditor/ClassEditor";
import { useAuthStore } from "store/AuthStore";

type Props = {};

const dummyData: class_types.ClassInfo = {
    title: "이것은 제목",
    content: "string",
    category: "카테고리",
    division_list: [
        { first_division: "땡땡부", second_division: "보보부" },
        { first_division: "땡땡부", second_division: "보보부" },
        { first_division: "땡땡부", second_division: "보보부" },
    ],
    student_limit: 0,
    reference: "string",
    handout_list: [{ name: "이정환.jpg", url: "https://www.naver.com" }],
    plan_list: [
        {
            type: "OFFLINE",
            week: "1",
            title: "1주차 강의",
            tutor: "이정환",
            location: "찬양대 연습실 3층",
            date: "2019-12-12",
            time: "19:12",
        },
        {
            type: "ONLINE",
            week: "1",
            title: "1주차 강의",
            tutor: "이정환",
            location: "찬양대 연습실 3층",
            date: "2019-12-12",
            time: "19:12",
            video_link: "https://videolink",
            introduce: "introduce",
        },
        {
            type: "ZOOM",
            week: "1",
            title: "1주차 강의",
            tutor: "이정환",
            location: "찬양대 연습실 3층",
            date: "2019-12-12",
            time: "19:12",
            zoom_link: "https://zoomlink",
        },
    ],
};

const Lecture = () => {
    const [data, setData] = useState<class_types.ClassInfo | null>(null);
    const { clientSideApi } = useAuthStore();

    const getData = async () => {
        // const res = await clientSideApi('GET','MAIN','')
        setData(dummyData);
    };

    useEffect(() => {
        getData();
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
