<template>
  <div class="app-container">
    <div>总发票数{{ taxTotal }}</div>
    <div>总奖票数{{ lotteryTotal }}</div>
    <button @click="lottery(10)">抽奖</button>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    data () {
      return {
      }
    },
    computed: {
      taxTotal() {
        return this.$store.state.seed.taxTotal
      },
      lotteryTotal() {
        return this.$store.state.seed.lotteryTotal
      }
    },
    methods: {
      async lottery(count) {
        const data = await this.$store.dispatch('lottery', count)
        console.log(data)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>