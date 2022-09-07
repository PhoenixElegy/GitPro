<script lang="ts" setup>
import { onMounted, onUpdated } from 'vue';
import * as echarts from 'echarts';
import { ref } from 'vue'

const chartDiv1 = ref<HTMLElement>()
const chartDiv2 = ref<HTMLElement>()
const chartDiv3 = ref<HTMLElement>()
const chartDiv4 = ref<HTMLElement>()
const chartDiv5 = ref<HTMLElement>()


const initDiv1 = function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(chartDiv1.value as HTMLElement);
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
}

const initDiv2 = function () {
    type EChartsOption = echarts.EChartsOption
    const myChart = echarts.init(chartDiv2.value as HTMLElement);
    let option: EChartsOption;
    option = {
        // title: {
        //     text: 'Basic Radar Chart'
        // },
        legend: {
            data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending'
                    }
                ]
            }
        ]
    };

    option && myChart.setOption(option);
}

const initDiv3 = function () {
    type EChartsOption = echarts.EChartsOption

    const myChart = echarts.init(chartDiv3.value as HTMLElement);
    let option: EChartsOption;

    option = {
        xAxis: {
            data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        },
        yAxis: {},
        series: [
            {
                type: 'candlestick',
                data: [
                    [20, 34, 10, 38],
                    [40, 35, 30, 50],
                    [31, 38, 33, 44],
                    [38, 15, 5, 42]
                ]
            }
        ]
    };

    option && myChart.setOption(option);
}

const initDiv4 = function () {
    const myChart = echarts.init(chartDiv4.value as HTMLElement);
    let option

    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '30%']
        },
        visualMap: {
            type: 'piecewise',
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
                {
                    gt: 1,
                    lt: 3,
                    color: 'rgba(0, 0, 180, 0.4)'
                },
                {
                    gt: 5,
                    lt: 7,
                    color: 'rgba(0, 0, 180, 0.4)'
                }
            ]
        },
        series: [
            {
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                    color: '#5470C6',
                    width: 5
                },
                markLine: {
                    symbol: ['none', 'none'],
                    label: { show: false },
                    data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
                },
                areaStyle: {},
                data: [
                    ['2019-10-10', 200],
                    ['2019-10-11', 560],
                    ['2019-10-12', 750],
                    ['2019-10-13', 580],
                    ['2019-10-14', 250],
                    ['2019-10-15', 300],
                    ['2019-10-16', 450],
                    ['2019-10-17', 300],
                    ['2019-10-18', 100]
                ]
            }
        ]
    };

    option && myChart.setOption(option);
}

const initDiv5 = function () {
    const myChart = echarts.init(chartDiv5.value as HTMLElement);
    let option

    function func(x: number) {
        x /= 10;
        return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50;
    }

    function generateData() {
        let data = [];
        for (let i = -200; i <= 200; i += 0.1) {
            data.push([i, func(i)]);
        }
        return data;
    }

    option = {
        animation: false,
        grid: {
            top: 40,
            left: 50,
            right: 40,
            bottom: 50
        },
        xAxis: {
            name: 'x',
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        yAxis: {
            name: 'y',
            min: -100,
            max: 100,
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        dataZoom: [
            {
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20
            },
            {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20
            }
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateData()
            }
        ]
    };

    option && myChart.setOption(option);
}

onMounted(() => {
    initDiv1()
    initDiv2()
    initDiv3()
    initDiv4()
    initDiv5()
})

onUpdated(() => {
    initDiv1()
    initDiv2()
    initDiv3()
    initDiv4()
    initDiv5()

})


</script>

<template>

    <div class="mainDiv">
        <div ref="chartDiv1" style="height: 300px; width:400px ;"></div>
        <div ref="chartDiv2" style="height: 300px; width:600px ;"></div>
        <div ref="chartDiv3" style="height: 300px; width:400px ;"></div>
        <div ref="chartDiv4" style="height: 400px; width:800px ;"></div>
        <div ref="chartDiv5" style="height: 400px; width:600px ;"></div>
    </div>

</template>

<style scope>
.mainDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /** justify-content: center;水平布局垂直居中*/
}
</style>