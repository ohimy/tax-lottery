<template>
  <div class="app-container">
    <div class="prize">
      <div class="prize-main">
        <h1 class="prize-title">一等奖 1个</h1>
        <p class="prize-desc">华晨宝马3系轿车1辆 价值¥30000</p>
      </div>
      <img class="prize-img" src="../assets/bmw.png" alt="宝马3系">
    </div>
    <div class="main">
      <div class="lottery">
        <!-- 未开始抽奖 -->
        <div class="result-box result-box-info" v-if="true">
          <p>总发票数 {{ taxTotal }}</p>
          <p>总奖票数 {{ lotteryTotal }}</p>
        </div>
        <!-- 一等奖抽奖结果 -->
        <div class="result-box result-box-frist" v-if="false">
          <div class="result-item">
            <p>050001800104 31596947</p>
          </div>
        </div>   
        <!-- 二等奖抽奖结果 -->
        <div class="result-box result-box-second" v-if="false">
          <div class="result-item" v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="index">
            <p>050001800104</p>
            <p>31596947</p>
          </div>
        </div>        
        <!-- 三等奖抽奖结果 -->
      </div>
      <button class="primary-btn" @click="lottery(10)">开始抽奖</button>
    </div>
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
.app-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.prize {
	display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: space-between;
  margin: 30px 0px 0px 0px;
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
.lottery {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 5vh 0px 0px 0px;
}
.main {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.result-box {
	display: flex;
}
.result-box-info {
  flex-direction: column;
	flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 30px;
	line-height: 2;
	font-weight: 400;
	color: #888888;
  font-style: italic;
  width: 80vw;
	height: 30vh;
  margin: 8px 0px 0px 0px;
}
.result-box-frist{
  flex-direction: row;
	flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 80vw;
	height: 20vh;
  margin: 5vh 0px;
}
.result-box-frist .result-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 38px;
	line-height: 1.2;
  letter-spacing: 3px;
	font-weight: 400;
	color: #FFFFFF;
	background: #FF3333;
	padding: 15px 25px;
	border-radius: 5px;
  width: 50%;
}
.result-box-second{
  flex-direction: row;
	flex-wrap: wrap;
  justify-content: space-between;
  width: 80vw;
	height: 20vh;
  margin: 5vh 0px;
}
.result-box-second .result-item {
	font-size: 26px;
	line-height: 1.1;
	font-weight: 400;
	color: #FFFFFF;
	background: #FF3333;
	padding: 5px 10px;
	margin: 0px 0px 20px 0px;
	border-radius: 5px;
}
.result-box-third {
  flex-direction: row;
	flex-wrap: wrap;
  justify-content: space-between;
  width: 80vw;
	height: 20vh;
  margin: 5vh 0px;
}
.result-box-third .result-item {
  display: block;
}
.demo-carousel{
  display: block;
  height: 200px;
  background: #ff0;
}
.primary-btn {
	display: inline-block;
	font-weight: 400;
	text-align: center;
	vertical-align: middle;
	touch-action: manipulation;
	cursor: pointer;
	background-image: none;
	white-space: nowrap;
	user-select: none;
	height: 50px;
	padding: 0 30px;
	font-size: 20px;
	border-radius: 4px;
	transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
	color: #ffffff;
	background: linear-gradient(180deg, #ff6600, #ff3300);
	border: 0 none;
	margin: 8vh 0px 0px 0px;
}
.primary-btn:hover {
	background: linear-gradient(180deg, #ff3300, #ff1100);
}
.primary-btn:focus {
	background: linear-gradient(180deg, #ff1100, #ff3300);
	box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
	outline: 0;
}
.primary-btn:disabled {
	background: #f7f7f7;
	border: 1px solid #dcdee2;
	color: #c5c8ce;
}
</style>