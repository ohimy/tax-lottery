<template>
  <div class="app-container">
    <!-- <div class="hd"><h1>GO 购 够快乐大出发、激情大采购活动抽奖</h1></div> -->
    <div class="main">
      <div class="list" v-if="lotteryTotal > 0">
        <router-link :to="{name:'PrizeIndex', query: item}" v-for="item in prize" :key="item.title" class="prize">
          <div class="prize-main">
            <h1 class="prize-title">{{ item.title }}</h1>
            <p class="prize-desc">{{ item.desc }}</p>
          </div>
          <img class="prize-img" :src="item.img">
        </router-link>
      </div>
      <div class="list" v-if="lotteryTotal == 0">
        <div class="prize" v-for="item in prize" :key="item.title">
          <div class="prize-main">
            <h1 class="prize-title">{{ item.title }}</h1>
            <p class="prize-desc">{{ item.desc }}</p>
          </div>
          <img class="prize-img" :src="item.img">
        </div>
      </div>
      <div class="sd">
        <div class="rule">
          <h3 class="sd-title">抽奖规则</h3>
          <div class="sd-con">
            <p>1、发票金额满200元，记1次抽奖奖票，每张发票最高拥有10张奖票</p>
            <p>2、奖票计算生成放入奖票池中，将进行打乱处理</p>
            <p>3、中奖后，发票及相应的奖票将不再参与后续奖项抽取</p>
            <p>4、奖项图片仅供参考，奖品以实际物品为准</p>
          </div>
        </div>
        <div class="data">
          <h3 class="sd-title">数据</h3>
          <div class="sd-con">
            <p>总发票数 {{ taxTotal }}</p>
            <p>总奖票数 {{ lotteryTotal - noListTotal }}</p>
          </div>
          <div class="sd-con">
            <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
              <Button icon="ios-cloud-upload-outline" :disabled="taxTotal > 0">导入</Button>
            </Upload>
            <div>
              <Button @click="filterList" :disabled="taxTotal === 0">计算奖票</Button>
              <Button @click="shuffleList" :disabled="lotteryTotal === 0">打乱奖池</Button>
            </div>
            <div class="sd-con">
              <Button @click="cleanList" :disabled="!taxTotal > 0">清空数据</Button>
            </div>
          </div>
        </div>
        <div class="loading" v-show="loading.stat">
          <div class="loading-con">
            <Spin size="large"></Spin>
            <span class="text">{{ loading.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'IndexPage',
    data() {
      return {
        prize: [{
          title: '一等奖 1个',
          img: 'static/bmw.png',
          desc: '华晨宝马3系轿车1辆 价值¥300,000',
          key: 'firstLottery'
        }, {
          title: '二等奖 10个',
          img: 'static/yuexiang.png',
          desc: '长安汽车悦翔轿车1辆 价值¥80,000',
          key: 'secondLottery'
        }, {
          title: '三等奖 100个',
          img: 'static/quan.png',
          desc: '5000元家用电器现金消费券',
          key: 'thirdLottery'
        }],
        loading: {
          stat: false,
          text: '数据导入中...'
        }
      }
    },
    computed: {
      taxTotal() {
        return this.$store.state.seed.taxTotal
      },
      lotteryTotal() {
        return this.$store.state.seed.lotteryTotal
      },
      noListTotal() {
        return this.$store.state.seed.noList.length
      },
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
      handleUpload(file) {
        this.loading = {stat: true, text: '数据导入中...'}
        let that = this
        const reader = new FileReader()
        // 重写FileReader上的readAsBinaryString方法
        FileReader.prototype.readAsBinaryString = async function(f) {
          let binary = ''
          const reader = new FileReader()
          reader.onload = async function(e) {
            // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
            const bytes = new Uint8Array(reader.result)
            const length = bytes.byteLength
            for (let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            // 接下来就是xlsx了，具体可看api
            const wb = XLSX.read(binary, {
              type: 'binary'
            })
            const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            await that.$store.dispatch('importSeedData', outdata)
            that.loading = {stat: false, text: '数据导入中...'}
            that.$Message.success('发票数据导入成功')
          }
          reader.readAsArrayBuffer(f)
        }
        reader.readAsBinaryString(file)
        return false
      },
      async cleanList() {
        await this.$store.dispatch('cleanSeedData')
        this.$Message.success('数据清除成功')
      },
      async filterList() {
        this.loading = {stat: true, text: '奖票计算中...'}
        await this.$store.dispatch('filterSeedData')
        this.$Message.success('奖票数据计算完成')
        this.loading = {stat: false, text: '奖票计算中...'}
        // this.$router.push('/lotteries')
      },
      async shuffleList() {
        this.loading = {stat: true, text: '奖票打乱中...'}
        await this.$store.dispatch('shuffle')
        this.$Message.success('奖池数据已打乱')
        this.loading = {stat: false, text: '奖票打乱中...'}
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
  margin: 0px 0px 0px 0px;
}
.prize {
	display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: space-between;
  margin: 30px 0px 0px 0px;
  padding: 20px;
  background: #ffffff;
  border: 2px solid #ff6600;
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
  margin: 30px 0px 0px 150px;
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
.loading {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .2);
  width: 100vw;
  height: 100vh;
  z-index: 9;
}
.loading-con {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 20px;
}
.loading-con .text {
  margin: 0px 0px 0px 5px;
  font-size: 16px;
	line-height: 1.8;
	font-weight: 400;
	color: #17233d;
}
</style>