import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FirebaseProvider } from "store/FirebaseStore";
type Props = {};

const PwChangeTab = dynamic(() => import("components/organism/PwChangeTab/PwChangeTab"), { ssr: false });

const PwChange = () => {
    return (
        <FirebaseProvider>
            <PwChangeTab />
        </FirebaseProvider>
    );
};

export default PwChange;
