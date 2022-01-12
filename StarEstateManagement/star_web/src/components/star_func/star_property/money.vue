<template>
  <div>
        <el-card class="text_show">
          <div slot="header" class="clearfix">
            <b >九月份已缴费情况</b>
            <form-dialog dialog_title="发布新活动"></form-dialog>
          </div>
          <div class="infinite-list-wrapper">
            <ul
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled">
              <li v-for="message_item in payList" class="list-item">
                <span>{{message_item.name}}:</span>
                <el-progress class="progress_data" :text-inside="true" :stroke-width="20" :percentage="message_item.progress" :status="message_item.status"></el-progress>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card class="data_show">
          <div slot="header" class="clearfix">
            <b>九月份缴费数据展示</b>
          </div>
          <div id="main"></div>
        </el-card>
        <el-card class="text_show">
          <div slot="header" class="clearfix">
            <b >九月份用户缴费信息</b>
          </div>
           <vue-seamless-scroll :data="recordsList" class="warp">
            <ul>
              <li  v-for="(message_item,index) in recordsList " :key="index">
                <i class="el-icon-bell"></i>
                <span>{{message_item.time}}-{{message_item.name}}-{{message_item.project}}</span>
                <el-tag size="mini" style="float:right;margin-top: 5px" :type="message_item.status">{{message_item.status==='success'?'缴费成功':'缴费失败'}}</el-tag>
              </li>
            </ul>
          </vue-seamless-scroll>
        </el-card>

      <el-table
       :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;margin: 0 auto" height="627px">
        <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户姓名：">
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="用户账号：">
              <span>{{ props.row.user_id }}</span>
            </el-form-item>
            <el-form-item label="缴费项目：">
              <span>{{ props.row.payment_project }}</span>
            </el-form-item>
            <el-form-item label="缴费编号：" >
              <span>{{ props.row.payment_id }}</span>
            </el-form-item>
            <el-form-item label="缴费金额：">
              <span>{{ props.row.payment_amount }}</span>
            </el-form-item>
            <el-form-item label="缴费状态：">
              <span>{{props.row.payment_status===0?'待处理':props.row.payment_status===1?'已同意':'已拒绝'}}</span>
            </el-form-item>
            <el-form-item label="截止时间：">
              <span>{{ props.row.deadline }}</span>
            </el-form-item>
            <el-form-item label="缴费时间：">
              <span>{{ props.row.payment_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
        <el-table-column
        type="index"
        width="40">
      </el-table-column>
        <el-table-column
          label="用户姓名"
          prop="user_name">
        </el-table-column>
        <el-table-column
          label="用户账号"
          prop="user_id">
        </el-table-column>
        <el-table-column
          label="缴费项目"
          prop="payment_project">
        </el-table-column>
        <el-table-column
          label="缴费类型"
          prop="payment_type">
        </el-table-column>
        <el-table-column
          label="缴费状态">
          <template slot-scope="props">
            <el-tooltip effect="dark" content="Top Center 提示文字" placement="top">
              <el-tag :type="props.row.payment_status?'success':'danger'">
                {{props.row.payment_status?'已缴费':'未缴费'}}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="缴费金额"
          prop="payment_amount">
        </el-table-column>
        <el-table-column
          label="缴费时间">
           <template slot-scope="props">
            <span>{{props.row.payment_time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
         <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="danger"
          v-if="scope.row.payment_status"
          @click="consentApply(scope.$index,scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="warning"
            v-else
            @click="rejectsApply(scope.$index, scope.row)">催缴</el-button>
          <el-dialog title="拒绝请求" :visible.sync="dialogFormVisible" width="30%">
            <el-form  :model="activity_ruleForm" :rules="activity_rules" ref="activity_ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="activity_ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" required>
                <el-date-picker
                  v-model="start_time"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" required>
                <el-date-picker
                  v-model="end_time"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="activity_ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('activity_ruleForm')">通知用户</el-button>
                <el-button @click="resetForm('activity_ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
  </div>
</template>

<script>
    import vueSeamlessScroll from 'vue-seamless-scroll'
    import * as echarts from 'echarts';
    export default {
        name: "money",
        components: {
          vueSeamlessScroll
        },
        data(){
          return{
              search:'',
              activity_ruleForm: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
              activity_rules: {
                name: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                  { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                  { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                  { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                  { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                  { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                  { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
              },
              start_time:'',
              end_time:'',
              dialogRankingList:false,
              count:10,
              loading:false,
              recordsList:[
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'9月21日水费',
                    status:'success'
                  },
                ],
              tableData: [
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
                {
                  user_name: '李四',
                  user_id: '1223456789',
                  payment_project: '9-21日水费征收',
                  payment_id: 'fy123456',
                  payment_amount:100,
                  payment_status: 0,
                  deadline: '2021-10-21 08:01',
                  payment_time: '2021-10-10 08:01',
                  payment_type:'水费'
                },
              ],
              dialogFormVisible: false,
              payList:[
                  {
                    name:'9月21日水费',
                    progress:50,
                    status:''
                  },
                  {
                    name:'9月21日电费',
                    progress:30,
                    status:'exception'
                  },
                  {
                    name:'9月21日物业费',
                    progress:60,
                    status:''
                  },
                  {
                    name:'9月21日停车费',
                    progress:80,
                    status:'success'
                  },
                  {
                    name:'9月21日水费',
                    progress:50,
                    status:''
                  },
                  {
                    name:'9月21日电费',
                    progress:30,
                    status:'exception'
                  },
                  {
                    name:'9月21日物业费',
                    progress:60,
                    status:''
                  },
                  {
                    name:'9月21日停车费',
                    progress:80,
                    status:'success'
                  },
                {
                    name:'9月21日水费',
                    progress:50,
                    status:''
                  },
                  {
                    name:'9月21日电费',
                    progress:30,
                    status:'exception'
                  },
                  {
                    name:'9月21日物业费',
                    progress:60,
                    status:''
                  },
                  {
                    name:'9月21日停车费',
                    progress:80,
                    status:'success'
                  },
              ],
          };
        },
        computed: {
          noMore () {
            return this.count >= 20
          },
          disabled () {
            return this.loading || this.noMore
          }
        },
        methods:{
            drawDataCharts(){
              var chartDom = document.getElementById('main');
              var myChart = echarts.init(chartDom);
              var option;
              option = {
                title: {
                  subtext: '2019-9-12',
                  left: 'left'
                },
                tooltip: {
                  trigger: 'axis',
                  formatter:function (params) {
                    return params[0].name+'<br/>已缴费:'+params[1].value+'人<br/>未缴费:'+params[0].value+'人<br/>缴费占比:'+params[2].value+'%'
                  },
                  axisPointer: {
                    type: 'cross',
                    crossStyle: {
                      color: '#999'
                    }
                  }
                },
                legend: {
                  data: ['未缴费', '已缴费', '缴费占比']
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['水费', '电费', '物业费', '停车费'],
                    axisPointer: {
                      type: 'shadow'
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '人数',
                    min: 0,
                    max: 5000,
                    interval: 500,
                  },
                  {
                    type: 'value',
                    name: '缴费占比',
                    min: 0,
                    max: 100,
                    interval: 10,
                    axisLabel: {
                      formatter: '{value} %'
                    }
                  }
                ],
                series: [
                  {
                    name: '未缴费',
                    type: 'bar',
                    data: [5,1000,1500,2000,2500]
                  },
                  {
                    name: '已缴费',
                    type: 'bar',
                    data: [1500,2000,2500,3000,3500]
                  },
                  {
                    name: '缴费占比',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [10,20,30,40]
                  }
                ]
              };
              option && myChart.setOption(option);
            },
            consentApply(index, row) {
              row.payment_status=1
              console.log(index, row);
            },
            rejectsApply(index, row) {
              this.dialogFormVisible=true
              row.payment_status=0
              console.log(index, row);
            },
            load () {
              this.loading = true
              setTimeout(() => {
                this.count += 2
                this.loading = false
              }, 2000)
            },
            submitForm(formName) {
              this.dialogFormVisible = false
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  alert('submit!');
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },
            resetForm(formName) {
              this.dialogFormVisible=false
              this.$refs[formName].resetFields();
            }
        },
        mounted:function () {
          this.drawDataCharts()
        } ,
        updated:function () {
          this.drawDataCharts()
        }
    }
</script>

