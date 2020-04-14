import moment from "moment";

export const previousDay = date => moment(date).subtract(1, "days").format("YYYY-MM-DD");
export const nextDay = date => moment(date).add(1, "days").format("YYYY-MM-DD");
export const yesterday = () => moment().subtract(1, "days");
export const dateToDay = date => moment(date).format("YYYY-MM-DD");
export const dateBeautify = date => moment(date).format("Do MMMM");
