<template>
  <div>
    <div id="list_menu">
      <el-button  type="warning" >
      <img src="../../../../static/images/import.png" alt="">导入
    </el-button>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入姓名"
        @select="handleSelect"
      ></el-autocomplete>
       <el-cascader
        :options="statusOptions"
        :props="{ checkStrictly: true }"
        placeholder="请选择维修状态"
        clearable>
       </el-cascader>
      <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
    </el-date-picker>
      <el-button type="primary" style="margin-left: 20px">
        <img src="../../../../static/images/refresh.png" alt="">刷新
      </el-button>
      <el-button type="success">
        <img src="../../../../static/images/export.png" alt="">导出
      </el-button>
    </div>
    <el-table
    :data="tableData"
    height="578"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand" >
          <el-form-item label="申请人：">
            <span>{{ props.row.applicant }}</span>
          </el-form-item>
          <el-form-item label="维修师傅：" style="margin-left: 114px">
            <span>{{ props.row.serviceman }}</span>
          </el-form-item>
          <el-form-item label="性别：" style="margin-left: 114px">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="师傅工号：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="电话：" style="margin-left: 114px">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="维修任务：">
            <span>{{ props.row.task }}</span>
          </el-form-item>
          <el-form-item label="住址：" style="margin-left: 114px">
            <span>{{ props.row.room }}</span>
          </el-form-item>
          <el-form-item label="维修类型：">
            <span>{{ props.row.type }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      label="维修任务">
      <template slot-scope="props">
        <span>{{props.row.task}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="维修类型">
      <template slot-scope="props">
        <span>{{props.row.type}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="申请人">
      <template slot-scope="props">
        <span>{{props.row.applicant}}</span>
    </template>
    </el-table-column>
    <el-table-column
      label="维修状态">
      <template slot-scope="props">
        <el-tag  :type="props.row.status===0?'danger':props.row.status===3?'success':''">
          {{props.row.status===0?'未受理':props.row.status===3?'已完成':'维修中'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="申请时间"
      prop="apply_time">
    </el-table-column>
    <el-table-column
      label="完成时间"
      prop="finish_time">
    </el-table-column>
    <el-table-column
      label="维修师傅">
      <template slot-scope="props">
        <el-select v-model="props.row.serviceman"  placeholder="请选择" v-if="props.row.status===1" @change="setServicemanId($event,props.row)">
          <el-option
            v-for="item in servicemanList"
            :key="item.value.id"
            :label="item.label"
            :value="item.value.name"
            :disabled="item.value.busy">
          </el-option>
        </el-select>
        <span v-else>{{props.row.serviceman}}</span>
      </template>


    </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="props">
        <el-button v-if="props.row.status===0" type="success" size="mini" @click="confirmTask(props.$index,props.row)">接受</el-button>
        <el-button
          size="mini"
          type="warning"
          v-else-if="props.row.status===1"
          @click="assignTask(props.$index,props.row)">指派</el-button>
        <el-button
          size="mini"
          type="primary"
          v-else-if="props.row.status===2"
          @click="finishTask(props.$index,props.row)">完成</el-button>
        <el-button
          v-else-if="props.row.status===3"
          size="mini"
          type="danger"
          @click="handleDelete(props.$index, props.row)">删除</el-button>
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
  export default {
    name: 'maintain',
    data () {
      return {
        admin_flag: '0',
          servicemanList:[
              {
                label:'小王',
                value:{
                  name: '小王',
                  id:'1001',
                  busy:false
                }
              },
              {
                label: '小李',
                value:{
                  name:'小李',
                  id:'1002',
                  busy:false
                },
              },
              {
                label: '小刘',
                value:{
                  name:'小刘',
                  id:'1003',
                  busy:false
                },
              }
          ],
           tableData: [
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              },
             {
                task: '水管漏水',
                type: '供水设施',
                applicant: '张三',
                status: 0,
                apply_time: '2021-09-21 08:01',
                finish_time: '2021-09-30 08:01',
                serviceman: '',
               sex:'男',
               id:'23',
               phone:'12345677901',
               room:'A9302',
              }
          ],
            status:[
              {
                value:'1',
                label:'正常'
              },
              {
                value:'0',
                label: '监控'
              },
              {
                value: '-1',
                label: '异常'
              }
              ],
            statusOptions: [
          {
            value: '0',
            label: '供水设施',
            children:[
              {
                value:'1',
                label:'未受理'
              },
              {
                value:'0',
                label: '维修中'
              },
              {
                value: '-1',
                label: '已完成'
              }
              ]
        },
          {
          value: '1',
          label: '供电设施',
          children:[
              {
                value:'1',
                label:'未受理'
              },
              {
                value:'0',
                label: '维修中'
              },
              {
                value: '-1',
                label: '已完成'
              }
              ]
        },
          {
          value: '2',
          label: '消防设施',
          children:[
              {
                value:'1',
                label:'未受理'
              },
              {
                value:'0',
                label: '维修中'
              },
              {
                value: '-1',
                label: '已完成'
              }
              ]
        },
          {
          value: '3',
          label: '其他',
          children:[
              {
                value:'1',
                label:'未受理'
              },
              {
                value:'0',
                label: '维修中'
              },
              {
                value: '-1',
                label: '已完成'
              }
              ]
        },
        ],
           identityOptions: [
             {
                value: '0',
                label: '普通用户'
              },
             {
                value: '1',
                label: '普通管理员'
              },
             {
                value: '2',
                label: '超级管理员'
              },
             ],
        identity: '',
        pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
            value: '',
            restaurants: [],
            state: '',
            timeout:  null,
      }
    },
     methods: {
      setServicemanId(value,row,status='start'){
        for (var i=0;i<this.servicemanList.length;i++){
          if (this.servicemanList[i].value.name===value){
            if (status==='finish'){
              this.servicemanList[i].value.busy=false
            }else{
              row.serviceman=value
              row.id=this.servicemanList[i].value.id
              this.servicemanList[i].value.busy=true
            }
          }
        }
      },
      handleChange(value) {
        console.log(value);
      },
      confirmTask(index, row) {
        row.status=1
        console.log(index, row);
      },
       assignTask(index, row) {
        row.status=2
        console.log(index, row);
      },
       finishTask(index, row) {
        row.status=3
        this.setServicemanId(row.serviceman,row,'finish')
        console.log(index, row);
      },

      handleDelete(index, row) {
        console.log(index, row);
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
