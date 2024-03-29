type Type = "MM/DD" | "YYYY-MM-DD" | "YYYY/MM/DD" | "YYYY/MM/DD HH:MM";
const getFormatedDate = (type: Type, time: string): string => {
    const cur_date = new Date(time);

    var year = cur_date.getFullYear();
    var month: string = (cur_date.getMonth() + 1).toString();

    if (month.toString().length === 1) {
        month = "0" + month;
    }
    var date: string = cur_date.getDate().toString();
    if (date.toString().length === 1) {
        date = "0" + date;
    }

    var hour: string = cur_date.getHours().toString();
    if (hour.toString().length === 1) {
        hour = "0" + hour;
    }

    var minute: string = cur_date.getMinutes().toString();
    if (minute.toString().length === 1) {
        minute = "0" + minute;
    }

    switch (type) {
        case "YYYY-MM-DD": {
            return `${year}-${month}-${date}`;
        }
        case "YYYY/MM/DD": {
            return `${year}/${month}/${date}`;
        }
        case "MM/DD": {
            return `${month}/${date}`;
        }
        case "YYYY/MM/DD HH:MM":
            return `${year}/${month}/${date} ${hour}:${minute}`;

        default:
            throw new Error("use Time REDUCER ERROR");
    }
};

const DateController = {
    getFormatedDate,
};

export default DateController;
