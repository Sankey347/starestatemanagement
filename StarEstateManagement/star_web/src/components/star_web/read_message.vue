<template>
  <div id="box">
    <el-card class="message-card">
      <div id="content">
        <h2 style="margin: 10px 0;">贴心服务暖人心——星星社区公共志愿服务日活动</h2>
          <img src="../../../static/images/hd1.png" alt="">
          <p>
            为了更好地给社区居民生活带来方便，用实际行动开展各种关怀他人，服务社会、促进社会和谐的公益活动，让居民在家门口就可以享受到众多的贴心服务
            ,3月7日，大富社区志愿服务组织常态化公共服务日活动走进香榭大院小区，一如既往地服务社区居民。
          </p>
          <p>
            大富社区通过开展常态化公共服务日活动，将爱心公益传递到每家每户，给予社区居民生活上的帮助。活动大力弘扬助人为乐的传统美德，推进社区志愿服务稳步发展，营造出邻里守望相助的和谐氛围。
          </p>

          <img src="../../../static/images/hd1.1.png" alt="">
          <hr style="margin: 30px 0">

          <div id="content_footer">
            <b>发表评论</b>
            <div id="comment" style="text-align: right">
              <img src="../../../static/images/msg.png" alt="">
              <el-input
                rows="4"
                type="textarea"
                style="width: 86%"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="100"
                show-word-limit
              >
              </el-input>
              <el-button type="primary" >
                <span style="color: white">评论</span>
              </el-button>
            </div>
            <b>评论列表({{comment_count}}条)</b>
            <div class="reply">
              <ul>
                <li v-for="(comment,key) in comment_data.comment" class="parent_comment">
                  <img :src="comment['user_icon']" alt="">
                  <ul>
                    <li>{{comment['user_name']}}</li>
                    <li>&nbsp;{{comment['comment_content']}}</li>
                    <li>
                      <span class="comment_time">{{comment['comment_time']}}</span>
                      <div class="comment_img">
                        <img  @click="replyOpen(key)" src="../../../static/images/reply.png" alt="">
                        <span>回复</span>
                        <img  src="../../../static/images/good.png" alt=""><span>{{comment['good_data']}}</span>
                      </div>
                      <div  :id="key" class="write_reply">
                          <el-input
                          rows="4"
                          type="textarea"
                          placeholder="请输入内容"
                          v-model="textarea"
                          maxlength="100"
                          show-word-limit
                        >
                        </el-input>
                          <el-button @click="replySubmit(key)" type="primary" >回复</el-button>
                      </div>
                    </li>
                  </ul>
                  <el-collapse v-if="comment['reply_exist']" accordion>
                    <el-collapse-item>
                      <template slot="title">
                        <span class="reply_title">所有回复</span>
                      </template>
                      <div class="infinite-list-wrapper" style="overflow:auto">
                        <ul
                          class="list"
                        v-infinite-scroll="load"
                        infinite-scroll-disabled="disabled">
                        <li v-for="(reply,reply_key) in comment_data.reply" class="list-item">
                          <ul class="son_comment">
                            <li>{{reply['reply_son']}}:</li>
                            <li><span style="color: #409eff">@{{reply['reply_parent']}}</span>&nbsp;{{reply['reply_content']}}</li>
                            <li>
                              <span>{{reply['reply_time']}}</span>
                              <div class="comment_img">
                                <img @click="replyOpen(reply_key)" src="../../../static/images/reply.png" alt=""><span>回复</span>
                                <img  src="../../../static/images/good.png" alt=""><span>{{reply['reply_good']}}</span>
                              </div>
                              <div :id="reply_key" class="write_reply">
                                  <el-input
                                  rows="4"
                                  type="textarea"
                                  placeholder="请输入内容"
                                  v-model="textarea"
                                  maxlength="100"
                                  show-word-limit
                                >
                                </el-input>
                                <el-button @click="replySubmit(reply_key)" type="primary" >
                                  <span style="color: white">回复</span>
                                </el-button>
                                </div>
                            </li>
                          </ul>
                        </li>
                        <li v-if="noMore">没有更多了</li>
                      </ul>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </li>
              </ul>
              </div>
          </div>
        </div>
    </el-card>
  </div>


</template>

<script>
    export default {
        name: "read_message",
        data() {
          return {
            comment_count:2,
            reply_count:14,
            comment_data:{
              comment:{
                comment1:{
                  user_name:'赵懿轩',
                  user_icon:'../../../static/images/msg.png',
                  comment_content:'我的评论，看喂看喂!',
                  comment_time:'12-09 18:00',
                  good_data:201,
                  reply_exist:true,
                  },
                  comment2:{
                  user_name:'孙信基',
                  user_icon:'../../../static/images/msg.png',
                  comment_content:'我的评论，看喂看喂!',
                  comment_time:'12-09 18:00',
                  good_data:201,
                  reply_exist:false,
                }
              },
              reply:{
                reply1:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply2:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply3:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply4:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply5:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply6:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply7:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply8:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply9:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply10:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply11:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply12:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply13:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
                reply14:{
                  reply_parent:'赵懿轩',
                  reply_son:'孙信基',
                  reply_content:'看了看了!',
                  reply_time:'12-09 18:00',
                  reply_good:12,
                },
              },
            },
            count: 10,
            look_flag:false,
            loading: false,
            textarea: ''
          }
        },
        computed: {
          noMore () {
            return this.count >= this.reply_count
          },
          disabled () {
            return this.loading || this.noMore
          }
        },
        methods: {
          load () {
            this.loading = true
            setTimeout(() => {
              this.count += 2
              this.loading = false
            }, 2000)
          },
          replyOpen(comment_id){
            document.getElementById(comment_id).style.display='block'
          },
          replySubmit(comment_id){
            document.getElementById(comment_id).style.display='none'
          }
        }
    }
</script>

