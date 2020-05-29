<template>
  <div class="app-container">
    <Header class="ivu-layout-header">
      <Row>
        <i-col :span="12">
          <router-link :to="{name:'Home'}"> 
            <img :src="url" class="img">
          </router-link>
        </i-col>
        <i-col :span="8" class="text">
          <router-link :to="{name:'SeedIndex'}"> 
            <Button type="success">发票数据</Button>
          </router-link>
        </i-col>
        <i-col :span="8" class="text">
          <router-link :to="{name:'LotteryIndex'}"> 
            <Button type="success">奖池查询</Button>
          </router-link>
        </i-col>
      </Row>
    </Header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://img.alicdn.com/imgextra/i3/1666188817/O1CN016axy5z2F0Efa3gY9m_!!1666188817-2-daren.png',
      modal: false,
      modal1: false,
      formInline: {
        user: '',
        password: '',
        password2: '',
        code: ''
      },
      modal_loading: false,
      ruleInline: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 20, message: '密码在6-20位之间', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 20, message: '密码在6-20位之间', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入邀请码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('登录成功!')
        } else {
          this.$Message.error('账号密码错误!')
        }
      })
    },
    handleSubmit2 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('注册成功!')
        } else {
          this.$Message.error('密码不一致!')
        }
      })
    }
  }
}
</script>

<style scoped>
.input {
  width: 320px;
}
.btn {
  width: 100%;
  height: 40px;
}
.text {
  text-align: right;
}
.ivu-layout-header {
  background: #17233d;
}
.img {
  height: 50px;
  width: auto;
  margin-top: 7px;
}
</style>