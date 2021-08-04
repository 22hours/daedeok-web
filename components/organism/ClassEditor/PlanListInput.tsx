import style from "./ClassEditor.module.scss";
import { class_types } from "@global_types";
import TextInput from "@ui/input/TextInput";
import React, { useState } from "react";
import ClassRow from "./items/ClassRow";
import AddIcon from "@material-ui/icons/Add";

type PlanListInputProps = {
    value: class_types.ClassInfo["plan_list"];
    addPlanItem: (planType: class_types.PlanType) => void;
    setPlanItem: (
        planType: "week" | "title" | "tutor" | "location" | "date" | "time" | "video_link" | "introduce" | "zoom_link",
        data: class_types.PlanItem,
        idx: number
    ) => void;
    removePlanItem: (idx: number) => void;
};

const PlanListInput = (props: PlanListInputProps) => {
    return (
        <div className={style.PlanListInput}>
            <ClassRow labelName={"강의 계획"} />
            <PlanItemList {...props} />
            <div>
                <div className={style.button_group}>
                    <div className={style.class_type_button} onClick={() => props.addPlanItem("OFFLINE")}>
                        오프라인 <AddIcon style={{ fontSize: "18px" }} />
                    </div>
                    <div className={style.class_type_button} onClick={() => props.addPlanItem("ZOOM")}>
                        ZOOM <AddIcon style={{ fontSize: "18px" }} />
                    </div>
                    <div className={style.class_type_button} onClick={() => props.addPlanItem("ONLINE")}>
                        영상 <AddIcon style={{ fontSize: "18px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlanItemList = (props) => {
    return (
        <div>
            {props.value.map((it, idx) => (
                <PlanItemInput
                    key={`planinputitem${idx}`}
                    planItem={it}
                    setPlanItem={props.setPlanItem}
                    removePlanItem={props.removePlanItem}
                    keyidx={idx}
                />
            ))}
        </div>
    );
};

type PlanItemProps = {
    planItem: class_types.PlanItem;
    setPlanItem: (
        planType: "week" | "title" | "tutor" | "location" | "date" | "time" | "video_link" | "introduce" | "zoom_link",
        data: class_types.PlanItem,
        idx: number
    ) => void;
    removePlanItem: (idx: number) => void;
    keyidx: number;
};
const PlanItemInput = (props: PlanItemProps) => {
    const { planItem } = props;
    const CommonFirstInputList = [
        {
            id: 1,
            type: "text",
            value: planItem.week,
            placeholder: "주차",
            name: "week",
        },
        {
            id: 2,
            type: "text",
            value: planItem.title,
            placeholder: "제목",
            name: "title",
        },
        {
            id: 3,
            type: "text",
            value: planItem.tutor,
            placeholder: "강사명",
            name: "tutor",
        },
        {
            id: 4,
            type: "text",
            value: planItem.location,
            placeholder: "장소",
            name: "location",
        },
    ];
    const CommonLastInputList = [
        {
            id: 5,
            type: "date",
            value: planItem.date,
            placeholder: "날짜",
            name: "date",
        },
        {
            id: 6,
            type: "time",
            value: planItem.time,
            placeholder: "시간",
            name: "time",
        },
    ];
    const OnlineInputList = [
        {
            id: 7,
            type: "text",
            // @ts-ignore
            value: planItem.video_link,
            placeholder: "영상링크",
            name: "video_link",
        },
        {
            id: 8,
            type: "text",
            // @ts-ignore
            value: planItem.introduce,
            placeholder: "설명",
            name: "introduce",
        },
    ];
    const ZoomInputList = [
        {
            id: 8,
            type: "text",
            // @ts-ignore
            value: planItem.zoom_link,
            placeholder: "ZOOM 링크",
            name: "zoom_link",
        },
    ];

    var RenderList = CommonFirstInputList;
    if (planItem.type === "ONLINE") {
        RenderList = RenderList.concat(OnlineInputList);
    } else if (planItem.type === "ZOOM") {
        RenderList = RenderList.concat(ZoomInputList);
    }

    return (
        <div className={style.PlanItemInput}>
            {RenderList.map((it, idx) => {
                return (
                    <PlanTextInput
                        key={`planinput:${it.id}`}
                        item={it}
                        keyidx={props.keyidx}
                        idx={idx}
                        setPlanItem={props.setPlanItem}
                    />
                );
            })}
            <div className={style.plan_item_date_input}>
                {CommonLastInputList.map((it, idx) => {
                    return (
                        <PlanTextInput
                            key={`planinput:${it.id}`}
                            item={it}
                            keyidx={props.keyidx}
                            idx={idx}
                            setPlanItem={props.setPlanItem}
                        />
                    );
                })}
                <div onClick={() => props.removePlanItem(props.keyidx)} className={style.plan_item_delete_btn}>
                    삭제
                </div>
            </div>
        </div>
    );
};

const PlanTextInput = (props) => {
    const { item, idx, keyidx, setPlanItem } = props;
    return (
        <TextInput
            // @ts-ignore
            type={item.type}
            form="box"
            placeholder={item.placeholder}
            // @ts-ignore
            value={item.value}
            onChange={(e) => props.setPlanItem(item.name, e.target.value, props.keyidx)}
            className={style.plan_list_input}
        />
    );
};

export default PlanListInput;
