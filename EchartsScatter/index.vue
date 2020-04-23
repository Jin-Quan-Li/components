<template>
    <div class="echarts">
        <div :style="{height:EchartsHeight,width:EchartsWidth}" ref="myEchart"></div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例滚动

import names from "./names.js" //地名
import splitList from "./splitList.js"//对应地名颜色
require('echarts/map/js/china.js')//引入中国地图数据

/**
 * @param {String} EchartsHeight 图表高度
 * @param {String} EchartsWidth 图标宽度
 * @param {Object} data 图标配置信息
 * @param {Boolean} CustomTooltip 是否在自定义tooltip
 */
export default {
	name: "EchartsScatter",
	props:{
		EchartsHeight:{
			type:String,
			default:'5000px'
		},
		EchartsWidth:{
			type:String,
			default:'100%'
		},
		data:{
			type: Object
		},
		CustomTooltip:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			chart: null,
			myChart:'',
			option:{
				backgroundColor: "#fff",
				tooltip: {
					show:true,// 鼠标移入显示提示框信息
					textStyle: {
						color: '#fff', //全局字体颜色
						fontSize: this.fontSize(0.12)//全局字体大小
					},
					enterable: true, // 鼠标可移入tooltip中
					triggerOn: 'click',   //触发方式
    				// alwaysShowContent:true,   //鼠标离开区域不消失
					formatter:this.CustomTooltip ? null :  function (params) {
						const data = `${params.data.name},${params.data.id}`
						return '<button style="pointer-events: all" onclick="myClick(\''+ data + '\')">查看详情</button>'
					}
				}, 
				dataRange: {
					show: false,//不显示旁边类型
					splitList
				},
				geo: { // 这个是重点配置区
					map: 'china', // 表示中国地图
					roam: false,
					left:0,
					top:0,
					right:0,
					label: {
						normal: {
							show: true, // 是否显示对应地名
							textStyle: {
								color: 'rgba(0,0,0,0.7)', //全局字体颜色
								fontSize: this.fontSize(0.12)//全局字体大小
							}
						}
					},
					// 每一个区域的配置
					itemStyle: {
						normal: {  //覆盖
							borderColor: '#fff'
						},
						emphasis: {//高亮
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							shadowBlur: 20,
							borderWidth: 0,//区域边框宽度
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							borderColor: '#4b0082',//区域边框颜色 
							areaColor:"#f00"//区域颜色
						}
					}
				},
				series: [
					{
						type: 'scatter',
						coordinateSystem: 'geo', // 对应上方配置
						itemStyle:{
							emphasis:{
								label:{
									show:true
								}
							}   //鼠标移入城市名称是否展示
						}
					},
					{
						name: '点击事件', // 鼠标移入提示框信息
						type: 'map',
						geoIndex: 0,
						data: names
					}
				]
			}
		};
	},
	mounted() {
		this.myChart = echarts.init(this.$refs.myEchart);
		this.myChart.setOption({
			...this.option,
			...this.data
		});
		this.chinaConfigure();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		chinaConfigure() {
			window.onresize = this.myChart.resize;
			this.myChart.on('click', params => {
				this.$emit('EchartsClick',params)
			});
		},
		fontSize(res){
			let docEl = document.documentElement,
			clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if ( !clientWidth ) return;
			let fontSize = 100 * (clientWidth / 750);
			return res * fontSize;
		}
	}
}
</script>