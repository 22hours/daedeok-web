const areEqualShallow = (a, b) => {
    for (let key in a) {
        if (!(key in b) || a[key] !== b[key]) {
            return false;
        }
    }
    for (let key in b) {
        if (!(key in a)) {
            return false;
        }
    }
    return true;
};

const getDeletedItemInList = (origin_list: any[], current_list: any[], isComputeImgDiff?: boolean) => {
    var deleted_list: any[] = [];

    origin_list.forEach((origin_list_item) => {
        var isEqualItemExist = false;
        current_list.forEach((current_list_item) => {
            if (isComputeImgDiff) {
                if (origin_list_item === current_list_item) {
                    isEqualItemExist = true;
                    return false;
                }
            } else {
                if (areEqualShallow(origin_list_item, current_list_item)) {
                    isEqualItemExist = true;
                    return false;
                }
            }
        });
        if (!isEqualItemExist) {
            // 커렌트 리스트에 동일 아이템 미 존재 <- 삭제된 거
            deleted_list.push(origin_list_item);
        }
    });
    return deleted_list;
};

const getNewItemInList = (origin_list: any[], current_list: any[], isComputeImgDiff?: boolean) => {
    var new_list: any[] = [];

    current_list.forEach((current_list_item) => {
        var isEqualItemExist = false;
        origin_list.forEach((origin_list_item) => {
            if (isComputeImgDiff) {
                if (current_list_item === origin_list_item) {
                    isEqualItemExist = true;
                    return false;
                }
            } else {
                if (areEqualShallow(current_list_item, origin_list_item)) {
                    isEqualItemExist = true;
                    return false;
                }
            }
        });

        if (!isEqualItemExist) {
            // 오리진 리스트에 동일 아이템 미 존재 <- 새로추가된거
            new_list.push(current_list_item);
        }
    });
    return new_list;
};

const getUpdateInList = (origin_list: any[], current_list: any[], isComputeImgDiff?: boolean) => {
    return {
        deleted_item_list: getDeletedItemInList(origin_list, current_list, isComputeImgDiff),
        new_item_list: getNewItemInList(origin_list, current_list, isComputeImgDiff),
    };
};

const ListController = {
    getUpdateInList,
    getDeletedItemInList,
    getNewItemInList,
};
export default ListController;
