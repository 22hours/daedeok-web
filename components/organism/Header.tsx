import Typo from "@ui/Typo";
import DropdownButton from "@ui/buttons/DropdownButton";
import styles from "./Header.module.scss";

const Header = () => {
    const acinfoItem = [
        { text: "대덕바이블아카데미 소개", url: "/acinfo/introduce" },
        { text: "교육 비전", url: "/acinfo/eduvision" },
        { text: "자주 묻는 질문", url: "/acinfo/faq" },
        { text: "질문과 답변", url: "/acinfo/qna" },
        { text: "공지사항", url: "/acinfo/notice" },
    ];
    const classItem = [
        { text: "현재 진행중인 강의", url: "/class/open" },
        { text: "종료된 강의", url: "/class/close" },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.header_wrapper}>
                <div className={`${styles.square} ${styles.small} ${styles.white}`}>
                    <Typo type={"BUTTON"} size={"smaller"} color={"brown_font"} content={"HOME"} />
                </div>
            </div>
            <DropdownButton
                mainText={"아카데미소개"}
                childButtonItem={acinfoItem}
                mainButtonSize={"small"}
                mainFontSize={"smaller"}
                mainBackgroundColor={"white"}
                mainTextColor={"brown_font"}
                childButtonSize={"small"}
                childFontSize={"smaller"}
                childTextColor={"white"}
            />
            <div className={styles.header_wrapper}>
                <div className={`${styles.square} ${styles.small} ${styles.white}`}>
                    <Typo type={"BUTTON"} size={"smaller"} color={"brown_font"} content={"강의 카테고리"} />
                </div>
            </div>
            <DropdownButton
                mainText={"개설된 강의안내"}
                childButtonItem={classItem}
                mainButtonSize={"small"}
                mainFontSize={"smaller"}
                mainBackgroundColor={"white"}
                mainTextColor={"brown_font"}
                childButtonSize={"small"}
                childFontSize={"smaller"}
                childTextColor={"white"}
            />
            <div className={styles.header_wrapper}>
                <div className={`${styles.square} ${styles.small} ${styles.white}`}>
                    <Typo type={"BUTTON"} size={"smaller"} color={"brown_font"} content={"강의실입장"} />
                </div>
            </div>
        </div>
    );
};
export default Header;
