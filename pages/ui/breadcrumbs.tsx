import BreadCrumbs from "@ui/BreadCrumbs";

type Props = {};

const BreadCrumbsPage = () => {
    const item_list = [
        { name: "강의실메인", link: "/class" },
        { name: "현재 진행 강의", link: "/class/open" },
        { name: "요한계시록-1", link: "/class/open/1" },
        { name: "강의참여", link: "/class/open/1/student/join" },
        { name: "영상보기", link: "/class/open/1/student/join/detail/1" },
    ];
    return (
        <div>
            <h2>breadcrumbs</h2>
            <BreadCrumbs item_list={item_list} />
        </div>
    );
};

BreadCrumbsPage.Layout = (page: any) => <div style={{ padding: "10px" }}>{page}</div>;

export default BreadCrumbsPage;
