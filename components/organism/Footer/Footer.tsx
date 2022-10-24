import React, { useState, useEffect } from "react";
import style from "./Footer.module.scss";
import Image from "next/image";
import FooterLogo from "public/assets/footer_logo.png";
import Typo from "@ui/Typo";
import Link from "next/link";

const Footer = () => {
  const footerAddress =
    "대전광역시 유성구 대덕대로 534 (도룡동 399-7) | TEL.042.861.3846";
  const footerCopyRight = "@DAEDEOK PRESBYTERIAN CHURCH. ALL RIGHTS RESERVED";
  const [mode, setMode] = useState<"pc" | "mobile">("pc");

  const setModeByWindowSize = () => {
    if (window.innerWidth > 775) {
      setMode("pc");
    } else {
      setMode("mobile");
    }
  };
  useEffect(() => {
    setModeByWindowSize();
    window.addEventListener("resize", setModeByWindowSize);
    return () => {
      window.removeEventListener("resize", setModeByWindowSize);
    };
  }, []);

  return (
    <>
      {mode === "pc" ? (
        <div className={style.footer}>
          <div></div>
          <div className={style.footer_main}>
            <div className={style.image_wrapper}>
              <Image src={FooterLogo} alt={FooterLogo.src}></Image>
            </div>
            <div className={style.footer_info}>
              <Typo
                type={"TEXT"}
                size={"smaller"}
                color={"white"}
                content={footerAddress}
              />
              <div className={style.space}></div>
              <Typo
                type={"TEXT"}
                size={"smaller"}
                color={"white"}
                content={footerCopyRight}
              />

              <div className={style.button_wrapper}>
                <Link href={"/docs/terms"} passHref>
                  <div className={style.button_box}>
                    <Typo
                      type="TEXT"
                      size="smaller"
                      color="white"
                      content="개인정보보호정책"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <div className={style.mobile_footer}>
          <div className={style.img_wrapper}>
            <div className={style.img_size}>
              <Image src={FooterLogo} alt={FooterLogo.src}></Image>
            </div>
          </div>
          <div className={style.center_wrapper}>
            <Typo
              className={style.font_size}
              type={"TEXT"}
              size={"smaller"}
              color={"white"}
              content={footerAddress}
            />
          </div>
          <div className={style.center_wrapper}>
            <Typo
              className={style.font_size}
              type={"TEXT"}
              size={"smaller"}
              color={"white"}
              content={footerCopyRight}
            />
          </div>

          <div className={style.button_wrapper}>
            <Link href={"/docs/terms"} passHref>
              <div className={style.button_box}>
                <Typo
                  type="TEXT"
                  size="smaller"
                  color="white"
                  content="개인정보보호정책"
                />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
