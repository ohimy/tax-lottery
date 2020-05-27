<template>
  <div class="app-container">
    <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
      <Button icon="ios-cloud-upload-outline">导入</Button>
    </Upload>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'ImportDataPage',
  data() {
    return {}
  },
  methods: {
    handleUpload(file) {
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var wb // 读取完成的数据
        var outdata // 你需要的数据
        var reader = new FileReader()
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          console.log(outdata)
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