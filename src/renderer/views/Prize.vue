<template>
  <div class="app-container">
    <div class="main">
      <div class="list">
        <div class="prize">
          <div class="prize-main">
            <h1 class="prize-title">一等奖 1个</h1>
            <p class="prize-desc">华晨宝马3系轿车1辆 价值¥30000</p>
          </div>
          <img class="prize-img" src="../assets/bmw.png" alt="宝马3系">
        </div>
        <div class="prize">
          <div class="prize-main">
            <h1 class="prize-title">二等奖 10个</h1>
            <p class="prize-desc">长安汽车悦翔轿车1辆 价值¥30000</p>
          </div>
          <img class="prize-img" src="../assets/yuexiang.png" alt="宝马3系">
        </div>
        <div class="prize">
          <div class="prize-main">
            <h1 class="prize-title">三等奖 100个</h1>
            <p class="prize-desc">5000元家用电器现金消费券</p>
          </div>
          <img class="prize-img" src="../assets/quan.png" alt="5000元家电消费券">
        </div>
      </div>
      <div class="sd">
        <div class="rule">
          <h3 class="sd-title">抽奖规则</h3>
          <div class="sd-con">
            <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
            <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
            <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
            <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
            <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
            <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
          </div>
        </div>
        <div class="data">
          <h3 class="sd-title">数据</h3>
          <div class="sd-con">
            <p>总发票数 {{ taxTotal }}</p>
            <p>总奖票数 {{ lotteryTotal }}</p>
            <p>奖池已打乱</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrizeIndex',
    computed: {
      taxTotal() {
        return this.$store.state.seed.taxTotal
      },
      lotteryTotal() {
        return this.$store.state.seed.lotteryTotal
      }
    }
  }
</script>

<style lang="scss" scoped>
.app-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.prize {
	display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: space-between;
  margin: 50px 0px 0px 0px;
  padding: 20px;
  border: 2px solid #FFFFFF;
  border-radius: 5px;
}
.prize:hover {
  border: 2px solid #FF3333;
  cursor: pointer;
}
.prize-title {
	font-size: 22px;
	line-height: 1.2;
	font-weight: 600;
	color: #FF3333;
}
.prize-desc {
	margin: 20px 0px 0px 0px;
	font-size: 16px;
	line-height: 1.2;
	font-weight: 400;
	color: #666666;
}
.prize-img {
	display: block;
	margin: 0px 0px 0px 30px;
	width: 100px;
	height: 100px;
}
.sd{
  margin: 80px 0px 0px 150px;
}
.sd-title{
	font-size: 16px;
	line-height: 1.2;
	font-weight: 400;
	color: #17233d;
}
.sd-con {
  margin: 10px 0px 0px 0px;
  font-size: 14px;
	line-height: 1.8;
	font-weight: 400;
	color: #666666;
}
.data {
  margin: 50px 0px 0px 0px;
}
</style>