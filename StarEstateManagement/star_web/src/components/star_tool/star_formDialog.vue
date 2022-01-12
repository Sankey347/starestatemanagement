<template>
  <span>
    <el-button v-if="form_title==='新建用户账号'" type="warning" @click="dialogFormVisible=true">
      <img src="../../../static/images/add.png" alt="">添加
    </el-button>
    <el-button v-else-if="form_title==='重置用户账号'" type="danger" @click="dialogFormVisible=true">
        <img src="../../../static/images/reset.png" alt="">重置
    </el-button>
    <el-button v-else-if="form_title==='发布新活动'" style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible=true">发布活动</el-button>
    <el-button v-else-if="form_title==='回复用户'"  size="mini" type="primary" @click="dialogFormVisible=true">回复</el-button>
    <el-button v-else-if="form_title==='错误反馈'" type="danger" id="feedback" @click="dialogFormVisible=true">
      <img src="../../../static/images/feedback.png" alt="">反馈
    </el-button>
    <el-button v-else-if="form_title==='更多操作'" type="warning" @click="dialogFormVisible=true">
          <img src="../../../static/images/user_pay.png" alt="">更多
    </el-button>
    <span v-else-if="form_title==='个人信息'" @click=showInfo>个人信息</span>
    <el-dialog :title="form_title" :visible.sync="dialogFormVisible" append-to-body="true" :width="form_title!=='个人信息'?'30%':'50%'" center>
      <el-form v-if="form_title==='发布新活动'" :model="activity_ruleForm" :rules="activity_rules" ref="activity_ruleForm" label-width="100px" class="demo-ruleForm">
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
                <el-button type="primary" @click="submitForm('activity_ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('activity_ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
      <el-form v-else-if="form_title==='回复用户'" :model="activity_ruleForm" :rules="activity_rules" ref="activity_ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="评价任务" prop="name">
                <el-input v-model="activity_ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="评价人" required>
                <el-input v-model="activity_ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="回复内容" prop="desc">
                <el-input type="textarea" v-model="activity_ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('activity_ruleForm')">立即回复</el-button>
                <el-button @click="resetForm('activity_ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
      <el-form v-else-if="form_title==='新建用户账号'||form_title==='重置用户账号'" :model="activity_ruleForm" status-icon :rules="activity_ruleForm" ref="activity_ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名：" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="初始密码：" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="账号身份：" prop="age" style="text-align: left">
          <el-select v-model="value" placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="form_title==='新建用户账号'" type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button v-else type="danger" @click="submitForm('ruleForm')">重置</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form v-else-if="form_title==='个人信息'" :model="user_form"  :rules="info_rules" ref="ruleForm" >
              <el-descriptions class="user_info" title="赵懿轩" :column="2"  border>
                <template slot="extra">
                  <el-button v-if="read_flag" type="primary" size="small" @click="read_flag=false">修改</el-button>
                  <el-button v-else type="primary" size="small" @click="read_flag=true">保存</el-button>
                </template>
                <el-descriptions-item>
                  <template slot="label">
                    <img src="../../../static/images/usericon.png" alt="">
                    头像
                  </template>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :disabled="read_flag"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <img v-else :src="imageUrl">
                  </el-upload>
                </el-descriptions-item>
                <el-descriptions-item v-for="(info,key) in user_info.special" :key="key">
                    <template slot="label">
                      <img :src="info['src']" alt="">
                      {{info['title']}}
                    </template>
                    <el-form-item :prop="key">
                      <span v-if="key==='leave'">{{info['data']}}</span>
                      <span v-else>
                        <span v-if="read_flag">{{key!=='pwd'?user_form[key]:user_form[key].replace(user_form[key],'*******')}}</span>
                        <el-input
                        v-else
                        v-model="key==='leave'?info['data']:user_form[key]"
                        :type="info['type']"
                        :readonly="info['flag']"
                        :show-password="info['show_password']"
                      ></el-input>
                      </span>

                    </el-form-item>
                  </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <img src="../../../static/images/sex.png" alt="">
                    性别
                  </template>
                  <span v-if="read_flag">{{user_info.sex==='0'?'男':'女'}}</span>
                  <span v-else>
                    <el-radio v-model="user_info.sex" label='0'>男</el-radio>
                    <el-radio v-model="user_info.sex" label='1'>女</el-radio>
                  </span>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <img src="../../../static/images/age.png" alt="">
                    年龄
                  </template>
                  <span v-if="read_flag" style="line-height: 62px">{{user_info.age}}岁</span>
                  <span v-else>
                      <el-input-number v-model="user_info.age"
                                     controls-position="right"
                                     @change="handleChange"
                                     step-strictly
                                     :min="1"
                                     :max="100"
                    ></el-input-number>
                  </span>
                </el-descriptions-item>
                <el-descriptions-item v-for="(info,key) in user_info.other" :key="key">
                  <template slot="label">
                    <img :src="info['src']" alt="">
                    {{info['title']}}
                  </template>
                  <span v-if="read_flag" style="line-height: 62px">{{info['data']}}</span>
                  <span v-else>
                    <el-cascader
                    v-model="info['data']"
                    :placeholder="info['data']"
                    :options="info['options']"
                    filterable>
                  </el-cascader>
                  </span>

                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <img src="../../../static/images/usertime.png" alt="">
                   入住时间
                  </template>
                  <span v-if="read_flag">{{user_info.time}}</span>
                  <span v-else>
                      <el-date-picker
                      v-model="user_info.time"
                      align="right"
                      type="date"
                      :placeholder="user_info.time"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </span>
                </el-descriptions-item>
              </el-descriptions>
            </el-form>
      <el-form v-else-if="form_title==='错误反馈'" :model="activity_ruleForm" :rules="activity_rules" ref="activity_ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="订单号" prop="name">
                <el-input v-model="activity_ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="反馈内容" prop="desc">
                <el-input type="textarea" v-model="activity_ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('activity_ruleForm')">立即上报</el-button>
                <el-button @click="resetForm('activity_ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
      <el-form v-else-if="form_title==='更多操作'" :model="activity_ruleForm" :rules="activity_rules" ref="activity_ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="操作类型" prop="name">
                <el-select v-model="buyType" placeholder="请选择">
                  <el-option
                    v-for="item in buyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-if="buyType==='我要出租'">
                <el-form-item label="我的房间" prop="name">
                <span>A/1/1</span>
              </el-form-item>
                <el-form-item label="房间月租" prop="name">
                  <el-input-number v-model="monthly_rent" :min="0"   step-strictly ></el-input-number>元/月
                </el-form-item>
                <el-form-item label="最短租期" prop="name">
                  <el-input-number v-model="tenancy" :min="3"  :max="30" step-strictly ></el-input-number>个月
                </el-form-item>
                <el-form-item label="租房备注" prop="name">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    maxlength="100"
                    rows="4"
                    show-word-limit
                    style="width: 221px;"
                  >
                  </el-input>
                </el-form-item>
              </span>
              <span v-else>
                <el-form-item label="用户姓名" prop="name">
                  <el-input v-model="activity_ruleForm.name" style="width: 221px"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" required>
                  <el-input v-model="activity_ruleForm.name" style="width: 221px"></el-input>
                </el-form-item>
                <el-form-item :label="buyType==='购买车位'?'选择车位':'选择房间'" required>
                <el-cascader v-model="address" :props="buyType==='购买车位'?car_props:house_props" clearable></el-cascader>
              </el-form-item>
                <el-form-item label="租房信息" required v-if="buyType==='我要租房'&&address" >
                  <template>
                      <p>房主姓名:张三</p>
                      <p>房主账号:123486789</p>
                      <p>联系电话:123456789</p>
                      <p>备注:12151515155515555555555555555555555555555</p>
                  </template>
                </el-form-item>
                <el-form-item label="租房时长" required v-if="buyType==='我要租房'&&address">
                  <template>
                      <el-input-number v-model="house_time" :min="3"  :max="30" step-strictly ></el-input-number>个月
                  </template>
                </el-form-item>
                <el-form-item label="付款金额" required v-if="address" >
                  <template>
                      <span v-if="buyType==='我要买房'">¥{{showMoney(house_money)}}{{pay_method==='2'?'元':'元/月'}}</span>
                      <span v-else-if="buyType==='我要租房'">¥{{showMoney(room_money)+'元/月'}}</span>
                      <span v-else-if="buyType==='购买车位'">¥{{pay_method==='2'?'160,000元':'400元/月'}}</span>
                  </template>
                </el-form-item>
                <el-form-item label="付款方式" required v-if="buyType==='我要买房'||buyType==='购买车位'">
                  <template>
                      <el-radio v-model="pay_method" label="1" >分期支付</el-radio>
                      <el-radio v-model="pay_method" label="2">全款支付</el-radio>
                  </template>
                </el-form-item>
                <el-form-item label="付款期数" required v-if="pay_method==='1'&&buyType==='我要买房'">
                  <template>
                     <el-select  v-model="buy_time" placeholder="请选择分期数">
                        <el-option
                            v-for="item in buy_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                     </el-select>
                  </template>
                </el-form-item>
              </span>
              <el-form-item>
                <el-button v-if="buyType==='我要出租'" type="primary" @click="submitForm('activity_ruleForm')">立即发布</el-button>
                <el-button v-else type="primary" @click="submitForm('activity_ruleForm')">立即缴费</el-button>
                <el-button @click="resetForm('activity_ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
    </el-dialog>
  </span>

