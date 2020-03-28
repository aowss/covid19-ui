import moment from 'moment'

export const dateToDay = date => moment(date).format('YYYY-MM-DD')
export const dateBeautify = date => moment(date).format('Do MMMM YYYY')
