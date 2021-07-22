import React, { useState, useEffect } from "react";
import styles from "components/test.module.scss";
type Props = {};

const test = () => {
    return (
        <div className={styles.bodybody}>
            TEST TEST
            <p className={styles.tt}>haha</p>
            <p className={styles.dd}>haha</p>
        </div>
    );
};

export default test;
