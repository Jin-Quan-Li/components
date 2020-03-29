<template>
    <div class="wrapper">
        <!-- 头部名称 日期 礼拜几 -->
        <div class="calendar-wrapper">
            <div class="calendar-wrapper-title" v-show="showTitle">{{title}}</div>
            <div class="calendar-wrapper-date">{{dateTable[scrollTop].desc.split("-")[0] + "年" + dateTable[scrollTop].desc.split("-")[1] + "月"  }}</div>
            <div class="calendar-wrapper-weeks">
                <span v-for="(item,index) in weeks" :key="index">{{item}}</span>
            </div>
        </div>
        <!-- 选择日期 -->
        <div class="calendar-data-wrapper" ref="calendar" @scroll="handleScroll($event)">
            <div v-for="(item,index) in dateTable" :key="index">
                <h6 v-show="index > 0">{{item.desc.split("-")[0] + "年" + item.desc.split("-")[1] + "月"  }}</h6>
                <div class="calendar-content">
                    <div class="calendar-data-check" v-for="(itemName,i) in item.list" :key="i">
                        <div @click="handleItemClick(item.desc,cal.number,index,i,ind,cal)" v-for="(cal,ind) in itemName" :class="[{range:isCheck.indexOf(cal.date) > 0 && isCheck.indexOf(cal.date) < isCheck.length - 1},{overdue:cal.disable,active:cal.isActive}]" :style="{ background: cal.isActive ? color : '' }" :key="ind">
                            <div>
                                <div>
                                    <!-- 公日节假日 -->
                                    <span v-if="cal.holiday && showHoliday" :class="['calendar-data-holiday', {solar:!cal.isActive && !cal.disable}]">{{cal.holiday}}</span>
                                    <!-- 农历节假日 -->
                                    <span v-else-if="cal.solar && showHoliday" :class="['calendar-data-holiday', {lunar:!cal.isActive && !cal.disable}]">{{cal.solar}}</span>
                                    <!-- 普通日 -->
                                    <span v-else>{{cal.number || ''}}</span>
                                </div>
                                <!-- 显示开始结束 -->
                                <div v-show="cal.number && type === 'range' && isCheck.length && showRangeText" class="range-text">
                                    {{cal.date === isCheck[0] ? rangeText.start : cal.date === isCheck[isCheck.length - 1] ? rangeText.end : '' }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mark" v-show="showMark">{{item.desc.split("-")[1] > 9 ? item.desc.split("-")[1] : Number(item.desc.split("-")[1])}}</div>
                </div>
            </div>
        </div>
        <div>
            <button :style="{ background: color }" v-if="type === 'range' &&  isCheck.length < 2 " class="disabled">{{confirmText}}</button>
            <button :style="{ background: color }" v-else @click="handleConfirm">{{confirmDisabledText || confirmText}}</button>
        </div>
    </div>
</template>

<script>
import { cloneDeep, chunk } from "lodash";
import parseTime from './parseTime';
import initDate from './initDate';
import Lunar from './lunar.js'
/**
 * @param {String} type  日历类型
 * @param {[String,Date]} minDate  最小日期
 * @param {[String,Date]} maxDate  最大日期
 * @param {String} confirmText  确定按钮文字
 * @param {Boolean} showMark  是否显示水印
 * @param {Boolean} showTitle  是否显示标题
 * @param {String} title  标题名称
 * @param {String} confirmDisabledText  禁止按钮文本
 * @param {Boolean} showRangeText  是否显示选中日期下的标签
 * @param {String} rangeText  选中日期的第一条 最后一天的标签文本 只有type === range 有效
 * @param {Boolean} showHoliday  是否显示节假日(公历,农历)
 * @param {String} color  主题色，对底部按钮和选中日期生效
 */
export default {
    name:'LiCalendar',
    props:{
        type:{
            type:String,
            default:'single'
        },
        minDate:{
            type:[String,Date],
            default: () => {
                return new Date()
            }
        },
        maxDate:{
            type:[String,Date],
            default:() => {
                return new Date()
            }
        },
        confirmText:{
            type:String,
            default:'确定'
        },
        showMark:{
            type:Boolean,
            default:true
        },
        showTitle:{
            type:Boolean,
            default:true
        },
        title:{
            type:String,
            default:"日历"
        },
        confirmDisabledText:{
            type:String,
            default:""
        },
        showRangeText:{
            type:Boolean,
            default:true
        },
        rangeText:{
            type:Object,
            default:() => {
                return {
                    start:"开始",
                    end:"结束"
                }
            }
        },
        showHoliday:{
            type:Boolean,
            default:false
        },
        color:{
            type:String,
            default:"#ee0a24"
        }
    },
    data () {
        return {
            weeks:["日", "一", "二", "三", "四", "五", "六"],
            dateTable:[],
            isCheck:[],
            scrollTop:0,
            startDate:"",
            endDate:"",
        };
    },

    created(){
        /** 初始化所有日期数据 包括默认选中数据 */
        let temp = []
		for (let i = 0; i < this.MonthsBetw(this.minDate,this.maxDate); i++) {  // 取近三个月内的日期
			let obj = this.getDateTable(i);
			temp.push(obj);
		}
        this.dateTable = initDate(temp,this.type);
        switch (this.type) {
                /** 多选 */
                case 'single':
                    this.isCheck = [this._getDateYearMonth().current]
                break
                /** 单选 */
                case 'multiple':
                    this.isCheck = [this._getDateYearMonth().current]
                break
                /** 连选 */
                case 'range':
                    this.isCheck = [this._getDateYearMonth().current,this._getDateYearMonth().nextMonth]
                break
            }
    },

    components: {
 
    },

    computed: {
        
    },

    beforeMount() {
 
    },

    mounted() {
        
    },

    methods: {
        /** 滚动条滚动的距离 */
        handleScroll(event){
            this.scrollTop = parseInt(event.target.scrollTop / 338);
        },
        /** 重组日期数 */
        getDateTable(plus) {
            let curDate = new Date(this.minDate)  //现在时间
            let curYear = curDate.getFullYear(); //年
            let curMonth = curDate.getMonth() + 1; //月
            let curDay = curDate.getDate();
            if (curMonth + plus > 12) {
                curYear++
                curMonth = curMonth + plus - 12
            } else {
                curMonth = curMonth + plus
            }
            let date = new Date(curYear, curMonth, 0);
            let year = date.getFullYear(); // 当前年
            let month = date.getMonth() + 1; // 当前月
            // console.log(`${year}年${month}月.`);

            let date2 = new Date(year, month, 0);
            let days = date2.getDate(); // 当月有多少天
            // console.log(`当月有${days}天.`);

            date2.setDate(1);
            let day = date2.getDay(); // 当月第一天是星期几
            // console.log(`当月第一天是星期${day}.`);

            let list = [];

            for (let i = 0; i < days + day; i++) {
                if (i < day) {  // 头部补零
                    list.push({
                        isActive: false,
                        number: 0
                    });
                } else {
                    if (plus === 0) {
                        if ((i - day + 1) < curDay) {
                            const d = (i - day + 1) > 9 ? i - day + 1 : `0${i - day + 1}`
                            list.push({
                                disable: true,
                                isActive: false,
                                number: i - day + 1,
                                date:`${year}-${month > 9 ? month : '0' + month}-${d}`
                            });
                        } else {
                            const d = (i - day + 1) > 9 ? i - day + 1 : `0${i - day + 1}`
                            list.push({
                                isActive: false,
                                number: i - day + 1,
                                date:`${year}-${month > 9 ? month : '0' + month}-${d}`
                            });
                        }
                    } else {
                        const d = (i - day + 1) > 9 ? i - day + 1 : `0${i - day + 1}`
                        list.push({
                            isActive: false,
                            number: i - day + 1,
                            date:`${year}-${month > 9 ? month : '0' + month}-${d}`
                        });
                    }
                }
            }
            let hlist = chunk(list, 7); // 转换为二维数组
            let len = hlist.length;
            let to = 7 - hlist[len - 1].length;

            // 循环尾部补0
            for (let i = 0; i < to; i++) {
                hlist[len - 1].push({
                    isActive: false,
                    number: 0
                });
            }
            if (month < 10) {
                month = "0" + month
            }
            const str = `${year}-${month}`
            return {
                "list": hlist,
                "desc": str,
                year,
                month
            }
        },
        /** 选择日期函数 */
        handleItemClick(desc, number, index, index1, index2,cal) {
            switch (this.type) {
                /** 多选 */
                case 'single':
                    this.handleSingle(desc, number, index, index1, index2,cal)
                break
                /** 单选 */
                case 'multiple':
                    this.handleMultiple(desc, number, index, index1, index2,cal)
                break
                /** 连选 */
                case 'range':
                    this.handleRange(desc, number, index, index1, index2,cal)
                break
            }

        },
        /** 多选 */
        handleMultiple(desc, number, index, index1, index2,cal){
            if( cal.disable || cal.number == 0 ) {
                return
            }
            this.$emit('select',cal.date)
            let temp = cloneDeep(this.dateTable)
            const flag = !temp[index].list[index1][index2].isActive
            temp[index].list[index1][index2].isActive = flag
            this.dateTable = temp
            const arr = desc.split("-");
            if (number < 10) {
                number = `0${number}`
            }
            if (flag) {
                let temp = cloneDeep(this.isCheck);
                temp.push(`${arr[0]}-${arr[1]}-${number}`)
                this.isCheck = temp
            } else {
            let temp = cloneDeep(this.isCheck);
                let filted = temp.filter((item) => {
                    return item !== `${arr[0]}-${arr[1]}-${number}`
                })
                this.isCheck = filted
            }
        },
        /** 单选 */
        handleSingle(desc, number, index, index1, index2,cal){
            if( cal.disable || cal.number == 0 ) {
                return
            }
            this.$emit('select',cal.date)
            let temp = this._handleDateTable()
            temp[index].list[index1][index2].isActive = true
            this.dateTable = temp
            const arr = desc.split("-");
            if (number < 10) {
                number = `0${number}`
            }
            this.isCheck = [`${arr[0]}-${arr[1]}-${number}`];
        },
        /** 连选 */
        handleRange(desc, number, index, index1, index2,cal){
            if( cal.disable || cal.number == 0 ) {
                return
            }
            this.$emit('select',cal.date)
            if (number < 10) {
                number = `0${number}`
            }
            let temp = cloneDeep(this.dateTable)

            const arr = desc.split("-");
            const date = `${arr[0]}-${arr[1]}-${number}`    //当前选中日期 
                /** 如果开始日期没有 或者选中的日期比开始日期小 那么就赋值给开始日期 且清空结束日期 */
                if( !this.startDate || +new Date(this.startDate) > +new Date(date) ) { 
                    this.startDate = date;
                    this.endDate = ''
                    temp = this._handleDateTable();
                    temp[index].list[index1][index2].isActive = true
                /** 如果有开始日期 且有结束日期 就复制给开始日期 且清空结束日期 */
                }else if( this.startDate && this.endDate ) {
                    this.startDate = date;
                    this.endDate = '';
                    temp = this._handleDateTable();
                    temp[index].list[index1][index2].isActive = true
                }else {
                    this.endDate = date;
                    temp[index].list[index1][index2].isActive = true
                }
                
            this.dateTable = temp;
            this.isCheck = [];
            if( this.startDate && this.endDate && +new Date(this.startDate) < +new Date(this.endDate)) {
                this.isCheck = this.getBetweenDateStr(this.startDate,this.endDate);
            }else {
                this.isCheck = [this.startDate]
            }
        },
        /** 初始化dateTable所有isActive false */
        _handleDateTable(){
            let temp = cloneDeep(this.dateTable)
            for( let i = 0; i < temp.length; i++ ) {
                for(let v = 0; v < temp[i].list.length; v++ ) {
                    for( let x = 0; x < temp[i].list[v].length; x++ ) {
                        temp[i].list[v][x].isActive = false
                    }
                }
            }
            return temp
        },
        /** 获取两个日期中间所有的日期 */
        getBetweenDateStr(start,end){
            var result = [];
            var beginDay = start.split("-");
            var endDay = end.split("-");
            var diffDay = new Date();
            var dateList = new Array;
            var i = 0;
            diffDay.setDate(beginDay[2]);
            diffDay.setMonth(beginDay[1]-1);
            diffDay.setFullYear(beginDay[0]);
            result.push(start);
            while(i == 0){
                var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
                diffDay.setTime(countDay);
                dateList[2] = diffDay.getDate();
                dateList[1] = diffDay.getMonth() + 1;
                dateList[0] = diffDay.getFullYear();
                if( String(dateList[1]).length == 1 ){
                    dateList[1] = "0"+dateList[1]
                };
                if( String(dateList[2]).length == 1 ){
                    dateList[2] = "0"+dateList[2]
                };
                result.push(dateList[0]+"-"+dateList[1]+"-"+dateList[2]);
                if( dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2] ) { 
                    i = 1;
                }
            };
            return result;
        },
        /** 获取当前年月日 以及下一天的年月日 */
        _getDateYearMonth(){
            var date = new Date();
            //明天的时间
            var nextMonth = new Date();
            nextMonth.setTime( nextMonth.getTime() + 24 * 60 * 60 * 1000 );
            /** current 当前时间  nextMonth 明日时间 */
            return {
                current:`${date .getFullYear()}-${date .getMonth() + 1 > 9 ? date .getMonth() + 1 : `0${date .getMonth() + 1}`}-${date .getDate() > 9 ? date .getDate() : `${date .getDate()}`}`,
                nextMonth:`${nextMonth.getFullYear()}-${ nextMonth.getMonth() + 1 > 9 ? nextMonth.getMonth() + 1 : `0${nextMonth.getMonth() + 1}`}-${nextMonth.getDate() > 9 ? nextMonth.getDate() : `0${nextMonth.getDate()}`}`
            }
        },
        /** 返回两个日期相差的月数 */
        MonthsBetw(date1, date2) { //date1和date2是2019-3-12格式
            //用-分成数组
            date1 = parseTime(date1,'{y}-{m}-{d}').split("-");
            date2 = parseTime(date2,'{y}-{m}-{d}').split("-");
            //获取年,月数
            var year1 = parseInt(date1[0]),
                month1 = parseInt(date1[1]),
                year2 = parseInt(date2[0]),
                month2 = parseInt(date2[1]),
                //通过年,月差计算月份差
                months = (year2 - year1) * 12 + (month2 - month1) + 1;
            return months;
        },
        /** 确定按钮 */
        handleConfirm(){
            this.$emit('confirm',this.isCheck)
        }
    },

    watch: {
 
    }

}

