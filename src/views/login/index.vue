

<template>
  <div id="login">
    <el-card class="box-card">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="公司ID" prop="aId">
          <el-input v-model="ruleForm.aId" autocomplete="off" placeholder="请输入公司id"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="submit-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      ruleForm: {
        aId: '',
        username: '',
        password: ''
      },
      rules: {
        aId: [
          { required: true, message: '请输入公司id', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    submitForm () {
      // this.$refs.ruleForm.validate(async (valid) => {
      // if (valid) {
      // const result = await loginReq({ username: this.ruleForm.username, pwd: this.ruleForm.password, company: this.ruleForm.aId })
      // if (result.ret === '0') {
      //   this.$router.replace('/')
      // }
      // } else {
      //   return false
      // }
      // })
      // }
      this.$store.dispatch('user/login', { username: 'admin', password: '123' }).then(() => {
        this.$router.replace({ path: '/' })
      }).catch(() => {

      })

    }
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
#login {
  height: 100%;
  width: 100%;
  background-color: #2c68c9;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 40%;
    padding-top: 36px;
    .el-form {
      .submit-btn {
        margin-top: 36px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        .el-button {
          width: 220px;
        }
      }
    }
  }
}
</style>
