<template>
  <div class="app-container">
    <Row class="header">
      <i-col :span="18">
        <router-link :to="{name:'PrizeIndex'}">
          <span :class="this.$route.name == 'PrizeIndex' ? 'menu-current' : 'menu'">奖项选择</span>
        </router-link>
        <router-link :to="{name:'Home'}"> 
          <span :class="this.$route.name == 'Home' ? 'menu-current' : 'menu'">抽奖界面</span>
        </router-link>
        <router-link :to="{name:'SeedIndex'}">
          <span :class="this.$route.name == 'SeedIndex' ? 'menu-current' : 'menu'" @click="exportData">数据导入</span>
        </router-link>
        {{ firstLotteryIsOver }}
        {{ secondLotteryIsOver }}
        {{ thirdLotteryIsOver }}
        <!-- <router-link :to="{name:'LotteryIndex'}"> 
          <span :class="this.$route.name == 'LotteryIndex' ? 'menu-current' : 'menu'">奖池查询</span>
        </router-link> -->
      </i-col>
      <i-col :span="6" class="export">
        <Button v-if="firstLotteryIsOver && secondLotteryIsOver && thirdLotteryIsOver" type="success">导出结果</Button>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  computed: {
    firstLotteryIsOver() {
      return this.$store.state.seed.firstLottery.length === 1
    },
    secondLotteryIsOver() {
      return this.$store.state.seed.secondLottery.length === 10
    },
    thirdLotteryIsOver() {
      return this.$store.state.seed.thirdLottery.length === 100
    }
  },
  methods: {
    exportData() {

    }
  }
}
</script>

<style scoped>
.header {
  padding: 20px;
}
.menu {
  margin: 0px 15px 0px 0px;
  padding: 0px 0px 5px 0px;
  font-size: 18px;
  line-height: 1.2;
  font-weight: normal;
  color: #333333;
  border-bottom: 2px solid transparent;
}
.menu-current {
  margin: 0px 15px 0px 0px;
  padding: 0px 0px 5px 0px;
  font-size: 18px;
  line-height: 1.2;
  font-weight: normal;
  color: #2d8cf0;
  border-bottom: 2px solid #2d8cf0;
}
.info {
  margin: 10px 0px 0px 20px;
  color: #666666;
}
.export {
  text-align: right;
}
button:focus {
  outline: 0 none !important;
}
button:active {
  outline: 0 none !important;
}
</style>