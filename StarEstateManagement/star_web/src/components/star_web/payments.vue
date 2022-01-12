<template>
    <div>
      <el-card class="box-card">
        <h2 class="page_title" style="background-color: #409EFF;">缴费情况</h2>
        <form-dialog dialog_title="错误反馈"></form-dialog>
        <el-autocomplete
          v-model="filterMoneyName"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入款项名"
          @select="handleSelect"
        ></el-autocomplete>
        <el-cascader
          v-model="filterType"
          :options="payOptions"
          placeholder="请选择费用类别"
          @change="handleChange"
        clearable></el-cascader>
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-switch
          v-model="dateFlag"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="发布时间"
          inactive-text="缴费时间"
          style="margin: 0 10px"
          :disabled="!filterTime"
        >
        </el-switch>
        <el-button type="primary" id="refresh" @click="openFullScreen">
          <img src="../../../static/images/refresh.png" alt="">
          刷新
        </el-button>
        <form-dialog dialog_title="更多操作"></form-dialog>
        <el-button type="success">
          <img src="../../../static/images/export.png" alt="">
          导出
        </el-button>
        <el-table
          v-loading="fullscreenLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="filterTableData"
          id="data_list"
          height="680"
          :default-sort = "{prop: 'release_time', order: 'descending'}"
        >
          <el-table-column
            label="编号"
            type="index"
            width="150">
          </el-table-column>

          <el-table-column
            label="款项名"
            width="150">
            <template slot-scope="scope">
              <span >{{ scope.row.money_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            width="150"
            prop="type"
            sortable>
            <template slot-scope="scope">
              <span >{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            width="150"
            prop="money_num"
            sortable>
            <template slot-scope="scope">
              <span >{{ scope.row.money_num }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布时间"
            prop="release_time"
            sortable
            width="150">
            <template slot-scope="scope">
              <span >{{ scope.row.release_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150"
            prop="status"
            sortable
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" v-if="scope.row.status==='未缴费'">
                <p>提示: {{ createMessage(scope.row.release_time) }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" type="danger">未缴费</el-tag>
                </div>
              </el-popover>
              <el-tag v-else size="medium" type="success">已缴费</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="缴费时间"
            width="150"
            prop="pay_time"
            sortable
          >
            <template slot-scope="scope">
              <span >{{ scope.row.pay_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单号"
            width="150"
          >
            <template slot-scope="scope">
              <span >{{ scope.row.payId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.payFlag"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">立即缴费</el-button>
              <el-button
                v-else
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
        name: "payments",
        data() {
          return {
            payFlag:true,
            filterType:'',
            restaurants: [],
            filterMoneyName: '',
            timeout:  null,
            activeName: '1',
            filterTime:'',
            dateFlag:true,
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
            payOptions:[
              {
                value:'支出',
                label: '支出',
                children: [
                  {
                    value:'其他费用',
                    label:'其他费用',
                    children:[
                        {
                          value:'未缴费',
                          label: '未缴费'
                      },
                      {
                          value:'已缴费',
                          label: '已缴费'
                      },
                    ]
                  },
                  {
                    value:'水费',
                    label:'水费',
                    children:[
                        {
                          value:'未缴费',
                          label: '未缴费'
                      },
                      {
                          value:'已缴费',
                          label: '已缴费'
                      },
                    ]
                  },
                  {
                    value:'电费',
                    label:'电费',
                    children:[
                        {
                          value:'未缴费',
                          label: '未缴费'
                      },
                      {
                          value:'已缴费',
                          label: '已缴费'
                      },
                    ]
                  },
                  {
                    value:'停车费',
                    label:'停车费',
                    children:[
                        {
                          value:'未缴费',
                          label: '未缴费'
                      },
                      {
                          value:'已缴费',
                          label: '已缴费'
                      },
                    ]
                  },
                  {
                    value:'物业费',
                    label:'物业费',
                    children:[
                        {
                          value:'未缴费',
                          label: '未缴费'
                      },
                      {
                          value:'已缴费',
                          label: '已缴费'
                      },
                    ]
                  },
                ]
              },
              {
                value: '收入',
                label: '收入',
                children: [
                  {
                    value:'房租',
                    label: '房租'
                  }
                ]
              }
            ],
            fullscreenLoading:false,
            tableData: [
              {
                  release_time: '2022-01-02 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/水费',
                  money_name:'九月份水费',
                  money_num:30,
                  payId:'123456789',
                  status:'未缴费',
                  payFlag:true,
              },
              {
                release_time: '2016-07-12 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/物业费',
                  money_name:'十月份物业费',
                  money_num:35,
                  payId:'115158481',
                  status:'已缴费',
                  payFlag:false,
              },
              {
                  release_time: '2011-09-02 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/电费',
                  money_name:'三月份电费',
                  money_num:120,
                  payId:'177777789',
                  status:'未缴费',
                  payFlag:true,
              },
              {
                  release_time: '2016-05-02 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/水费',
                  money_name:'九月份水费',
                  money_num:30,
                  payId:'123456789',
                  status:'未缴费',
                  payFlag:true,
              },
              {
                  release_time: '2016-07-12 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/物业费',
                  money_name:'十月份物业费',
                  money_num:35,
                  payId:'115158481',
                  status:'已缴费',
                  payFlag:false,
              },
              {
                  release_time: '2017-08-22 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/停车费',
                  money_name:'一月份停车费',
                  money_num:100,
                  payId:'11123456',
                  status:'已缴费',
                  payFlag:false,
              },
              {
                  release_time: '2011-09-02 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/电费',
                  money_name:'三月份电费',
                  money_num:120,
                  payId:'177777789',
                  status:'未缴费',
                  payFlag:true,
              },
              {
                  release_time: '2016-05-02 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/水费',
                  money_name:'十月份水费',
                  money_num:30,
                  payId:'123456788',
                  status:'未缴费',
                  payFlag:true,
              },
              {
                  release_time: '2016-05-02 08:01',
                  pay_time: '2021-08-10 08:01',
                  type:'支出/水费',
                  money_name:'十月份水费',
                  money_num:30,
                  payId:'123456788',
                  status:'已缴费',
                  payFlag:true,
              },
              {
                  release_time: '2016-07-12 08:01',
                  pay_time: '2021-09-10 08:01',
                  type:'支出/物业费',
                  money_name:'十月份物业费',
                  money_num:35,
                  payId:'115158481',
                  status:'已缴费',
                  payFlag:false,
              },
            ]
          };
        },
        methods:{
          openFullScreen() {
            this.fullscreenLoading = true;
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 2000);
          },
          createMessage(time){
            let message_time=(new Date()-new Date(time))/1000/60/60/24
            return '已逾期'+parseInt(''+message_time)+'天'
          },
          handleEdit(index, row) {
            console.log(index, row);
          },
          handleDelete(index, row) {
            console.log(index, row);
          },
          handleChange(filterType) {
            console.log(filterType);
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
            return (filterMoneyName) => {
              return (filterMoneyName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          handleSelect(item) {
            console.log(item);
          }
        },
      computed:{
        filterTableData(){
          return this.tableData.filter((item)=>{
            return !this.filterMoneyName||item.money_name===this.filterMoneyName
          }).filter((item)=>{
                return this.filterType.length? item.type===(this.filterType[0]+'/'+this.filterType[1])&&item.status===this.filterType[2]:true
          }).filter((item)=>{
            return !this.filterTime || new Date(this.dateFlag?item.release_time:item.pay_time)>=new Date(this.filterTime[0])&&new Date(this.dateFlag?item.release_time:item.pay_time)<=new Date(this.filterTime[1])
          })
        }
      },
        mounted() {
          this.restaurants = this.tableData.map(item=>({
            value:item.money_name
          }));
        }
    }
</script>


