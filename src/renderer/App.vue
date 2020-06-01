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
  background-color: #fff !important;
  background-image: url(./assets/mbg.jpeg);
  background-size: 100% 100%;
  height: 100vh;
}
.layout {
  max-height: 100%;
}
.padding {
  padding: 20px 20px;
}
</style>
