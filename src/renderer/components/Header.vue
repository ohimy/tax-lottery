<template>
  <div class="app-container">
    <Header class="ivu-layout-header">
      <Row>
        <i-col :span="12">
          <img :src="url" class="img">
        </i-col>
        <i-col :span="12" class="text">
          <Button type="success" @click="modal = true">登录</Button>
          <Button type="warning" @click="modal1 = true">注册</Button>
        </i-col>
      </Row>
    </Header>
    <!--登录-->
    <Modal v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>登录</span>
      </p>
      <div style="text-align:center">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="请输入账号" size="large" class="input">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码" size="large" class="input">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text">
        <Button type="success" long :loading="modal_loading" class="btn" @click="handleSubmit('formInline')">登录</Button>
      </div>
    </Modal>
    <!--注册-->
    <Modal v-model="modal1" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>注册</span>
      </p>
      <div style="text-align:center">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="设置账号（邮箱/电话号码）" size="large" class="input">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="设置密码（6-20位）" size="large" class="input">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password2" placeholder="确认密码" size="large" class="input">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="code">
            <Input type="text" v-model="formInline.code" placeholder="邀请码" size="large" class="input">
              <Icon type="ios-list-box-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text">
        <Button type="success" long :loading="modal_loading" class="btn" @click="handleSubmit2('formInline')">注册</Button>
      </div>
    </Modal>
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