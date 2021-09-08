class PopupStorageController {
    STORE_NAME: string;
    constructor() {
        this.STORE_NAME = "daedeokpopup";
    }

    private getDataFromStorage() {
        const data = localStorage.getItem(this.STORE_NAME);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    private setDataToStorage(data) {
        localStorage.setItem(this.STORE_NAME, JSON.stringify(data));
    }

    getVisibleModalList(data) {
        var curTime = new Date().getTime();
        var originData = this.getDataFromStorage();
        return data.filter((it) => {
            const matchIdx = originData.findIndex((o_it) => o_it.id === it.id);
            if (matchIdx !== -1) {
                return curTime > originData[matchIdx].date;
            } else {
                return true;
            }
        });
    }

    addHidePopupItem(popupId) {
        var originData: Array<any> = this.getDataFromStorage();
        var matchIdx = originData.findIndex((it) => it.id === popupId);
        var date = new Date();
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);

        if (matchIdx !== -1) {
            originData[matchIdx] = {
                ...originData[matchIdx],
                id: popupId,
                date: date.getTime(),
            };
        } else {
            originData.push({
                id: popupId,
                date: date.getTime(),
            });
        }

        this.setDataToStorage(originData);
    }
}

export default PopupStorageController;
