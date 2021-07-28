import Typo from "components/ui/Typo";

const TypoPage = () => {
    return (
        <>
            <div style={{ marginBottom: "30px" }}>
                <div style={{ fontSize: "20px", fontFamily: "SCDream8", color: "#29b4aa" }}>COLOR</div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ color: "#494137", fontFamily: "SCDream6" }}>brown_base</div>
                    <div style={{ color: "#493741", fontFamily: "SCDream6" }}>brown_font</div>
                    <div style={{ color: "#29b4aa", fontFamily: "SCDream6" }}>mint_accent</div>
                    <div style={{ color: "#fbb800", fontFamily: "SCDream6" }}>yellow_accent</div>
                    <div style={{ color: "#a65341", fontFamily: "SCDream6" }}>red_accent</div>
                    <div style={{ color: "#8c8c8b", fontFamily: "SCDream6" }}>gray_accent</div>
                    <div style={{ color: "#f5f5f5", fontFamily: "SCDream6", backgroundColor: "black" }}>
                        light_accent
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "30px" }}>
                <div style={{ fontSize: "20px", fontFamily: "SCDream8", color: "#29b4aa" }}>BUTTON</div>

                <Typo type={"BUTTON"} size={"huge"} color={"brown_font"} content={"대덕바이블아카데미 huge"} />
                <br />
                <Typo type={"BUTTON"} size={"large"} color={"brown_font"} content={"대덕바이블아카데미 large"} />
                <br />
                <Typo type={"BUTTON"} size={"medium"} color={"brown_font"} content={"대덕바이블아카데미 medium"} />
                <br />
                <Typo type={"BUTTON"} size={"small"} color={"brown_font"} content={"대덕바이블아카데미 small"} />
                <br />
                <Typo type={"BUTTON"} size={"smaller"} color={"brown_font"} content={"대덕바이블아카데미 small"} />
            </div>
            <div>
                <div style={{ fontSize: "20px", fontFamily: "SCDream8", color: "#29b4aa", marginBottom: "-25px" }}>
                    HEADER
                </div>

                <Typo type={"HEADER"} size={"h1"} color={"brown_font"} content={"대덕바이블아카데미 h1"} />

                <Typo type={"HEADER"} size={"h2"} color={"brown_font"} content={"대덕바이블아카데미 h2"} />

                <Typo type={"HEADER"} size={"h3"} color={"brown_font"} content={"대덕바이블아카데미 h3"} />
            </div>
            <div>
                <div style={{ fontSize: "20px", fontFamily: "SCDream8", color: "#29b4aa", marginBottom: "-20px" }}>
                    TEXT
                </div>
                <Typo type={"TEXT"} size={"large"} color={"brown_font"} content={"대덕바이블아카데미 large"} />
                <Typo type={"TEXT"} size={"medium"} color={"brown_font"} content={"대덕바이블아카데미 medium"} />
                <Typo type={"TEXT"} size={"small"} color={"brown_font"} content={"대덕바이블아카데미 small"} />
            </div>
        </>
    );
};

TypoPage.Layout = (page) => <div>{page}</div>;

export default TypoPage;
