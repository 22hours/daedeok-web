import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import TextViewer from "components/molecule/TextViewer/TextViewer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./CategoryDetail.module.scss";

type Props = {};
type State = {
    category: string;
    content: string;
};
const CategoryDetail = () => {
    const [data, setData] = useState<State | null>(null);
    const router = useRouter();
    const { category_id } = router.query;
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_DETAIL_CATEGORY", { category_id: category_id });
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    if (data === null) {
        return <div>NOW LOAD</div>;
    } else {
        return (
            <div className={style.container}>
                <div className={style.head}>
                    <Typo
                        //@ts-ignore
                        content={data.category}
                        type="TEXT"
                        size="large"
                    />
                </div>
                <div className={style.body}>
                    <TextViewer content={data.content} />
                </div>
                <div className={style.bottom_btn_wrapper}>
                    <Link href={"/lecture-category"} passHref>
                        <Button
                            type="SQUARE"
                            size="smaller"
                            fontSize="smaller"
                            backgroundColor="yellow_accent"
                            content="목록보기"
                            color="white"
                            className={style.bottom_btn_style}
                        />
                    </Link>
                </div>
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    console.log(ctx);
    return {
        props: {},
    };
}
export default CategoryDetail;
