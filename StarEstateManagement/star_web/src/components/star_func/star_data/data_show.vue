<template>
  <div id="box">
    <div class="base_message">
      <el-card class="box-card">
        <b>总栋数：46</b>
        <img src="../../../../static/images/building.png" alt="">
      </el-card>
      <el-card class="box-card">
        <b>总人数：4960</b>
        <img src="../../../../static/images/data.png" alt="">
      </el-card>
      <el-card class="box-card">
        <b>总户数：800</b>
        <img src="../../../../static/images/home.png" alt="">
      </el-card>
      <el-card class="box-card">
        <b>租客数：312</b>
        <img src="../../../../static/images/person.png" alt="">
      </el-card>
      <el-card class="box-card">
        <b>车位数：2044</b>
        <img src="../../../../static/images/car.png" alt="">
      </el-card>
    </div>
    <div class="data_message">
      <el-card>
        <div id="payment"></div>
      </el-card>
      <el-card style="width:474px">
        <div id="evaluate" ></div>
      </el-card>
      <el-card>
        <div id="car"></div>
      </el-card>
    </div>
    <div class="other_message">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <b class="title">活动参与情况</b>
        </div>
        <div v-for="message_item in activitiesList" class="message_item">
          <span class="active_name">{{message_item.name}}:</span>
          <el-progress class="progress_data" :text-inside="true" :stroke-width="20" :percentage="message_item.progress" :status="message_item.status"></el-progress>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <b class="title">社区报修记录</b>
        </div>
          <vue-seamless-scroll :data="recordsList" class="warp">
            <ul class="item">
              <li  v-for="(message_item,index) in recordsList " :key="index">
                <i class="el-icon-time"></i>
                <span>{{message_item.time}}---{{message_item.task}}</span>
                <el-tag size="mini" style="float:right" :type="message_item.status">{{message_item.status==='success'?'已受理':'未受理'}}</el-tag>
              </li>
            </ul>
          </vue-seamless-scroll>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <b class="title">用户操作动态</b>
        </div>
       <vue-seamless-scroll :data="operationList" class="warp">
            <ul class="item">
              <li  v-for="(message_item,index) in operationList " :key="index">
                <i class="el-icon-user"></i>
                <span>{{message_item.name}}{{message_item.operation}}</span>
                <el-tag size="mini" style="float:right">{{message_item.time}}</el-tag>
              </li>
            </ul>
          </vue-seamless-scroll>
      </el-card>
    </div>
  </div>
</template>

<script>
    import * as echarts from 'echarts';
    import vueSeamlessScroll from 'vue-seamless-scroll'
    export default {
        name: "data_show",
       components: {
          vueSeamlessScroll
        },
        data() {
            return {
              activitiesList:[
                {
                  name:'公共志愿者服务日',
                  progress:50,
                  status:''
                },
                {
                  name:'社区捡垃圾',
                  progress:30,
                  status:'exception'
                },
                {
                  name:'社区文化日',
                  progress:60,
                  status:''
                },
                {
                  name:'社区亲子活动日',
                  progress:80,
                  status:'success'
                },
                ],
              recordsList:[
                {
                  time:'2013-01-25',
                  task:'A13摄像头损坏',
                  status:'success'
                },
                {
                  time:'2013-03-15',
                  task:'A2电梯异常',
                  status:'danger'
                },
                {
                  time:'2013-04-05',
                  task:'B13水管泄露',
                  status:'success'
                },
                {
                  time:'2013-01-25',
                  task:'A11照明灯不亮',
                  status:'danger'
                },
                {
                  time:'2013-01-25',
                  task:'A13摄像头损坏',
                  status:'success'
                },
              ],
              operationList:[
                {
                  name:'张三',
                  operation:'更新了个人信息',
                  time:'2021-01-02'
                },
                {
                  name:'李四',
                  operation:'评论了《志愿者活动日》',
                  time:'2021-01-03'
                },
                {
                  name:'王五',
                  operation:'进行了留言',
                  time:'2021-11-02'
                },
                {
                  name:'赵六',
                  operation:'进行了报修申请',
                  time:'2021-01-12'
                },
                {
                  name:'赵七',
                  operation:'提交了《志愿者活动日》参与申请',
                  time:'2021-10-12'
                },
                ]
            }
        },
        methods: {
          handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
          handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
          drawEvaluateLineChart() {
                var chartDom = document.getElementById('evaluate');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                  title: {
                    text: '服务评价'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: ['好评', '一般', '差评']
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name: '好评',
                      type: 'line',
                      stack: 'Total',
                      data: [120, 132, 101, 134, 90, 230, 210,152,821,100,960,325,655]
                    },
                    {
                      name: '一般',
                      type: 'line',
                      stack: 'Total',
                      data: [220, 182, 191, 234, 290, 330, 310,152,845,666,857,124,365]
                    },
                    {
                      name: '差评',
                      type: 'line',
                      stack: 'Total',
                      data: [150, 232, 201, 154, 190, 330, 410,152,654,452,348,644,871]
                    },
                  ]
                };
                option && myChart.setOption(option);
            },
          drawPaymentPieChart() {
              var chartDom = document.getElementById('payment');
              var myChart = echarts.init(chartDom);
              var option;
              option = {
                color:['#4CAAFE','#A47ADC','#40D5B3','#FA5C5C'],
                title: {
                  text: '缴费人数',
                  subtext: '2021-09-12',
                  left: 'center'
                },
                tooltip: {
                  trigger: 'message_item',
                  formatter:function (params) {
                      return params.name+':<br/>已缴费:'+params.value+'<br/>未交费:10'+'<br/>缴费进度:95%'
                  },
                  textStyle:{
                    align:'left'
                  }
                },
                legend: {
                  orient: 'vertical',
                  left: 'left'
                },
                series: [
                  {
                    type: 'pie',
                    radius: '50%',
                    data: [
                      {value: 1048, name: '水费'},
                      { value: 735, name: '电费' },
                      { value: 580, name: '物业费' },
                      { value: 484, name: '停车费' },
                    ],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              };
              option && myChart.setOption(option);
          },
          drawCarPieChart() {
              var chartDom = document.getElementById('car');
              var myChart = echarts.init(chartDom);
              var option;
              option = {
                color:['#159BFE','#85FD2A','#FFF638','#FF3D55'],
                title: {
                  text: '车位使用',
                  subtext: '2019-9-12',
                  left: 'center'
                },
                tooltip: {
                  trigger: 'message_item',
                  formatter:function (params) {
                      return params.name+':<br/>已使用:'+params.value+'<br/>未使用:10'+'<br/>使用占比:95%'
                  },
                  textStyle:{
                    align:'left'
                  }
                },
                legend: {
                  orient: 'vertical',
                  left: 'left'
                },
                graphic:[{
                  type:'text',
                 left:'center',
                 top:'center',
                 style:{
                    text:'76%',
                   fontSize:32,
                 },

               }],
                series: [
                  {
                    type: 'pie',
                    radius: ['30%','50%'],
                    data: [
                      { value: 1048, name: 'A区' },
                      { value: 735, name: 'B区' },
                      { value: 580, name: 'C区' },
                      { value: 484, name: 'D区' },
                    ],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              };
              option && myChart.setOption(option);
          },
          drawCharts() {
              this.drawEvaluateLineChart()
              this.drawPaymentPieChart()
              this.drawCarPieChart()
          },
		    },
        mounted: function () {
          this.drawCharts()
        },
        updated: function () {
          this.drawCharts()
        }
    }
</script>