</script>
<style lang='css' scoped>
/* 头部 */
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #fff;
}
.calendar-wrapper {
    box-shadow: 0 2px 10px rgba(125, 126, 128, 0.16);
}
.calendar-wrapper-title {
    font-weight: 500;
}
.calendar-wrapper-date, .calendar-wrapper-title {
    font-size: 14px;
    line-height: 44px;
}
.calendar-wrapper-weeks {
    display: flex;
}
.calendar-wrapper-weeks span {
    flex: 1;
    font-size: 12px;
    color: #333;
    line-height:24px;
}
/* 日历 */

.calendar-data-wrapper {
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    height:calc(100% - 162px);
}
.calendar-data-wrapper h6 {
    height: 44rpx;
    font-weight: 500;
    line-height: 44rpx;
    text-align: center;
    padding-top: 20px;
}
.calendar-data-check {
    position: relative;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.calendar-data-check > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex:10 0;
    height: 60px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
}
.range-text {
    font-size: 10px;
    line-height: 20px;
}
.calendar-data-holiday {
    position: relative;
    top: -2px;
    font-size: 10px;
    font-weight: 400;
    line-height: 1;
}
/* 过期的日期 */
.calendar-data-check .overdue {
    color:#c8c9cc;
    cursor: default;
}
/* 连选的中间日期 */
.calendar-data-check .range {
    position: relative;
}
.calendar-data-check .range::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    opacity: 0.1;
    content: '';
}
/* 选中的日期 */
.calendar-data-check .active {
    background: #ee0a24;
    color: #fff;
}
/** 水印 */
.calendar-content {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
}
.mark {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    color: rgba(242, 243, 245, 0.8);
    font-size: 160px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    pointer-events: none;
}
/* 确认 */
button {
    width: 90%;
    height: 36px;
    margin: 7px auto;
    border-radius: 18px;
    outline: none;
    color: #fff;
    background-color: #ee0a24;
    border: 0;
}
.disabled {
    opacity: 0.5;
}
.solar {
    color:#4078f2
}
.lunar {
    color: #ee0a24;
}
</style>