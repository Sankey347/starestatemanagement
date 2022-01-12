<template>
  <div>
    <el-card class="log_time">
      <el-calendar v-model="value" first-day-of-week="7"></el-calendar>
    </el-card>
    <el-card class="log_pie">
      <div id="main"></div>
    </el-card>
    <div class="block">
      <el-select v-model="data_type" placeholder="请选择日志类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      style="margin: 10px 20px"
    >
    </el-date-picker>
      <el-input v-model="input" placeholder="请输入内容关键字搜索" style="width: 300px"></el-input>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          label="时间"
          width="150px"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="id"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="module"
          label="模块">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          label="结果">
          <template slot-scope="props">
            <el-tag :type="props.row.result===1?'success':'danger'">
              {{props.row.result===1?'成功':'失败'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="message"
          label="备注"
          show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;text-align: center">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])" type="danger" style="float:left;">删除记录</el-button>
          <el-pagination
            layout="prev, pager, next"
            :total="1000"
            style="display: inline-block"
          >
          </el-pagination>
        <el-button @click="toggleSelection([tableData[1], tableData[2]])" type="success" style="float: right">导出记录</el-button>
      </div>
  </div>
</template>

<script>
    import * as echarts from "echarts";

    export default {
        name: "system_log",
        data() {
          return {
              tableData: [
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功123456789101518521852852851285215125215125125125125'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                },
                {
                  date: '2016-05-03 08:01:01',
                  name: '王小虎',
                  id:'123456789',
                  module:'用户列表',
                  operation:'添加数据',
                  type:'管理员日志',
                  result:1,
                  message:'添加成功'
                }
             ],
              multipleSelection: [],
              input:'',
              pickerOptions: {
                shortcuts: [
                  {
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                },
                  {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                },
                  {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }
                ]
              },
              value2: '',
              value: new Date(),
              options: [
              {
                value: '0',
                label: '用户'
              },
              {
                value: '1',
                label: '管理员'
              },
              {
                value: '2',
                label: '超级管理员'
              },
              {
                value: '3',
                label: '系统'
              }
            ],
              data_type: ''
          }
        },
        methods:{
          drawPieChart() {
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
              color:['#EE6666','#FAC858','#8F73DD','#73C0DE'],
              title: {
                text: '日志数据占比',
                subtext: '2021-09-21',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                textStyle:{
                  align:'left'
                },
                formatter:function (params) {
                                  return params.name+'日志:<br/>数量:'+params.value+'条'
                              },
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              graphic: [
                          {
                          type: "text",
                          left: "center",
                          top: "center",
                          style: {
                              text: "单位名称",
                              textAlign: "center",
                              fill: "#32373C",
                              fontSize: 16,
                          },
                        },
                      ],
              series: [
                {
                  name: '日志占比',
                  type: 'pie',
                  radius: ['30%','60%'],
                  data: [
                    { value: 1048, name: '系统' },
                    { value: 735, name: '超级管理员' },
                    { value: 580, name: '管理员' },
                    { value: 484, name: '用户' },
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
          toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
          }
        },
        mounted() {
          this.drawPieChart()
        }
    }
</script>

