import ClassCloseList from "components/organism/ClassCloseList/ClassCloseList";
import ClassCompleteList from "components/organism/ClassCompleteList/ClassCompleteList";
import { SecureRoute } from "lib/server/accessController";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { ListCommonProvider } from "store/ListCommonStore";
type Props = {};

const Index = () => {
    const router = useRouter();
    const { status } = router.query;
    const { auth } = useAuthStore();

    if (auth !== null) {
        switch (status) {
            case "open": {
                // router.replace("/class/open/board");
            }
            case "close": {
                return (
                    <ListCommonProvider>
                        <ClassCloseList />
                    </ListCommonProvider>
                );
            }
            case "complete": {
                return (
                    <ListCommonProvider>
                        <ClassCompleteList />
                    </ListCommonProvider>
                );
            }
        }
    }

    return (
        <div>
            <h2>일시적인 에러가 발생하였습니다 페이지를 새로고침해주세요</h2>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { status } = ctx.query;

    switch (status) {
        case "open": {
            return {
                redirect: {
                    destination: "/class/open/board",
                },
            };
        }
        case "close": {
            return SecureRoute(ctx, "ROLE_TUTOR", undefined, "/class");
        }
        case "complete": {
            return SecureRoute(ctx, "ROLE_MEMBER", undefined, "/class");
        }
    }

    return {
        props: {},
    };
    // return SecureRoute(ctx,'')
}

// export async function getStaticProps({ params }) {
//     return {
//         props: {
//             data: params,
//         },
//     };
// }

// export async function getStaticPaths(e) {
//     const paths = [{ params: { status: "open" } }, { params: { status: "complete" } }, { params: { status: "close" } }];
//     return { paths, fallback: false };
// }
export default Index;
