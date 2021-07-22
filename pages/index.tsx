import React, { useState } from "react";
import Head from "next/head";
import Test from "components/test";

export default function Home() {
    const [text, setText] = useState<string>("자바스크립트");
    const [title, setTitle] = useState<number>("하이");
    setTimeout(() => {
        setText(0);
        // setText("타입스크립트")
    }, 1000);

    return (
        <div className="container">
            <div>
                <span>{text} 적용 완료</span>
                <Test />
                {title}
            </div>
        </div>
    );
}
