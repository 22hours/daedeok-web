import useInput from "lib/hooks/useInput";
import TextInput from "@ui/input/TextInput";
import TextArea from "@ui/input/TextArea";
import Select from "@ui/input/Select";
import CheckBox from "@ui/input/CheckBox";
import SearchBar from "@ui/input/SearchBar";
import FileInput from "@ui/input/FileInput";

import useBoolean from "lib/hooks/useBoolean";
import useFileInput from "lib/hooks/useFileInput";
import Typo from "@ui/Typo";
import { useEffect } from "react";

import AxiosClient from "lib/api/api";

type Props = {};

const PreviewBox = ({ children }) => {
    return (
        <div
            style={{
                padding: "30px",
                backgroundColor: "rgb(240,240,240)",
                border: "1px solid gray",
                marginBottom: "20px",
            }}
        >
            {children}
        </div>
    );
};

const Input = () => {
    const text = useInput();
    const number = useInput();
    const time = useInput();
    const pw = useInput("123123");
    const tf = useInput("");
    const date = useInput("");
    const select = useInput("");
    const bool = useBoolean();
    const search = useInput("");

    const coll = useBoolean(false);

    const file = useFileInput();
    const RenderList = [
        <>
            <Typo type={"HEADER"} size={"h2"} color={"brown_base"} content={"INPUT FILE"} />
            <FileInput accept={".hwp,.word,.docx,.pptx,.show"} {...file}>
                <button>FILE 추가하기</button>
            </FileInput>
        </>,
        <>
            <Typo type={"HEADER"} size={"h2"} color={"brown_base"} content={"SEARCH BAR"} />
            <SearchBar
                placeholder={"검색어를 입력하세요"}
                form={"box"}
                {...search}
                onEnterKeyDown={() => alert("HO")}
            />
        </>,
        <>
            <Typo type={"HEADER"} size={"h2"} color={"brown_base"} content={"SELECT"} />
            <Select
                form={"underline"}
                placeholder={"선택하세여"}
                option_list={[
                    { value: "1", name: "1" },
                    { value: "2", name: "2" },
                    { value: "3", name: "3" },
                ]}
                {...select}
            />
        </>,
        <>
            <Typo type={"HEADER"} size={"h2"} color={"brown_base"} content={"TEXT"} />
            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"disable text"} />
            <TextInput
                disable={true}
                type={"text"}
                form={"underline"}
                {...text}
                placeholder={"tEST PLACE HOLDER"}
                maxLength={10}
                success={true}
            />

            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"error text"} />
            <TextInput placeholder={"tEST PLACE HOLDER"} type={"number"} form={"underline"} {...number} error={true} />

            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"password"} />
            <TextInput type={"password"} form={"underline"} {...pw} />

            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"date"} />
            <TextInput type={"date"} form={"underline"} {...date} />

            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"time"} />
            <TextInput type={"time"} form={"box"} {...time} />

            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"textarea"} />
            <TextArea placeholder={"tEST PLACE HOLDER"} {...tf} />

            <Typo type={"TEXT"} size={"medium"} color={"brown_base"} content={"checkbox"} />
            <CheckBox labelContent={"체크박스 테스트"} {...bool} />
        </>,
    ];

    return (
        <div>
            {RenderList.map((it, idx) => (
                <PreviewBox key={idx}>{it}</PreviewBox>
            ))}
        </div>
    );
};

Input.Layout = (page: any) => <div style={{ padding: "10px" }}>{page}</div>;

export default Input;
