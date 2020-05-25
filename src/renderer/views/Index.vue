<template>
  <div class="app-container">
    <Row :gutter="20">
      <i-col :xl="8" :lg="12" :md="12" class="magin">
        <Input v-model="listQuery.region" placeholder="请输入城市名称，如：北京" style="width: 230px" />
      </i-col>
      <i-col :xl="8" :lg="12" :md="12" class="magin">
        <Input v-model="listQuery.keyword" placeholder="请输入关键字，如：奶茶" style="width: 230px"/>
        <Button type="warning">重置</Button>
      </i-col>
      <i-col :xl="8" :lg="12" :md="12" class="magin">
        <Input v-model="listQuery.search" placeholder="过滤关键字" style="width: 200px"/>
        <Button type="success">过滤</Button>
        <Button type="warning">重置</Button>
      </i-col>
      <i-col :span="24">
        <h3 class="h2">条件筛选</h3>
        <Row>
          <i-col :xl="12" :lg="12">
            <CheckboxGroup v-model="checkedmap">
              <Checkbox label="百度地图" border class="Checkbox"></Checkbox>
              <Checkbox label="360地图" border class="Checkbox"></Checkbox>
              <Checkbox label="高德地图" border class="Checkbox"></Checkbox>
              <Checkbox label="腾讯地图" border class="Checkbox"></Checkbox>
              <Checkbox label="搜狗地图" border class="Checkbox"></Checkbox>
            </CheckboxGroup>
          </i-col>
          <i-col :xl="12" :lg="12">
            <CheckboxGroup v-model="checkedtel">
              <Checkbox label="去除没有联系方式的数据" border class="Checkbox"></Checkbox>
              <Checkbox label="仅保留有手机号码的数据" border class="Checkbox"></Checkbox>
            </CheckboxGroup>
          </i-col>
        </Row>
      </i-col>
      <i-col :span="24" class="paddings">
        <Row>
          <i-col :xl="12" :md="24">
            <Row>
              <i-col :span="4">
                <Button type="success" @click="query">开始采集</Button>
              </i-col>
              <i-col :span="4">
                <Button type="error">停止采集</Button>
              </i-col>
              <i-col :span="4">
                <Button type="info">导出数据</Button>
              </i-col>
              <i-col :span="4">
                <Button type="error">清空数据</Button>
              </i-col>
            </Row>
          </i-col>
          <i-col :xl="12" :md="24">
            <Row>
              <i-col :span="8" class="link">
                <span class="spancolor">总已采集到数据（去重后）:</span>
                <span class="spancolor2">{{ total }}</span>
              </i-col>
              <i-col :span="6" class="link">
                <span class="spancolor">去重条数:</span>
                <span class="spancolor2">0</span>
              </i-col>
            </Row>
          </i-col>
          <i-col :span="24" class="paddings">
            <Table border :columns="columns" :data="list" />
          </i-col>
          <i-col :span="24">
            <div class="page">
              <Page :total="total" :current.sync="listQuery.page" :page-size="20" show-total show-elevator @on-change="pIndexChange" />
            </div>
          </i-col>
        </Row>
      </i-col>
    </Row>
    <!-- 联系微信 -->
    <div class="rightanniu">
      <p class="pfix1">(023) 8837 3377</p>
      <p class="pfix2">
        <a
          href="tencent://message/?uin=360350356&Menu=yes& Service=300&sigT=42a1e5347953b64c5ff3980f8a6e644d4b31456cb0b6ac6b27663a3c4dd0f4aa14a543b1716f9d45"
          >立即咨询
        </a>
      </p>
      <p class="pfix3">
        微信公号
        <img
          alt
          src="https://img.alicdn.com/imgextra/i1/1666188817/O1CN01vLfytJ2F0EfVlmaTL_!!1666188817-0-daren.jpg"
        />
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'IndexPage',
    data () {
      return {
        listQuery: {
          keyword: '奶茶',
          region: '万州',
          page: 1,
          search: ''
        },
        checkedmap: [],
        checkedtel: [],
        columns: [
          {title: '序号', key: 'iid', align: 'center', width: 70},
          {title: '名称', key: 'title', width: 250},
          {title: '城市', key: 'region', width: 100, align: 'center'},
          {title: '地址', key: 'address', width: 200},
          {title: '座机', key: 'tel', align: 'center'},
          {title: '手机号码', key: 'phone', align: 'center'},
          {title: '数据来源', key: 'sourcedata', align: 'center'},
          {title: '类别', key: 'category', align: 'center'},
          {title: '坐标', key: 'coordinate', align: 'center'}
        ]
      }
    },
    created() {
      this.$store.dispatch('asyncTask', this.listQuery)
    },
    computed: {
      ...mapGetters(['list', 'total'])
    },
    methods: {
      query() {
        this.$store.dispatch('asyncTask', this.listQuery)
      },
      pIndexChange(i) {
        this.listQuery.page = i
        this.query()
      },
      ...mapActions({
        getData: 'asyncTask'
      })
    }
  }
