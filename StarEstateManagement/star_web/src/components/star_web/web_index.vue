<template>
    <div id="box">
      <el-container>
        <el-main>
          <div>
            <el-carousel height="600px">
              <el-carousel-item>
                <img src="../../../static/images/img2.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img src="../../../static/images/img3.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img src="../../../static/images/bg.png" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="web-content" v-for="content in web_content">
                <a :name="content['a_name']">
                  <b>{{content['title_chinese']}}</b>
                  <b>{{content['title_english']}}</b>
                  <hr>
                </a>
              <div class="web-content-item" v-for="item in content['content_item']">
                <img :src="item['img_src']" alt="">
                <router-link :to="item['a_href']">{{item['a_content']}}</router-link>
                <div class="time">
                  <img src="../../../static/images/time.png" alt="">
                  <span>{{item['time_data']}}</span>
                </div>
                <div class="good">
                  <button><img src="../../../static/images/good.png" alt=""></button>
                  <span>{{item['good_data']}}</span>
                </div>
              </div>
          </div>
          <div class="web-content">
            <a name="message">
              <b>留言板</b>
              <b>message board</b>
              <hr>
            </a>
              <img src="../../../static/images/msg.png" alt="" style="width: 50%;height: 100%;float: left">
              <el-form :label-position="top" label-width="80px" :model="formLabelAlign" style="width: 600px;margin-top:100px;float: right">
              <el-form-item label="名字">
                <el-input v-model="formLabelAlign.name" placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="formLabelAlign.region" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="留言内容">
                <el-input
                  type="textarea"
                  placeholder="请输入留言内容"
                  v-model="formLabelAlign.textarea"
                  :rows="4"
                  maxlength="200"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
                <el-button type="primary" style="float: left;margin-left: 80px">留言</el-button>
                <el-button type="primary" style="float: right">重置</el-button>
            </el-form>
          </div>
          <div id="customer_service">
            <a href="tencent://message/?uin=396581397&Site=&Menu=yes" target="_blank">
              <img src="static/images/service.gif" alt="">
            </a>
          </div>
        </el-main>
        <el-footer>
          <div id="contact_us">
            <div class="addr">
              <img src="../../../static/images/adress.png" alt="">
              <p>星星小区388号</p>
            </div>
            <div class="phone">
              <img src="../../../static/images/phone.png" alt="">
              <p>0123-4567890</p>
            </div>
            <div class="email">
              <img src="../../../static/images/email.png" alt="">
              <p>123456789@qq.com</p>
            </div>
          </div>
          <div id="copyright_message">
            <p>Copyright @2015-2021.All Rights Reserved</p>
            <p> Powered by&nbsp;<a href="#">SunXinJi</a></p>
          </div>
        </el-footer>
      </el-container>
    </div>
</template>

<script>

    export default {
        name: "web_index",
        data() {
          return {
            web_content:{
              community:{
                a_name:'community',
                title_chinese:'社区活动',
                title_english:'community activity',
                content_item:{
                  item_one:{
                    img_src:'../../../static/images/hd1.png',
                    a_href:'/read',
                    a_content:'贴心服务暖人心——星星社区公共志愿服务日活动',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                  item_two:{
                    img_src:'../../../static/images/hd2.png',
                    a_href:'/read',
                    a_content:'星星社区开展走进社区捡垃圾活动',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                  item_three:{
                    img_src:'../../../static/images/hd3.png',
                    a_href:'/read',
                    a_content:'星星社区开展多彩社区文化活动，满足居民需求',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                  item_four:{
                    img_src:'../../../static/images/hd4.png',
                    a_href:'/read',
                    a_content:'星星社区：乐融融的亲子活动促基层治理新融合',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                }
              },
              property:{
                a_name:'property',
                title_chinese:'物业通知',
                title_english:'property notice',
                content_item:{
                  item_one:{
                    img_src:'../../../static/images/tz1.png',
                    a_href:'/read',
                    a_content:'新冠疫苗接种通知',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                  item_two:{
                    img_src:'../../../static/images/tz2.png',
                    a_href:'/read',
                    a_content:'小区车位调整通知',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                  item_three:{
                    img_src:'../../../static/images/tz3.png',
                    a_href:'/read',
                    a_content:'9月30日停电通知',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                  item_four:{
                    img_src:'../../../static/images/tz4.png',
                    a_href:'/read',
                    a_content:'上半年水费缴费通知',
                    time_data:'2021-09-10',
                    good_data:'201'
                  },
                }
              }
            },
            formLabelAlign: {
              name: '',
              region: '',
              textarea: '',
            }
          };
        },
    }
</script>



