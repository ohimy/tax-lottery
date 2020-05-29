<template>
  <div class="app-container">
    <Table :columns="lotteryColumns" :data="list"></Table>
    <Page v-if="total > 0" :current="listQuery.page" :page-size="listQuery.size" :total="total" show-total @on-change="pageChange" />
  </div>
</template>

<script>
export default {
  name: 'LotteryIndex',
  data() {
    return {
      listQuery: {
        page: 1,
        size: 20
      },
      lotteryColumns: [
        {
          title: '编号',
          key: 'no'
        },
        {
          title: '发票号码',
          key: 'code'
        }
      ]
    }
  },
  mounted() {
    this.pageChange()
  },
  computed: {
    list() {
      return this.$store.state.seed.lotteryList
    },
    total() {
      return this.$store.state.seed.lotteryTotal
    }
  },
  methods: {
    pageChange(pageNo = 1) {
      this.$store.dispatch('fetchLotteryList', {
        page: pageNo,
        size: 20
      })
    }
  }
}
</script>
<style scoped>
</style>