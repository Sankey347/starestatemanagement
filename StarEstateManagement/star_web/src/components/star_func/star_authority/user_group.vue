<template>
  <div>
    <el-card class="group-card">
     <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="用户组名称：">
     <el-select
    v-model="value"
    filterable
    allow-create
    default-first-option
    placeholder="请选择用户组">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button id="history" @click="dialogTableVisible=true">
    <img src="../../../../static/images/history.png" alt="">
    历史记录
  </el-button>
    <el-dialog title="用户组编辑历史" :visible.sync="dialogTableVisible" width="65%">
      <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
      height="402px">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="操作人：">
            <span>{{ props.row.user_name }}</span>
          </el-form-item>
          <el-form-item label="用户组：">
            <span>{{ props.row.group_name }}</span>
          </el-form-item>
          <el-form-item label="原权限：">
            <span>{{ props.row.old }}</span>
          </el-form-item>
          <el-form-item label="新权限：">
            <span>{{ props.row.new }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
        type="index"
        width="40">
      </el-table-column>
    <el-table-column
      label="日期"
      prop="date" width="150px">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="user_name">
    </el-table-column>
    <el-table-column
      label="账号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="用户组"
      prop="group_name">
    </el-table-column>
    <el-table-column
      label="动作"
      prop="operation">
    </el-table-column>
        <el-table-column
      align="right">
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
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
       <div class="block" style="text-align: center">
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
    </el-dialog>
  </el-form-item>
  <el-form-item label="权限分配：">
    <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入关键字"
    v-model="value"
    :data="data"
    :titles="['所有权限', '已选权限']"
    :button-texts="['回收', '授权']"
    >
  </el-transfer>
  </el-form-item>
  <el-form-item class="menu-button">
    <el-button type="danger" @click="onSubmit">
      <img src="../../../../static/images/deleteGroup.png" alt="">
      删除
    </el-button>
     <el-button type="primary" @click="onSubmit">
       <img src="../../../../static/images/saveGroup.png" alt="">
       保存
     </el-button>
     <el-button type="primary" @click="onSubmit">
       <img src="../../../../static/images/addGroup.png" alt="">
       新建
     </el-button>
  </el-form-item>
</el-form>
    </el-card>

  </div>
</template>

<script>
  export default {
    name:'user_group',
    data() {
       const generateData = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
          tableData: [
            {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            },
            {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            },
            {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            },
            {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            },
            {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            },
             {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            },
            {
              user_name: '张三',
              group_name:'超级管理员',
              old:'增删查',
              new:'增删查改',
              date:'2021-09-21 08:05:01',
              id:'123456789',
              operation:'新增权限'
            }
        ],
        dialogTableVisible: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        name_value: '',
        data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
       handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
