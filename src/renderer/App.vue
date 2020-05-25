<template>
  <div class="layout">
    <Layout>
      <Header/>
      <Content class="padding">
        <router-view></router-view>
      </Content>
      <Footer/>
    </Layout>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  export default {
    name: 'tax-lottery',
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss" scoped>
/deep/.ivu-layout{
  background: #fff !important;
  height: auto;
  padding-bottom: 80px;
}
.layout {
  height: 100%;
}
.padding {
  padding: 20px 55px;
}
</style>
