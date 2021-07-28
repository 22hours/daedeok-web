import Button from "@ui/buttons/Button";
import CollapseButton from "@ui/buttons/CollapseButton";
import DropdownButton from "@ui/buttons/DropdownButton";

const Buttons = () => {
    const childItem = [
        { text: "대덕바이블아카데미 소개", url: "/acinfo/introduce" },
        { text: "교육 비전", url: "/acinfo/eduvision" },
        { text: "자주 묻는 질문", url: "/acinfo/faq" },
        { text: "질문과 답변", url: "/acinfo/qna" },
        { text: "공지사항", url: "/acinfo/notice" },
    ];
    return (
        <div>
            <h2>BUTTON</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <DropdownButton
                    mainText={"아카데미소개"}
                    childButtonItem={childItem}
                    mainButtonSize={"small"}
                    mainFontSize={"smaller"}
                    mainBackgroundColor={"white"}
                    mainTextColor={"brown_font"}
                    childButtonSize={"small"}
                    childFontSize={"smaller"}
                    childBackgroundColor={"brown_base"}
                    childTextColor={"white"}
                />
                <DropdownButton
                    mainText={"아카데미소개"}
                    childButtonItem={childItem}
                    mainButtonSize={"small"}
                    mainFontSize={"smaller"}
                    mainBackgroundColor={"white"}
                    mainTextColor={"brown_font"}
                    childButtonSize={"small"}
                    childFontSize={"smaller"}
                    childBackgroundColor={"brown_base"}
                    childTextColor={"white"}
                />
                <DropdownButton
                    mainText={"아카데미소개"}
                    childButtonItem={childItem}
                    mainButtonSize={"small"}
                    mainFontSize={"smaller"}
                    mainBackgroundColor={"white"}
                    mainTextColor={"brown_font"}
                    childButtonSize={"small"}
                    childFontSize={"smaller"}
                    childBackgroundColor={"brown_base"}
                    childTextColor={"white"}
                />
                <DropdownButton
                    mainText={"아카데미소개"}
                    childButtonItem={childItem}
                    mainButtonSize={"small"}
                    mainFontSize={"smaller"}
                    mainBackgroundColor={"white"}
                    mainTextColor={"brown_font"}
                    childButtonSize={"small"}
                    childFontSize={"smaller"}
                    childBackgroundColor={"brown_base"}
                    childTextColor={"white"}
                />
                <DropdownButton
                    mainText={"아카데미소개"}
                    childButtonItem={childItem}
                    mainButtonSize={"small"}
                    mainFontSize={"smaller"}
                    mainBackgroundColor={"white"}
                    mainTextColor={"brown_font"}
                    childButtonSize={"small"}
                    childFontSize={"smaller"}
                    childBackgroundColor={"brown_base"}
                    childTextColor={"white"}
                />
            </div>
        </div>
    );
};
Buttons.Layout = (page) => <div>{page}</div>;
export default Buttons;