</template>

<script>
    import $ from "jquery";
    export default {
        name: "star_formDialog",
        props:{
        dialog_title:'',
      },
        data(){
            var validateName = (rule, value, callback) => {
              if (value==='') {
                return callback(new Error('用户名不能为空'));
              }
              else {
                if (value==='zs'){
                  return callback(new Error('用户已存在！'))
                }else{
                  callback()
                }
              }
            };
            var validatePwd = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('密码不能为空！'));
              }
              else {
                callback();
              }
            };
            var validatePhone = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('手机号不能为空！'));
              }
              else {
                const reg=/^1[3456789]\d{9}$/
                if(reg.test(value)){
                  callback();
                }
                else{
                  return callback(new Error('请输入正确的手机号'))
                }
              }
            };
            var checkAge = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('年龄不能为空'));
              }
              setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error('请输入数字值'));
                }
                else {
                  if (value < 18) {
                    callback(new Error('必须年满18岁'));
                  }
                  else {
                    callback();
                  }
                }
              }, 1000);
            };
            var validatePass = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              }
              else {
                if (this.ruleForm.checkPass !== '') {
                  this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
              }
            };
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              }
              else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
              }
              else {
                callback();
              }
            };
            return{
              textarea:'',
              monthly_rent:1000,
              tenancy:3,
              buy_time:'',
              house_money:1234567,
              room_money:2000,
              pay_method:'2',
              car_props: {
                lazy: true,
                lazyLoad (node, resolve) {
                  const { level } = node;
                  setTimeout(() => {
                    if(level===0){
                      let id=0
                      const nodes = Array.from({ length: level + 5 })
                      .map(item => ({
                        value: String.fromCharCode(++id+64),
                        label: `${String.fromCharCode(id+64)}`,
                        leaf: level >= 2
                      }));
                    resolve(nodes);
                    }else{
                      let id=0
                      const nodes = Array.from({ length: level + 9 })
                      .map(item => ({
                        value: ++id,
                        label: `${id}`,
                        leaf: level >= 2
                      }));
                    resolve(nodes);
                    }

                  }, 1000);
                }
              },
              house_props: {
                lazy: true,
                lazyLoad (node, resolve) {
                  const { level } = node;
                  setTimeout(() => {
                    if(level===0){
                      let id=0
                      const nodes = Array.from({ length: level + 5 })
                      .map(item => ({
                        value: String.fromCharCode(++id+64),
                        label: `${String.fromCharCode(id+64)}`,
                        leaf: level >= 2
                      }));
                    resolve(nodes);
                    }else{
                      let id=0
                      const nodes = Array.from({ length: level + 9 })
                      .map(item => ({
                        value: ++id,
                        label: `${id}`,
                        leaf: level >= 2
                      }));
                    resolve(nodes);
                    }

                  }, 1000);
                }
              },
              buyType:'我要买房',
              buyOptions:[
                {
                  value:'我要买房',
                  label:'我要买房'
                },
                {
                  value:'我要租房',
                  label:'我要租房'
                },
                {
                  value:'我要出租',
                  label:'我要出租'
                },
                {
                  value:'购买车位',
                  label:'购买车位'
                },
              ],
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
                shortcuts: [
                  {
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                    }
                  },
                  {
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                  },
                  {
                    text: '一周前',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                    }
                  }
                ]
              },
              activity_ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
              },
              imageUrl:require('../../static/logo.png'),
              user_info: {
                time:'2019-03-01',
                age: 1,
                sex: '0',
                special:{
                  name:{
                    title:'用户名',
                      src: '../../../static/images/username.png',
                      data: '赵懿轩',
                  },
                  leave:{
                    title:'类别',
                      src: '../../../static/images/leave.png',
                      data: '普通用户',
                      flag: true,
                  },
                  pwd:{
                    title:'密码',
                      src: '../../../static/images/password.png',
                      data: 'mm123456',
                      type: 'password',
                      show_password: true
                  },
                  phone:{
                    title:'手机号',
                    src: '../../../static/images/userphone.png',
                    data: '123-4841-123',
                  }
                  },
                other:{
                  addr:{
                    title:'单元号',
                      src: '../../../static/images/addr.png',
                      data: 'B/2/02',
                      options: [
                      {
                        value: 'A',
                        label: 'A',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'B',
                        label: 'B',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'C',
                        label: 'C',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'D',
                        label: 'D',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'E',
                        label: 'E',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                    ],
                  },
                  car:{
                    title:'车位',
                      src: '../../../static/images/usercar.png',
                      data: 'A/1/01',
                      options: [
                      {
                        value: 'A',
                        label: 'A',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'B',
                        label: 'B',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'C',
                        label: 'C',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'D',
                        label: 'D',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                      {
                        value: 'E',
                        label: 'E',
                        children: [
                          {
                            value: '1',
                            label: '1',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '2',
                            label: '2',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '3',
                            label: '3',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          }, {
                            value: '4',
                            label: '4',
                            children: [
                              {
                                value: '01',
                                label: '01'
                              }, {
                                value: '02',
                                label: '02'
                              }, {
                                value: '03',
                                label: '03'
                              }, {
                                value: '04',
                                label: '04'
                              }
                            ]
                          },
                        ]
                      },
                    ],
                  }
                }
              },
              user_form:{},
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
              house_time:3,
              title:'',
              form_title:'',
              read_flag:true,
              buy_options:[],
              address:'',
              options: [
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
                  }
               ],
              value: '',
              ruleForm: {
                  pass: '',
                  checkPass: '',
                  age: ''
              },
              rules: {
                pass: [
                  { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                  { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                  { validator: checkAge, trigger: 'blur' }
                ]
              },
              dialogFormVisible: false,
              info_rules: {
                name: [
                  { validator: validateName, trigger: 'blur' }
                ],
                pwd: [
                  { validator: validatePwd, trigger: 'blur' }
                ],
                phone: [
                  { validator: validatePhone, trigger: 'blur' }
                ]
              },
            }
        },
        created() {
            this.user_form={
              name:this.user_info.special.name.data.replace(/\s*/g,''),
              pwd:this.user_info.special.pwd.data.replace(/\s*/g,''),
              phone:this.user_info.special.phone.data.replace(/\s*/g,'')
            }
        },
        mounted() {
            let time_num=0
            this.form_title=this.dialog_title
            this.buy_options=Array.from({length:30}).map(item=>({
              value:++time_num*12,
              label:`${time_num}年(${time_num*12}期)`
            }))
        },
        methods:{
          showMoney(money){
            let show_money=''
            let new_money=''
            if(this.buyType==='我要租房'){
              money=parseFloat((this.house_time>=3?money*(1-this.house_time/100):money)+'.00').toFixed(2)
            }else{
              money=parseFloat((this.pay_method==='1'&&this.buy_time?money/this.buy_time:money+'.00')+'').toFixed(2)
            }
           new_money=money.substr(0,money.length-3)
            if(new_money.length>3){
              let flag_num=Math.floor(new_money.length/3)
                for(let i=0;i<=flag_num;i++){
                  if(!i){
                    show_money+=new_money.substr(0,new_money.length%3)
                  }else{
                    show_money+=new_money.substr(3*i-2,3*i)
                  }
                  show_money+=(i===flag_num)?'':','
                }
              return show_money+money.substr(money.length-3)
            }
            else{
              return money
            }

          },
          handleChange(value) {
            console.log(value);
          },
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isJPGorPNG = file.type === 'image/jpeg' || file.type==='image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPGorPNG) {
              this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPGorPNG && isLt2M;
          },
          showInfo(){
              this.dialogFormVisible=true
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
            this.dialogFormVisible = false
            this.$refs[formName].resetFields();
          },
        }
    }
</script>

<style scoped>
  img{
    width: 20px;
    height: 20px;
    margin-bottom: -3px;
    margin-right: 5px;
  }
</style>
