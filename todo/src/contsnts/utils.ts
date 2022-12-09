import moment from 'moment'

export const modifiedDate = (date: string) => moment(date).format('YYYY/MM/DD')
export const addDate = () => moment().format('YYYY-MM-DD')
export const generateString = () => Math.random().toString(16).slice(2)
export const generateName = () => (Math.random() + 1).toString(36).substring(7)
