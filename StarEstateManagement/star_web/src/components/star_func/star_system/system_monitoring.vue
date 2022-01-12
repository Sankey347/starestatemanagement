<template>
  <div>
    <el-card class="db_box">
      <div id="db_data"></div>
    </el-card>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
    export default {
        name: "data_monitoring",
        methods:{
          drawDBLineChart(){
            var chartDom = document.getElementById('db_data');
            var myChart = echarts.init(chartDom);
            var option;
            function randomData() {
                var now = new Date();
                var value = 100- Math.random() * 100;
                return {
                    value: [
                        [now.getHours(), now.getMinutes()+1, now.getSeconds()].join(':'),
                        Math.round(value)
                    ]
                }
            }
            var data = [];
            var date = [];
            for (var i = 0; i < 1000; i++) {
                data.push(randomData());
                date.push('')
            }
            option = {
                title: {
                    text: '动态数据 + 时间坐标轴'
                },
                toolbox: {
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                  }
                },
                dataZoom: [
                {
                  type: 'inside',
                  start: 0,
                  end: 20
                },
                {
                  start: 0,
                  end: 20
                }
              ],
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        return params.value[0] + ' / ' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    data: date
                },
                yAxis: {
                    type: 'value',
                    min:0,
                    max:100,
                    interval: 10,
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    areaStyle: {},
                    data: data
                }]
            };
            setInterval(function () {
                var _data = randomData();
                data.shift();
                date.shift();
                data.push(_data);
                date.push(_data.value[0])

                myChart.setOption({
                    xAxis: {
                      data: date,
                      axisLabel:{
                        interval:60,
                       }
                    },
                    series: [{
                        data: data,
                      type:'line'
                    }]
                });
            }, 10000);
            option && myChart.setOption(option);
          }
        },
        mounted() {
          this.drawDBLineChart()
        }
    }
</script>

<style scoped>
  #db_data{
    width: 1000px;
    height: 400px;
  }
</style>
