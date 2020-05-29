<template>
  <div class="app-container">
    <div class="header">
      <div>
        <router-link :to="{name: 'PrizeIndex'}" v-if="this.$route.name != 'PrizeIndex'" class="home">
          <img class="home-icon" src="../assets/home.png" alt="首页图片">
          <span class="home-text">返回首页</span>
        </router-link>
        <!-- <router-link :to="{name:'Home'}"> 
          <span :class="this.$route.name == 'Home' ? 'menu-current' : 'menu'">抽奖界面</span>
        </router-link>
        <router-link :to="{name:'SeedIndex'}">
          <span :class="this.$route.name == 'SeedIndex' ? 'menu-current' : 'menu'">发票数据</span>
        </router-link>
        <router-link :to="{name:'PrizeIndex'}">
          <span :class="this.$route.name == 'PrizeIndex' ? 'menu-current' : 'menu'">奖品选择</span>
        </router-link>
        <router-link :to="{name:'LotteryIndex'}"> 
          <span :class="this.$route.name == 'LotteryIndex' ? 'menu-current' : 'menu'">奖池查询</span>
        </router-link> -->
      </div>
      <div class="export">
        <Button type="success">导出结果</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  padding: 20px;
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