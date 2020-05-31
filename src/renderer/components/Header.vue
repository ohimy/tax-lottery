<template>
  <div class="app-container">
    <div class="header">
      <div>
        <router-link :to="{name: 'Home'}" v-if="this.$route.name != 'Home'" class="home">
          <img class="home-icon" src="../assets/home.png" alt="首页图片">
          <span class="home-text">返回首页</span>
        </router-link>
        <!-- <router-link :to="{name:'PrizeIndex'}"> 
          <span :class="this.$route.name == 'PrizeIndex' ? 'menu-current' : 'menu'">抽奖界面</span>
        </router-link>
        <router-link :to="{name:'SeedIndex'}">
          <span :class="this.$route.name == 'SeedIndex' ? 'menu-current' : 'menu'" @click="exportData">数据导入</span>
        </router-link>
        <router-link :to="{name:'LotteryIndex'}"> 
          <span :class="this.$route.name == 'LotteryIndex' ? 'menu-current' : 'menu'">奖池查询</span>
        </router-link> -->
      </div>
      <div class="export" v-if="this.$route.name == 'Home'">
        <Button v-if="firstLotteryIsOver && secondLotteryIsOver && thirdLotteryIsOver" type="success" @click="exportData">导出结果</Button>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
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
      // 一等奖数据
      let firstArr = []
      firstArr[0] = ['代码']
      this.$store.state.seed.firstLottery.forEach(function(val, idx, array) {
        // 实例二位数组空间
        firstArr[idx + 1] = []
        firstArr[idx + 1][0] = val
      })
      // 二等奖数据
      let secondArr = []
      secondArr[0] = ['代码']
      this.$store.state.seed.secondLottery.forEach(function(val, idx, array) {
        // 实例二位数组空间
        secondArr[idx + 1] = []
        secondArr[idx + 1][0] = val
      })
      // 三等奖数据
      let thirdArr = []
      thirdArr[0] = ['代码']
      this.$store.state.seed.thirdLottery.forEach(function(val, idx, array) {
        // 实例二位数组空间
        thirdArr[idx + 1] = []
        thirdArr[idx + 1][0] = val
      })
      // 创建sheet
      const wb = XLSX.utils.book_new()
      const ws1 = XLSX.utils.aoa_to_sheet(firstArr)
      const ws2 = XLSX.utils.aoa_to_sheet(secondArr)
      const ws3 = XLSX.utils.aoa_to_sheet(thirdArr)
      XLSX.utils.book_append_sheet(wb, ws1, '一等奖')
      XLSX.utils.book_append_sheet(wb, ws2, '二等奖')
      XLSX.utils.book_append_sheet(wb, ws3, '三等奖')
      XLSX.writeFile(wb, '获奖名单.xlsx')
      this.$Message.success('名单已保存到C盘根目录下')
    }
  }
}
</script>

<style scoped>
.header {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.home-icon {
  display: block;
  width: 20px;
  height: 20px;
}
.home-text {
  margin: 2px 0px 0px 5px;
  font-size: 18px;
  line-height: 20px;
  font-weight: normal;
  color: #333333; 
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