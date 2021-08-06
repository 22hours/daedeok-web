import style from "./Footer.module.scss";
import Image from "next/image";
import FooterLogo from "public/assets/footer_logo.png";
import Typo from "@ui/Typo";
import Link from "next/link";

const Footer = () => {
    const footerAddress = "대전광역시 유성구 대덕대로 534 (도룡동 399-7) | TEL. 042.861.3846";
    const footerCopyRight = "@DAEDEOK PRESBYTERIAN CHURCH. ALL RIGHTS RESERVED";
    return (
        <div className={style.footer}>
            <div></div>
            <div className={style.footer_main}>
                <Image src={FooterLogo} alt={FooterLogo.src}></Image>
                <div className={style.footer_info}>
                    <Typo type={"TEXT"} size={"smaller"} color={"white"} content={footerAddress} />
                    <div className={style.space}></div>
                    <Typo type={"TEXT"} size={"smaller"} color={"white"} content={footerCopyRight} />
                    <div className={style.button_wrapper}>
                        <Link href={"/docs/terms"} passHref>
                            <div className={style.button_box}>
                                <Typo type="TEXT" size="smaller" color="white" content="개인정보보호정책" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
};
export default Footer;
