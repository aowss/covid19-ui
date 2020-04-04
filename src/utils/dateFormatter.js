import moment from "moment";

export const yesterday = () => moment().subtract(1, "days");
export const dateToDay = date => moment(date).format("YYYY-MM-DD");
export const dateBeautify = date => moment(date).format("Do MMMM YYYY");
