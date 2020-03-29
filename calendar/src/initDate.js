
import Lunar from './lunar.js'
/** 公历节日 */
var sFtv = {
    "0101":"元旦",
    "0214":"情人节",
    "0308":"妇女节",
    "0312":"植树节",
    "0315":"消费者日",
    "0401":"愚人节",
    "0501":"劳动节",
    "0512":"青年节",
    "0101":"护士节",
    "0101":"元旦",
    "0601":"儿童节",
    "0701":"建党节",
    "0801":"建军节",
    "0910":"教师节",
    "0928":"孔子诞辰",
    "1001":"国庆节",
    "1006":"老人节",
    "1024":"联合国日",
    "1224":"平安夜",
    "1225":"圣诞节",
}

/** 农历节日 */
var lFtv = {
    "0101":"春节",
    "0115":"元宵节",
    "0505":"端午节",
    "0707":"七夕",
    "0715":"中元节",
    "0815":"中秋节",
    "0909":"重阳节",
    "1208":"腊八节",
    "1224":"小年"
}


/** 获取当前年月日 以及下一天的年月日 */
const _getDateYearMonth = () => {
    var date = new Date();
    //明天的时间
    var nextMonth = new Date();
    nextMonth.setTime( nextMonth.getTime() + 24 * 60 * 60 * 1000 );
    /** current 当前时间  nextMonth 明日时间 */
    return {
        current:`${date .getFullYear()}-${date .getMonth() + 1 > 9 ? date .getMonth() + 1 : `0${date .getMonth() + 1}`}-${date .getDate() > 9 ? date .getDate() : `${date .getDate()}`}`,
        nextMonth:`${nextMonth.getFullYear()}-${ nextMonth.getMonth() + 1 > 9 ? nextMonth.getMonth() + 1 : `0${nextMonth.getMonth() + 1}`}-${nextMonth.getDate() > 9 ? nextMonth.getDate() : `0${nextMonth.getDate()}`}`
    }
};
/** 初始化日期数据 */
export default (temp,type) => {
    temp.forEach((item, index) => {
        item.list.forEach((itemName, i) => {
            itemName.forEach((v, inx) => {
                /** 公历转农历 */
                if( v.date ) {
                    let lunar = v.date.split("-")
                    v.lunar = Lunar.toLunar(lunar[0],lunar[1],lunar[2])
                }else {
                    // console.log(1111)
                    v.lunar = []
                }
                /** 公历节假日 */
                v.holiday = sFtv[`${item.month}${v.number > 9 ? v.number : `0${v.number}` }`] || "";
                /** 农历节假日 */
                v.solar = ( v.lunar.length ? lFtv[`${v.lunar[1]}${v.lunar[2]}`] : '' ) || ""
                /** 如果type === range 连选 默认明天日期也选中 */
                if( type === 'range' ) {
                    v.isActive = +new Date(v.date) === +new Date(_getDateYearMonth().current) || +new Date(v.date) === +new Date(_getDateYearMonth().nextMonth) ? true : false
                }else {
                    /** 默认当前日期选中 */
                    v.isActive = +new Date(v.date) === +new Date(_getDateYearMonth().current) ? true : false;
                }
            });
        });
    });
    return temp
}