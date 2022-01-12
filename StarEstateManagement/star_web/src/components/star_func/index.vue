<style>
  @import "../../../static/css/admin_index.css";
</style>
<template>
    <div id="amdin_box">
      <el-container>
        <el-header>
          <div id="admin_header">
            <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#0e9bfd"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1">
                  <a href="/"><img id="logo" src="../../../static/images/admin.png" alt="星星小区物业"></a>
              </el-menu-item>
               <el-dropdown  style="float: right">
                  <span class="el-dropdown-link">
                    <img id="head_portrait" src="../../../static/images/msg.png" :style="{'border':user_leave['Ordinary Users']}" alt="">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <div id="info">
                      <p>赵懿轩</p>
                      <p>Ordinary Users</p>
                    </div>
                    <el-dropdown-item>
                      <form-dialog dialog_title="个人信息"></form-dialog>
                    </el-dropdown-item>
                    <el-dropdown-item>
                       <el-badge :value="200" :max="99" >
                          <span @click="show_message">消息通知</span>
                        </el-badge>
                    </el-dropdown-item>
                    <el-dropdown-item id="user_web">
                      <router-link  to="/">
                        <span>前台页面</span>
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span @click="login_state=false">安全退出</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
        <el-menu-item index="3" style="float: right">
          <img id="time" src="../../../static/images/admintime.png" alt="">
          <span>{{this.nowTime}}</span>
        </el-menu-item>
      </el-menu>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px" style="height: 100%">
            <el-row class="tac">
              <el-col :span="24">
                <el-menu
                  unique-opened="true"
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#0e9bfd"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <img src="../../../static/images/data_show.png">
                    <span>数据管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">
                      <router-link id="data_show" to="/admin/data/show">数据展示</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                      <router-link to="/admin/data/user">用户列表</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                      <router-link to="/admin/data/record">访客记录</router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <img src="../../../static/images/service.png" alt="">
                    <span>服务管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">
                      <router-link to="/admin/service/activity">活动发布</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                      <router-link to="/admin/service/maintain">维修管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                      <router-link to="/admin/service/complaint">服务评价</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-4">
                      <router-link to="/admin/service/message">留言评论</router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <img src="../../../static/images/property.png" alt="">
                    <span>资产管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">
                      <router-link to="/admin/property/money">资金收缴</router-link>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                      <router-link to="/admin/property/car">车位管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                      <router-link to="/admin/property/house">房屋管理</router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <img src="../../../static/images/authority.png" alt="">
                    <span>权限管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1">
                      <router-link to="/admin/authority/group">用户组管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                      <router-link to="/admin/authority/setting">权限审核</router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <img src="../../../static/images/setting.png" alt="">
                    <span>系统管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="5-1">
                      <router-link to="/admin/system/log">系统日志</router-link>
                    </el-menu-item>
                    <el-menu-item index="5-2">
                      <router-link to="/admin/system/monitoring">数据监控</router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
            </el-row>
        </el-aside>
          <el-main>
            <el-drawer
            title="消息通知"
            :visible.sync="drawer"
            :with-header="false">
            <ul>
              <li>
                  <el-alert
                    v-for="(message_item,message_key) in message_list "
                    :key="message_key"
                    :title="message_item['title']"
                    :type="message_item['type']"
                    :description="message_item['content']"
                    show-icon
                    @close="close_drawer(message_key)"
                  >
                  </el-alert>
              </li>
            </ul>
          </el-drawer>
            <div class="header_menu">
              <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            </div>
            <router-view></router-view>
        </el-main>
        </el-container>
      </el-container>
    </div>

</template>
<script>
    import echarts from 'echarts'
    export default {

        name: "index",
      data() {
            return {
              drawer:false,
              message_list:[
              {
                title:'成功',
                content:'这是一条成功的消息',
                type:'success'
              },
              {
                title:'错误',
                content:'这是一条错误的消息',
                type:'error'
              },
              {
                title:'警告',
                content:'这是一条警告的消息',
                type:'warning'
              },
              {
                title:'消息',
                content:'这是一条普通的消息',
                type:'info'
              }
            ],
              user_leave:{
                'Ordinary Users':'3px solid #ACF5A7',
                'Administrators':'3px solid #85BBF9',
                'Super Administrator':'3px solid #A47ADC'
            },
                login_state:true,
                quality: null,
                chartPie: null,
              nowTime: new Date(),
            }
        },
       methods: {
          close_drawer(key){
            if (key===this.message_list.length-1){
              this.drawer=false
            }
          },
           show_message(){
            this.drawer=true;
          },
          appendZero(time){
          if (time < 10) {
            return "0" + time;
          }else {
            return time;
          }
        },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       drawLineChart() {
              this.quality = echarts.init(document.getElementById('quality'));
              this.quality.setOption({
                  title: {
                      text: "服务质量评价"
                  },
                  tooltip: {
                      trigger: 'axis'
                  },
                  legend: {
                      data: ['优秀', '良好', '一般']
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                          name: '优秀',
                          type: 'line',
                          stack: '总量',
                          data: [120, 132, 101, 134, 90, 230, 210]
                      },
                      {
                          name: '良好',
                          type: 'line',
                          stack: '总量',
                          data: [220, 182, 191, 234, 290, 330, 310]
                      },
                      {
                          name: '一般',
                          type: 'line',
                          stack: '总量',
                          data: [820, 932, 901, 934, 1290, 1330, 1320]
                      }
                  ]
              });
          },
        drawPayPieChart() {
            this.chartPie = echarts.init(document.getElementById('pay'));
            this.chartPie.setOption({
                title: {
                    text: '用户缴费情况',
                    subtext: '2021/11/16',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['水费', '电费', '物业费', '停车费']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '水费' },
                            { value: 310, name: '电费' },
                            { value: 234, name: '物业费' },
                            { value: 135, name: '停车费' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },
         drawMaintainPieChart() {
            this.chartPie = echarts.init(document.getElementById('maintain'));
            this.chartPie.setOption({
                title: {
                    text: '用户报修情况',
                    subtext: '2021/11/16',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['供水设施', '电器设施', '公共设施','其他']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 835, name: '供水设施' },
                            { value: 350, name: '电器设施' },
                            { value: 104, name: '公共设施' },
                            { value: 155, name: '其他' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },
         drawCharts() {
            this.drawLineChart()
            this.drawPayPieChart()
            this.drawMaintainPieChart()
        },
    },
      created() {
          var this_ = this;
          var setTime = setInterval(function() {
           this_.nowTime =
             new Date().getFullYear() + "-" +
             this_.appendZero((new Date().getMonth() + 1)) + "-" +
             this_.appendZero(new Date().getDate()) + " " +
             this_.appendZero(new Date().getHours()) + ":" +
             this_.appendZero(new Date().getMinutes()) + ": " +
             this_.appendZero(new Date().getSeconds());
         }, 1000);
        },
      mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

