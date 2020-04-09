var moment = require('moment')

const format = "M/D/YY"
export const DATE = {
    first: moment().subtract(1, 'days').format(format),
    second: moment().subtract(2, 'days').format(format),
    third: moment().subtract(3, 'days').format(format),
    fourth: moment().subtract(4, 'days').format(format),
    fifth: moment().subtract(5, 'days').format(format),
    sixth: moment().subtract(6, 'days').format(format),
    seventh: moment().subtract(7, 'days').format(format),
    eightth: moment().subtract(8, 'days').format(format),
    nine: moment().subtract(9, 'days').format(format),
    ten: moment().subtract(10, 'days').format(format),
}

const format1 = "D/M"
export const label = {
    first: moment().subtract(1, 'days').format(format1),
    second: moment().subtract(2, 'days').format(format1),
    third: moment().subtract(3, 'days').format(format1),
    fourth: moment().subtract(4, 'days').format(format1),
    fifth: moment().subtract(5, 'days').format(format1),
    sixth: moment().subtract(6, 'days').format(format1),
    seventh: moment().subtract(7, 'days').format(format1),
    eightth: moment().subtract(8, 'days').format(format1),
    nine: moment().subtract(9, 'days').format(format1),
    ten: moment().subtract(10, 'days').format(format1)
}