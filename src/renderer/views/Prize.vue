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
            <p class="prize-desc">华晨宝马3系轿车1辆 价值¥30000</p>
          </div>
          <img class="prize-img" src="../assets/bmw.png" alt="宝马3系">
        </div>
        <div class="prize">
          <div class="prize-main">
            <h1 class="prize-title">三等奖 100个</h1>
            <p class="prize-desc">华晨宝马3系轿车1辆 价值¥30000</p>
          </div>
          <img class="prize-img" src="../assets/bmw.png" alt="宝马3系">
        </div>
      </div>
      <div class="rule">
        <p>抽奖规则</p>
        <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
        <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
        <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
        <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
        <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
        <p>1、抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrizeIndex'
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
  margin: 50px 0px 0px 0px;
  padding: 20px;
  border: 2px solid #FFFFFF;
  border-radius: 5px;
}
.prize:hover {
  border: 2px solid #2d8cf0;
  cursor: pointer;
}
.prize-title {
	font-size: 22px;
	line-height: 1.2;
	font-weight: 400;
	color: #17233d;
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
.rule{
  margin: 80px 0px 0px 100px;
}
</style>