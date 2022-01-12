<template>
    <div id="payments_box">
      <el-card class="box-card">
        <h2 class="page_title">服务报修</h2>
        <el-button type="danger" id="feedback">
          <img src="../../../static/images/feedback.png" alt="">
          报错
        </el-button>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        <el-cascader
          v-model="value"
          :options="repairsOptions"
          placeholder="请选择类别"
          @change="handleChange"></el-cascader>
        <el-date-picker
          v-model="targetTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>

        <el-button type="primary" id="refresh">
          <img src="../../../static/images/refresh.png" alt="">
          刷新
        </el-button>
        <el-button type="warning" v-if="value[0]!=='服务'">
          <img src="../../../static/images/repairs.png" alt="">
          报修
        </el-button>
        <el-button type="success">
          <img src="../../../static/images/export.png" alt="">
          导出
        </el-button>
        <el-dialog title="用户缴费" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="缴费项目" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="缴费项目" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="报修/供水设施" value="报修/供水设施"></el-option>
                <el-option label="报修/供电设施" value="报修/供电设施"></el-option>
                <el-option label="报修/消防设施" value="报修/消防设施"></el-option>
                <el-option label="报修/其他" value="报修/其他"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="tableData"
          id="data_list"
          height="670"
        >
          <el-table-column
            label="编号"
            width="150"
            type="index"
          >
          </el-table-column>
          <el-table-column
            label="任务名"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="申请人"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="任务时间"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.money_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.money_num }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单号"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.order_number }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.message }}</p>
                <p>住址: {{ scope.row.message }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.status }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.type.substr(0,2)==='报修'">
                <el-button
                v-if="scope.row.status==='待缴费'"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">立即缴费</el-button>
              <el-button
                v-if ="scope.row.status==='已完成'"
                size="small"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">任务评价</el-button>
              <el-button
                v-if="scope.row.status==='维修中'"
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看进度</el-button>
              </div>
              <div v-else>
                <el-button
                v-if="scope.row.status==='可申请'"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">立即申请</el-button>
              <el-button
                v-if="scope.row.status==='进行中'"
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看进度</el-button>
              <el-button
                v-if="scope.row.status==='已完成'"
                size="small"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">服务评价</el-button>
              </div>

            </template>
          </el-table-column>
        </el-table>
         <div class="page_num">
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
      </div>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "repairs",
        data() {
          return {
            payFlag:true,
            value:'',
            restaurants: [],
            state: '',
            timeout:  null,
            activeName: '1',
            targetTime:'',
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
            repairsOptions:[
              {
              value:'服务',
              label:'服务',
              children:[
                  {
                    value:'社区活动',
                    label: '社区活动'
                },
              ]
            },
              {
              value:'报修',
              label:'报修',
              children:[
                  {
                    value:'供水设施',
                    label: '供水设施'
                },
                {
                    value:'供电设施',
                    label: '供电设施'
                },{
                    value:'消防设施',
                    label: '消防设施'
                },
                {
                    value:'其他',
                    label: '其他'
                },
              ]
            }
            ],
            tableData: [
              {
              id:1,
              date: '水管破裂',
              name: '王小虎',
              type:'报修/供水设施',
              money_name:'2021-01-02',
              money_num:30,
              order_number:'123456789',
              status:'待缴费',
              message: '逾期1个月'
          },
              {
              id:2,
              date: '煤气管漏气',
              name: '王小虎',
              type:'报修/其他',
              money_name:'2021-01-02',
              money_num:30,
              order_number:'123456789',
              status:'维修中',
              message: '逾期1个月'
          },
              {
              id:3,
              date: '电表异常',
              name: '王小虎',
              type:'报修/供电设施',
              money_name:'2021-01-02',
              money_num:30,
              order_number:'123456789',
              status:'维修中',
              message: '逾期1个月'
          },
              {
              id:4,
              date: '电梯故障',
              name: '王小虎',
              type:'报修/其他',
              money_name:'2021-01-02',
              money_num:30,
              order_number:'123456789',
              status:'维修中',
              message: '逾期1个月'
          },
              {
              id:5,
              date: '社区志愿者',
              name: '',
              type:'服务/社区活动',
              money_name:'2021-01-02',
              money_num:30,
              order_number:'123456789',
              status:'进行中',
              message: '逾期1个月'
          },
            ],
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
            formLabelWidth: '120px'
          };
        },
        methods:{
          handleEdit(index, row) {
            console.log(index, row);
          },
          handleDelete(index, row) {
            this.dialogFormVisible=true
            console.log(index, row);
          },
          handleChange(value) {
            console.log(value);
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

