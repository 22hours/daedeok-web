import { useState } from "react";

const useFileInput = (initialValue?: any, cb?: () => void, postDummy?: () => void) => {
    const [value, setValue] = useState<any>(initialValue || "");
    const onChange = async (e) => {
        const nowUploadFile = e.target.files[0];
        try {
            var bodyFormData = new FormData();
            bodyFormData.append("file_list", nowUploadFile);
        } catch {
            alert("이미지 등록에 실패했습니다. 다시 시도해주세요.");
        }
        setValue(e.target.value);
    };

    return { value, onChange };
};
export default useFileInput;
