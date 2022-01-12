<template>
    <div class="box">
        <h1 style="margin: 60px 0 10px">LOGIN</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-right: 20px">
          <el-form-item prop="pass" >
            <img src="../../../static/images/login_phone.png" alt="">
            <el-input type="text" v-model="ruleForm.pass" autocomplete="off" placeholder="PHONE"></el-input>
          </el-form-item>
          <el-form-item  prop="checkPass">
            <img src="../../../static/images/login_code.png" alt="">
              <el-input  style="width: 55%" type="text" v-model="ruleForm.checkPass" autocomplete="off" placeholder="CAPTCHA">
              </el-input>
              <el-button type="info" plain style="float: right">获取验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button  style="float: left" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <router-link to="/user/register" style="float: right">注册账号？</router-link>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>
    export default {
        name: "clogin",
        data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
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
        }
      };
    },
        methods: {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    }
</script>

