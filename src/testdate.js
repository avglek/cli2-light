const moment = require('moment')

console.log('test date')

const strDate = '20210725T012600000'
const d = strDate.slice(0, 13)

const localDate = moment(d)

console.log(d, localDate.format('DD.MM.YYYY HH:mm'))
