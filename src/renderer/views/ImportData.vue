<template>
  <div class="app-container">
    <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
      <Button icon="ios-cloud-upload-outline">导入</Button>
    </Upload>
    {{ 0 }}
    {{ total || '无数据' }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import XLSX from 'xlsx'
export default {
  name: 'ImportDataPage',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['total', 'list'])
  },
  methods: {
    ...mapActions(['importSeedData']),
    handleUpload(file) {
      const reader = new FileReader()
      let that = this
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = ''
        const reader = new FileReader()
        reader.onload = function(e) {
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
          // that.importSeedData(outdata, outdata.length)
          console.log(outdata, outdata.length)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(file)
      return false
    }
  }
}
</script>
<style scoped>
</style>