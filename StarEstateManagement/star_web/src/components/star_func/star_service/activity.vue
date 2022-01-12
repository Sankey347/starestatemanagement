<template>
  <div>
      <el-row style="margin-left: 75px">
      <el-col :span="7">
        <el-card>
          <div slot="header" class="clearfix">
            <b>活动参与占比</b>
            <form-dialog dialog_title="发布新活动"></form-dialog>
          </div>
          <div class="infinite-list-wrapper">
            <ul
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled">
              <li v-for="message_item in activitiesList" class="list-item">
                <span>{{message_item.name}}:</span>
                <el-progress class="progress_data" :text-inside="true" :stroke-width="20" :percentage="message_item.progress" :status="message_item.status"></el-progress>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" offset="1">
        <el-card>
          <div slot="header" class="clearfix">
            <b>活动人数榜单</b>
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogRankingList=true">完整榜单</el-button>
            <el-dialog title="完整榜单" :visible.sync="dialogRankingList" width="30%" center>
              <div class="infinite-list-wrapper">
                <ul
                  class="ranking_data"
                  v-infinite-scroll="load"
                  infinite-scroll-disabled="disabled">
                  <li>
                <img src="../../../../static/images/one.png" alt="">公共志愿者活动日
                <span>261人</span>
              </li>
                  <li>
                    <img src="../../../../static/images/two.png" alt="">社区亲子活动日
                    <span>160人</span>
                  </li>
                  <li>
                    <img src="../../../../static/images/three.png" alt="">社区文化活动日
                    <span>50人</span>
                  </li>
                  <li  v-for="i in count">
                      <img src="../../../../static/images/activity.png" alt="">社区文化活动日
                      <span>261人</span>
                  </li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div>
            </el-dialog>
          </div>
            <ul class="ranking_list">
              <li>
                <img src="../../../../static/images/one.png" alt="">公共志愿者活动日
                <span>261人</span>
              </li>
              <li>
                <img src="../../../../static/images/two.png" alt="">社区亲子活动日
                <span>160人</span>
              </li>
              <li>
                <img src="../../../../static/images/three.png" alt="">社区文化活动日
                <span>50人</span>
              </li>
            </ul>
        </el-card>
      </el-col>
      <el-col :span="7" offset="1">
        <el-card class="activity">
          <div slot="header" class="clearfix">
            <b>活动报名信息</b>
          </div>
           <vue-seamless-scroll :data="recordsList" class="warp">
            <ul>
              <li  v-for="(message_item,index) in recordsList " :key="index">
                <i class="el-icon-edit"></i>
                <span>{{message_item.time}}---{{message_item.task}}</span>
                <el-tag size="mini" style="float:right" :type="message_item.status">{{message_item.status==='success'?'已受理':'未受理'}}</el-tag>
              </li>
            </ul>
          </vue-seamless-scroll>
        </el-card>
      </el-col>
    </el-row>
      <el-table
      :data="tableData"
       height="618px">
        <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="申请人：" style="margin-left: 114px">
              <span>{{ props.row.applicant }}</span>
            </el-form-item>
            <el-form-item label="账号：" style="margin-left: 114px">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="性别：" style="margin-left: 127px">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="年龄：" >
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="联系电话：">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="申请状态：">
              <span>{{props.row.apply_status===0?'待处理':props.row.apply_status===1?'已同意':'已拒绝'}}</span>
            </el-form-item>
            <el-form-item label="申请时间：">
              <span>{{ props.row.apply_time }}</span>
            </el-form-item>
            <el-form-item label="处理时间：">
              <span>{{ props.row.process_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
        <el-table-column
        type="index"
        width="40">
      </el-table-column>
        <el-table-column
          label="活动名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="start_time">
        </el-table-column>
        <el-table-column
          label="结束时间"
          prop="end_time">
        </el-table-column>
        <el-table-column
          label="人数限制"
          prop="people_num">
        </el-table-column>
        <el-table-column
          label="活动状态">
          <template slot-scope="props">
            <el-tag :type="props.row.activity_status===1?'success':''">{{props.row.activity_status===0?'进行中':'已结束'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="申请人"
          prop="applicant">
        </el-table-column>
        <el-table-column
          label="申请状态">
           <template slot-scope="props">
            <el-tag :type="props.row.apply_status===0?'danger':props.row.apply_status===1?'success':''">
              {{props.row.apply_status===0?'已拒绝':props.row.apply_status===1?'已同意':'待处理'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="success"
          @click="consentApply(scope.$index,scope.row)">同意</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="rejectsApply(scope.$index, scope.row)">拒绝</el-button>
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
    export default {
        name: "activity",
        components: {
        vueSeamlessScroll
      },
        data(){
          return{
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
            tableData: [
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
                name: '志愿者服务日',
                start_time: '2021-09-21 08:03',
                end_time: '2021-10-21 08:03',
                people_num: 10,
                activity_status:0,
                applicant: '张三',
                apply_status: 0,
                id: '10333',
                sex:'男',
                age:'23',
                phone:'12345677901',
                apply_time:'2021-09-22 08:00:01',
                process_time:'2021-09-23 08:00:01'
              },
              {
              name: '志愿者服务日',
              start_time: '2021-09-21 08:03',
              end_time: '2021-10-21 08:03',
              people_num: 10,
              activity_status:0,
              applicant: '张三',
              apply_status: 0,
              id: '10333',
              sex:'男',
              age:'23',
              phone:'12345677901',
              apply_time:'2021-09-22 08:00:01',
              process_time:'2021-09-23 08:00:01'
            },
              {
              name: '志愿者服务日',
              start_time: '2021-09-21 08:03',
              end_time: '2021-10-21 08:03',
              people_num: 10,
              activity_status:0,
              applicant: '张三',
              apply_status: 0,
              id: '10333',
              sex:'男',
              age:'23',
              phone:'12345677901',
              apply_time:'2021-09-22 08:00:01',
              process_time:'2021-09-23 08:00:01'
            }

          ],
             dialogFormVisible: false,
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
           consentApply(index, row) {
             row.apply_status=1
        console.log(index, row);
      },
      rejectsApply(index, row) {
             this.dialogFormVisible=true
             row.apply_status=0
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
      }
    }
</script>

