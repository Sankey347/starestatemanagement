<template>
    <div id="web_box">
      <el-container>
          <el-header>
            <div id="web_header">

              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                  <a name="/"><img  id="logo" src="../../../static/images/index.png" alt=""></a>
                </el-menu-item>
                  <el-menu-item class="target_menu" id="index_menu">
                    <a href="/">网站首页</a>
                  </el-menu-item>
                  <el-menu-item>
                    <a href="/#community">社区活动</a>
                  </el-menu-item>
                  <el-menu-item>
                    <a href="/#property">物业通知</a>
                  </el-menu-item>
                  <el-menu-item>
                    <a href="/#message">留言板</a>
                  </el-menu-item>
                    <el-dropdown v-if="login_state" style="float: right">
                    <span class="el-dropdown-link">
                      <img id="head_portrait" src="../../../static/images/msg.png"
                           :style="{'border':user_leave['Ordinary Users']}"
                           alt="">
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
                      <el-dropdown-item id="pay">
                        <router-link  to="/pay">
                          <span>缴费情况</span>
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item id="repairs">
                        <router-link  to="/repairs">
                          <span>服务保修</span>
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="admin_flag" id="admin">
                        <router-link to="/admin/data/show">后台管理</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="login_state=false">安全退出</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                    <el-menu-item v-if="login_state" index="3" style="float: right">
                      <i class="el-icon-time"></i>
                      <span>{{this.nowTime}}</span>
                    </el-menu-item>
                    <el-menu-item v-if="login_state!==true" index="2" style="float: right">
                      <a href="/user/register">注册</a>

                    </el-menu-item>
                    <el-menu-item v-if="login_state!==true" index="3" style="float: right">
                      <a href="/user">登录</a>
                    </el-menu-item>
              </el-menu>
            </div>
          </el-header>
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
          <router-view></router-view>
      </el-container>
    </div>
</template>
<script>
    import $ from 'jquery'
    $(function () {
    const menu_item = $('#web_header a').toArray();
    function changeHeaderMenuColor(){
      const a_item = $('.web-content').children('a').toArray();
      const p = $(document).scrollTop();
      if (window.location.pathname==='/'){
        $('#index_menu').addClass('target_menu')
      }
      for(let i=0;i<a_item.length;i++){
        let title_item=$(a_item[i]).offset().top
        let top=title_item-p;
          if (top>=300){
            $(menu_item[i+2]).parent().removeClass('target_menu')
          }else{
            $(menu_item).parent().removeClass('target_menu')
            $(menu_item[i+2]).parent().addClass('target_menu')
          }
      }
    }
    for(let i=1;i<menu_item.length;i++){
      $(menu_item[i]).click(changeHeaderMenuColor)
    }
    $(window).on('scroll',changeHeaderMenuColor);

  })
    export  default {
        name: "index",
        data() {
          return {
            admin_flag:true,
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
            login_state:true,
            user_leave:{
                'Ordinary Users':'3px solid #ACF5A7',
                'Administrators':'3px solid #85BBF9',
                'Super Administrator':'3px solid #A47ADC'
            },
            nowTime: new Date(),
            activeIndex: '1',
            restaurants: [],
            state: '',
            timeout:  null,
            formLabelAlign: {
              name: '',
              region: '',
              textarea: '',
            }
          };
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
        methods: {
          close_drawer(key){
            if (key===this.message_list.length-1){
              this.drawer=false
            }
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          handleChange(value) {
            console.log(value);
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
            console.log(key, keyPath);
          }
        },
        mounted() {
          this.restaurants = this.loadAll();
        }
      }
</script>
<style>
  @import "../../../static/css/web_index.css";
</style>


