<template>
  <div class="joinstoreroom">
    <div class="title_wrap">
      <div class="back" @click="back">
        <div class="sanjiao"></div>
        返回
      </div>
      入库
    </div>
    <div class="table">
      <ul class="table-title table_wrap">
        <li><el-checkbox v-model="all" @change="allchecked()">全选</el-checkbox></li>
        <li>名字</li>
        <li>条形码</li>
        <li>单位</li>
        <li>数量</li>
        <li>价格</li>
        <li>时间</li>
        <li>操作</li>
      </ul>
      <div class="table-content">
        <ul class="table_wrap" v-for="(item, index) in tableData" :key="index" :class="item.checked ? 'active' : ''">
          <li><el-checkbox v-model="item.checked"></el-checkbox></li>
          <li><el-input v-model="item.name" placeholder="请输入名字"></el-input></li>
          <li><el-input v-model="item.code" placeholder="请输入条形码"></el-input></li>
          <li><el-input v-model="item.unit" placeholder="请输入单位"></el-input></li>
          <li><el-input v-model="item.number" placeholder="请输入数量"></el-input></li>
          <li><el-input v-model="item.price" placeholder="请输入价格"></el-input></li>
          <li><el-input v-model="item.time" placeholder="请输入时间"></el-input></li>
          <li><el-button type="danger" size="medium" @click="tableData.splice(index, 1)" :disabled="!item.checked">删除</el-button></li>
        </ul>
      </div>
    </div>
    <div class="button">
      <div class="add" @click="add()">添加一行</div>
      <div class="delete" @click="deleteAll()">批量删除</div>
      <div class="submit" @click="joinstoreroom()">入库</div>
    </div>
  </div>
</template>

<script>
  import api from '../../request/api.js'
  export default {
    data () {
      return {
        tableData: [], // 表格
        all: false // 全选
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      }, // 返回上一页
      allchecked () {
        if (this.all) {
          this.tableData.forEach(item => {
            item.checked = true
          })
        } else {
          this.tableData.forEach(item => {
            item.checked = false
          })
        }
      }, // 全选
      deleteAll () {
        let arr = []
        for (let key in this.tableData) {
          if (this.tableData[key].checked) {
            arr.push(key)
          }
        }
        if (arr.length) {
          arr = arr.reverse()
          for (let key in arr) {
            this.tableData.splice(key, 1)
          }
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message('没有可删除的')
        }
      }, // 批量删除
      add () {
        let obj = {
          name: '',
          code: '',
          date: '',
          number: null,
          price: null,
          unit: '',
          checked: false
        }
        this.tableData.push(obj)
      }, // 添加一行
      joinstoreroom () {
        this.$ajax(api.joinStoreroom,
          {
            method: 'POST',
            data: this.tableData
          }
          ).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.tableData = []
            }
          }).catch(e => {
            this.$message({
              message: '网络错误',
              type: 'danger'
            })
          })
      } // 入库
    },
    mounted(){
      let that = this
      let code = ''
      window.addEventListener('keypress',function (e) {
        if(e.key !== 'Enter'){
          code += e.key
        }else{
          let obj = {
            name: '',
            code: code,
            unit: '',
            number: null,
            price: null,
            time: ''
          }
          that.tableData.push(obj)
          code = ''
        }
      })
    }
  }
</script>

<style lang="scss">
.joinstoreroom{
  width: 100%;
  height: 100%;
  position: relative;
  .add{
    right: 455px;
    width: 100px;
    height: 100%;
    background: #67C23A;
  }
}
</style>