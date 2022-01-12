<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
    active-text-color="#409EFF"
    >
      <el-menu-item index="1">待我审批</el-menu-item>
      <el-menu-item index="2">申请记录</el-menu-item>
      <el-menu-item index="3">我已处理</el-menu-item>
        <el-button type="primary" style="float: right" @click="dialogFormVisible=true">申请权限</el-button>
        <el-dialog title="申请权限" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="申请人：" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="可选权限：" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
    </el-menu>
    <div class="block">
        <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
        <el-input v-model="input" placeholder="请输入关键字" style="width: 250px;margin-left: 30px"></el-input>
    </div>
     <el-table
    ref="multipleTable"
    :data="pendingData"
    tooltip-effect="dark"
    style="width: 100%"
     height="630px">
       <el-table-column
      type="index"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="150px">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="申请人"
    width="80px">
    </el-table-column>
    <el-table-column
      prop="id"
      label="账号">
    </el-table-column>
     <el-table-column
      prop="privilege"
      label="申请权限">
    </el-table-column>
    <el-table-column
      label="事件等级">
      <template slot-scope="props">
        <el-tag :type="props.row.grade===0?'':props.row.grade===1?'warning':'danger'">
          <span>{{props.row.grade===0?'常规':props.row.grade===1?'紧急':'加急'}}</span>
        </el-tag>
      </template>
    </el-table-column>
     <el-table-column
      prop="purpose"
      label="权限用途"
     width="200px">
    </el-table-column>
     <el-table-column
       v-if="pageNum!=='1'"
       :label="pageNum==='2'?'申请状态':'处理结果'">
        <template slot-scope="props">
        <el-tag v-if="pageNum==='2'" :type="props.row.status===0?'':props.row.status===1?'success':'danger'">
          <span>{{props.row.status===0?'申请中':props.row.status===1?'已同意':'已拒绝'}}</span>
        </el-tag>
          <el-tag v-else :type="props.row.status===1?'success':'danger'">
          <span>{{props.row.status===1?'已同意':'已拒绝'}}</span>
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
        <el-button v-if="pageNum==='1'" type="success" size="mini">通过</el-button>
        <el-button v-if="pageNum==='1'" type="danger" size="mini">驳回</el-button>
        <el-button v-if="pageNum==='2'" type="primary" size="mini">编辑</el-button>
        <el-button v-if="pageNum==='2'" type="danger" size="mini">取消</el-button>
        <el-button v-if="pageNum==='3'" type="danger" size="mini">删除</el-button>
    </el-table-column>
  </el-table>
    <div class="block" style="text-align: center">
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </div>
</template>

<script>
    export default {
        name: "permission_setting",
       data() {
        return {
          pageNum:'1',
          input: '',
          activeIndex: '1',
          value2:'',
          dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
          pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
          pendingData: [
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:0
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:1
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:-1
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:0
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:1
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:-1
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:0
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:1
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:-1
            },
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:-1
            }
          ],
          processedData:[
            {
              date: '2016-05-03 08:01:01',
              name: '王小虎',
              id:'123456789',
              privilege:'信息更新',
              grade:0,
              purpose:'对张三的个人信息进行更新',
              status:0
            },
          ]
        };
      },
      methods: {
        handleSelect(key) {
          this.pageNum=key
        },
      }
    }
</script>

<style scoped>
  .block{
    text-align: left;
    margin: 20px 0;
  }

</style>
