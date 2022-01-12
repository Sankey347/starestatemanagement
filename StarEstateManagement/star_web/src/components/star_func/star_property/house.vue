<template>
  <div>
    <div id="show_message">
        <el-card class="text_show">
          <div slot="header" class="clearfix">
            <b>房屋使用情况</b>
            <form-dialog dialog_title="发布新活动"></form-dialog>
          </div>
          <div class="infinite-list-wrapper">
            <ul
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled">
              <li v-for="message_item in carList" class="list-item">
                <span>{{message_item.name}}:</span>
                <el-progress class="progress_data" :text-inside="true" :stroke-width="20" :percentage="message_item.progress" :status="message_item.status"></el-progress>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card class="data_show">
          <div slot="header" class="clearfix">
            <b >房屋使用数据展示</b>
          </div>
          <div id="main"></div>
        </el-card>
        <el-card class="text_show">
          <div slot="header" class="clearfix">
            <b >房屋使用信息</b>
          </div>
           <vue-seamless-scroll :data="recordsList" class="warp">
            <ul>
              <li  v-for="(message_item,index) in recordsList " :key="index">
                <img src="../../../../static/images/room.png" style="width: 15px;height: 15px" alt="">
                <span>{{message_item.time}}-{{message_item.name}}-{{message_item.project}}</span>
                <el-tag size="mini" style="float:right;margin-top: 5px" >入住成功</el-tag>
              </li>
            </ul>
          </vue-seamless-scroll>
        </el-card>
    </div>
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
            <el-form-item :label="props.row.room_type?'购买金额：':'屋主姓名：'">
              <span>{{ props.row.amount_name }}</span>
            </el-form-item>
            <el-form-item :label="props.row.room_type?'房屋状态：':'屋主账号：'">
              <span v-if="props.row.room_type">{{props.row.status_id?'使用中':'已到期'}}</span>
              <span v-else>{{props.row.status_id}}</span>
            </el-form-item>
            <el-form-item :label="props.row.room_type?'购买时间：':'房屋租金：'">
              <span>{{ props.row.time_amount }}</span>
            </el-form-item>
            <el-form-item :label="props.row.room_type?'入住时间：':'居住时长：'">
              <span>{{ props.row.checkIn_reside }}</span>
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
          label="房屋类型">
          <template slot-scope="props">
            <span>{{props.row.room_type?'居住':'租赁'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="房间号">
          <template slot-scope="props">
           <span>{{props.row.room_num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买时间">
          <template slot-scope="props">
            <span>{{props.row.time_amount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="入住时间">
           <template slot-scope="props">
            <span>{{props.row.checkIn_reside}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="房屋状态">
            <template slot-scope="props">
            <el-tooltip effect="dark" content="Top Center 提示文字" placement="top">
              <el-tag :type="props.row.status_id?'success':props.row.status_id===0?'danger':'warning'">
                {{props.row.status_id===1?'使用中':props.row.status_id===0?'已到期':'将到期'}}
              </el-tag>
            </el-tooltip>
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
          type="primary"
          @click="consentApply(scope.$index,scope.row)">提醒用户</el-button>
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
        name: "house",
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
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                  {
                    time:'09-25 09:01',
                    name:'张三',
                    project:'A区9栋901',
                    status:'success'
                  },
                ],
              tableData: [
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:'李四',
                  status_id: 'wz123456',
                  time_amount: '100元/月',
                  checkIn_reside: '2个月',
                  room_type:0,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
                {
                  user_name: '张三',
                  user_id: '1223456789',
                  payment_project:'A区9栋901入住办理',
                  payment_id: 'fy123456',
                  amount_name:100,
                  status_id: 0,
                  time_amount: '2021-10-21 08:01',
                  checkIn_reside: '2021-11-21 08:01',
                  room_type:1,
                  room_num:'A区9栋901'
                },
              ],
              dialogFormVisible: false,
              carList:[
                  {
                    name:'整体房屋使用情况',
                    progress:50,
                    status:''
                  },
                  {
                    name:'A区房屋使用情况',
                    progress:30,
                    status:'exception'
                  },
                  {
                    name:'B区房屋使用情况',
                    progress:60,
                    status:''
                  },
                  {
                    name:'C区房屋使用情况',
                    progress:80,
                    status:'success'
                  },
                  {
                    name:'D区房屋使用情况',
                    progress:50,
                    status:''
                  },
                  {
                    name:'E区房屋使用情况',
                    progress:30,
                    status:'exception'
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
                    return params[0].name+'房屋<br/>入住:'+params[1].value+'个<br/>空房:'+params[0].value+'个<br/>入住占比:'+params[2].value+'%'
                  },
                  axisPointer: {
                    type: 'cross',
                    crossStyle: {
                      color: '#999'
                    }
                  }
                },
                legend: {
                  data: ['未使用', '已使用', '使用占比']
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['A区', 'B区', 'C区','D区','E区'],
                    axisPointer: {
                      type: 'shadow'
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '房屋数',
                    min: 0,
                    max: 100,
                    interval: 10,
                  },
                  {
                    type: 'value',
                    name: '入住占比',
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
                    name: '未使用',
                    type: 'bar',
                    data: [10,15,50,20,25]
                  },
                  {
                    name: '已使用',
                    type: 'bar',
                    data: [90,85,50,80,75]
                  },
                  {
                    name: '使用占比',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [90,85,50,80,75]
                  }
                ]
              };
              option && myChart.setOption(option);
            },
            consentApply(index, row) {
              row.status_id=1
              console.log(index, row);
            },
            rejectsApply(index, row) {
              this.dialogFormVisible=true
              row.status_id=0
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


