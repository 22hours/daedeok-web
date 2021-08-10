type Type = "YYYY-MM-DD" | "YYYY/MM/DD";
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

    switch (type) {
        case "YYYY-MM-DD": {
            return `${year}-${month}-${date}`;
        }
        case "YYYY/MM/DD": {
            return `${year}/${month}/${date}`;
        }
        default:
            throw new Error("use Time REDUCER ERROR");
    }
};

const DateController = {
    getFormatedDate,
};

export default DateController;
