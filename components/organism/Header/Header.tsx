import styles from "./Header.module.scss";
import PcHeader from "./PcHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
    return (
        <div className={styles.container}>
            <PcHeader />
            <MobileHeader />
        </div>
    );
};
export default Header;