</script>

<style scoped>
.rightanniu {
  position: fixed;
  bottom: 50%;
  margin-bottom: -100px;
  right: -66px;
  width: 120px;
  z-index: 999999;
  height: 223px;
  transition: all 0.5s ease;
  font: 16px/53px 'Microsoft YaHei';
}
.rightanniu p a {
  color: #fff;
  display: inline-block;
  height: 53px;
  width: 100%;
}
.pfix1 {
  height: 54px;
  width: 180px;
  position: absolute;
  border-radius: 5px;
  top: 57px;
  padding-left: 60px;
  line-height: 55px;
  color: #fff;
  background: #ff6a64 url(https://img.alicdn.com/imgextra/i4/1666188817/O1CN01mZCPPO2F0EfTIfRE6_!!1666188817-2-daren.png)
    no-repeat 0 -57px;
  font-size: 14px;
}
.pfix2 {
  height: 54px;
  width: 180px;
  position: absolute;
  border-radius: 5px;
  top: 115px;
  padding-left: 60px;
  line-height: 55px;
  color: #fff;
  background: #ff6a64 url(https://img.alicdn.com/imgextra/i4/1666188817/O1CN01mZCPPO2F0EfTIfRE6_!!1666188817-2-daren.png) no-repeat 0 -113px;
}
.pfix3 {
  height: 54px;
  width: 180px;
  position: absolute;
  border-radius: 5px;
  top: 172px;
  padding-left: 60px;
  line-height: 55px;
  color: #fff;
  transition: all 0.5s ease;
  background: #ff6a64 url(https://img.alicdn.com/imgextra/i4/1666188817/O1CN01mZCPPO2F0EfTIfRE6_!!1666188817-2-daren.png) no-repeat 0 -169px;
}
.pfix3 img {
  height: 0;
  width: 0;
  transition: all 0.5s ease;
  position: absolute;
  top: 55px;
  left: 55px;
}
.rightanniu:hover {
  right: 66px;
  cursor: pointer;
}
.rightanniu:hover .pfix3 {
  cursor: pointer;
  height: 154px;
}
.rightanniu:hover .pfix3 img {
  height: 80px;
  width: 80px;
}
.wx {
  position: fixed;
  right: 0;
  top: 300px;
}
.Checkbox {
  margin-top: 10px;
}
.magin {
  margin-top: 10px;
}
.page {
  text-align: center;
  padding: 30px 0 10px 0;
}
.h2 {
  padding: 20px 0 0px 0;
  color: red;
  border-bottom: 2px solid #eee;
  margin-bottom: 15px;
}
.padding {
  padding: 20px 55px;
}
.paddings {
  padding: 20px 0 0px 0;
}
.spancolor {
  font-size: 14px;
  color: #515a6e;
  font-weight: bold;
  line-height: 32px;
}
.spancolor2 {
  font-size: 14px;
  color: red;
  font-weight: bold;
}
</style>