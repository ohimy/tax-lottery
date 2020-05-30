<template>
  <div class="app-container">
    <div class="main">
      <div class="list">
        <router-link :to="{name:'Home', query: item}" v-for="item in prize" :key="item.title" class="prize">
          <div class="prize-main">
            <h1 class="prize-title">{{ item.title }}</h1>
            <p class="prize-desc">{{ item.desc }}</p>
          </div>
          <img v-if="item.img" class="prize-img" :src="item.img">
        </router-link>
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
          </div>
          <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">导入</Button>
          </Upload>
          <Button icon="ios-cloud-upload-outline" @click="cleanList">清空数据</Button>
          <Button icon="ios-cloud-upload-outline" @click="filterList">计算奖票</Button>
          <Button icon="ios-cloud-upload-outline" @click="shuffleList">打乱奖池</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'PrizeIndex',
    data() {
      return {
        prize: [{
          title: '一等奖 1个',
          img: './static/bmw.png',
          desc: '华晨宝马3系轿车1辆 价值¥300000',
          key: 'firstLottery'
        }, {
          title: '二等奖 10个',
          img: './static/yuexiang.png',
          desc: '长安汽车悦翔轿车1辆 价值¥30000',
          key: 'secondLottery'
        }, {
          title: '三等奖 100个',
          img: './static/quan.png',
          desc: '5000元家用电器现金消费券',
          key: 'thirdLottery'
        }]
      }
    },
    computed: {
      taxTotal() {
        return this.$store.state.seed.taxTotal
      },
      lotteryTotal() {
        return this.$store.state.seed.lotteryTotal
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
        await this.$store.dispatch('filterSeedData')
        this.$Message.success('奖池数据已导入')
        // this.$router.push('/lotteries')
      },
      async shuffleList() {
        await this.$store.dispatch('shuffle')
        this.$Message.success('奖池数据已打乱')
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