import { useAuthStore } from "store/AuthStore";

type Props = {};

const Logout = (props: Props) => {
    const { auth } = useAuthStore();
    return (
        <div>
            <h2>logout 중 입니다</h2>
        </div>
    );
};

export default Logout;
