<template>
  <div class="app-container">
    <div class="prize">
      <div class="prize-main">
        <h1 class="prize-title">{{ prize.title }}</h1>
        <p class="prize-desc">{{ prize.desc }}</p>
      </div>
      <img class="prize-img" :src="prize.img">
    </div>
    <div class="main">
      <div class="lottery">
        <!-- 未开始抽奖 -->
        <div v-if="result.length == 0 && stat < 1" class="result-box result-box-info">
          <p>总发票数 {{ taxTotal }}</p>
          <p>总奖票数 {{ lotteryTotal }}</p>
        </div>
        <!-- 抽奖结果 -->
        <div class="result-box result-box-frist" v-if="stat == 1 && result.length == 0 && prize.key == 'firstLottery'">
          <div class="result-item">
            <p>{{ rollShow[0].code || ''}}</p>
            <p> {{ rollShow[0].no || ''}}</p>
          </div>
        </div>
        <div class="result-box result-box-frist" v-if="result.length > 0 & prize.key == 'firstLottery'">
          <div class="result-item" v-for="(item, index) in result" :key="index">
            <p>{{ item.code }}</p>
            <p>{{ item.no }}</p>
          </div>
        </div>
        <div class="result-box result-box-second" v-if="stat == 1 && result.length == 0 && prize.key == 'secondLottery'">
          <div class="result-item" v-for="(item, index) in rollArr" :key="index">
             <p>{{ rollShow[index].code || ''}}</p>
             <p>{{ rollShow[index].no || ''}}</p>
          </div>
        </div>
        <div class="result-box result-box-second" v-if="result.length > 0 & prize.key == 'secondLottery'">
          <div class="result-item" v-for="(item, index) in result" :key="index">
            <p>{{ item.code }}</p>
            <p>{{ item.no }}</p>
          </div>
        </div>
        <div class="result-box result-box-third" v-if="stat == 1 && result.length == 0 && prize.key == 'thirdLottery'">
          <div class="result-item" v-for="(item, index) in rollArr" :key="index">
             <p>{{ rollShow[index].code || '' }}</p>
             <p>{{ rollShow[index].no || ''}}</p>
          </div>
        </div>
        <div class="result-box result-box-third" v-if="result.length > 0 & prize.key == 'thirdLottery'">
          <div class="result-item" v-for="(item, index) in result" :key="index">
            <p>{{ item.code }}</p>
            <p>{{ item.no }}</p>
          </div>
        </div>
      </div>
      <button v-if="result.length == 0 && stat == 0" class="primary-btn" @click="startLottery">开始抽奖</button>
      <button v-if="stat == 1" class="primary-btn" @click="lottery" :disabled="result.length > 0">{{ result.length > 0 ? '已开奖' : '抽奖'}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrizeIndex',
    data () {
      return {
        prize: this.$route.query,
        stat: 0, // 摇奖状态 0 未开始 1 开始
        rollArr: new Array(10),
        rollShow: [],
        result: []
      }
    },
    created() {
      const key = this.$route.query.key
      this.$store.dispatch('fetchLotteryList', {
        page: 1,
        size: 10000
      })
      this.rollShow = this.lotteryList.slice(0, 10)
      switch (key) {
        case 'firstLottery':
          this.result = this.firstLottery
          break
        case 'secondLottery':
          this.result = this.secondLottery
          break
        case 'thirdLottery':
          this.result = this.thirdLottery
          break
        default:
          this.$Message.error('没有这个奖项')
          break
      }
      this.result.length > 0 ? this.stat = 1 : this.stat = 0
    },
    computed: {
      taxTotal() {
        return this.$store.state.seed.taxTotal
      },
      lotteryTotal() {
        return this.$store.state.seed.lotteryTotal
      },
      lotteryList() {
        return this.$store.state.seed.lotteryList
      },
      firstLottery() {
        return this.$store.state.seed.firstLottery
      },
      secondLottery() {
        return this.$store.state.seed.secondLottery
      },
      thirdLottery() {
        return this.$store.state.seed.thirdLottery
      }
    },
    methods: {
      randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10)
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
          default:
            return 0
        }
      },
      // 开始摇奖
      startLottery() {
        this.stat = 1
        window.setInterval(() => {
          let _start = this.randomNum(0, this.lotteryList.length - 10)
          let _end = _start + 10
          this.rollShow = this.lotteryList.slice(_start, _end)
        }, 60)
      },
      // 停止摇奖
      async lottery() {
        window.clearInterval()
        switch (this.prize.key) {
          case 'firstLottery':
            await this.$store.dispatch('lottery', 1)
            this.result = this.firstLottery
            break
          case 'secondLottery':
            await this.$store.dispatch('lottery', 2)
            this.result = this.secondLottery
            break
          case 'thirdLottery':
            await this.$store.dispatch('lottery', 3)
            this.result = this.thirdLottery
            break
          default:
            this.$Message.error('没有这个奖项')
            break
        }
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
  min-width: 800px;
	height: 20vh;
  margin: 5vh 0px;
}
.result-box-frist .result-item{
  display: flex;
  flex-direction: column;
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
  width: 100%;
}
.result-box-second{
  flex-direction: row;
	flex-wrap: wrap;
  justify-content: space-between;
  width: 70vw;
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
	font-size: 26px;
	line-height: 1.1;
	font-weight: 400;
	color: #FFFFFF;
	background: #FF3333;
	padding: 5px 10px;
	margin: 0px 0px 20px 0px;
	border-radius: 5px;
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