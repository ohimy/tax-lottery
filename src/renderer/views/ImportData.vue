<template>
  <div class="app-container">
    <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
      <Button icon="ios-cloud-upload-outline">导入</Button>
    </Upload>
    <Button icon="ios-cloud-upload-outline" @click="cleanList">清空数据</Button>
    <Button icon="ios-cloud-upload-outline" @click="filterList">计算奖票</Button>
    <Table :columns="taxColumns" :data="list"></Table>
    <Page v-if="total > 0" :current="listQuery.page" :page-size="listQuery.size" :total="total" show-total @on-change="pageChange" />
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'ImportDataPage',
  data() {
    return {
      taxes: [],
      listQuery: {
        page: 1,
        size: 20
      },
      taxColumns: [
        {
          title: '编号',
          key: 'no'
        },
        {
          title: '发票号码',
          key: 'code'
        },
        {
          title: '金额',
          key: 'amount'
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('fetchTaxList', {
      page: 1,
      size: 20
    })
  },
  computed: {
    list() {
      return this.$store.state.seed.taxList
    },
    total() {
      return this.$store.state.seed.taxTotal
    }
  },
  methods: {
    lotteryCount(amount) {
      return amount > 2000 ? 10 : parseInt(amount / 200)
    },
    pageChange(pageNo = 1) {
      this.$store.dispatch('fetchTaxList', {
        page: pageNo,
        size: 20
      })
    },
    handleUpload(file) {
      let that = this
      const reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
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
          that.pageChange()
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(file)
      return false
    },
    async cleanList() {
      await this.$store.dispatch('cleanSeedData')
    },
    filterList() {
      this.list.forEach(element => {
        if (this.lotteryCount(element.amount) > 0) {
          for (let index = 0; index < this.lotteryCount(element.amount); index++) {
            this.$store.commit('PUSH_LOTTERIES', {
              no: element.no,
              code: element.code
            })
            console.log(element.no)
          }
        }
      })
    }
  }
}
</script>
<style scoped>
</style>