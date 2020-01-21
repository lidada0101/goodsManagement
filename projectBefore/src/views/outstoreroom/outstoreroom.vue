<template>
  <div class="outstoreroom">
    <div class="joinstoreroom-title title_wrap">
      <div class="back" @click="back">
        <div class="sanjiao"></div>
        返回
      </div>
      出库
    </div>
    <div class="table">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="条形码">
          <el-input v-model="formInline.code" placeholder="条形码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form>
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
          <li><el-input v-model="item.name" placeholder="名字"></el-input></li>
          <li><el-input v-model="item.code" placeholder="条形码"></el-input></li>
          <li><el-input v-model="item.unit" placeholder="单位"></el-input></li>
          <li><el-input v-model="item.number" placeholder="数量"></el-input></li>
          <li><el-input v-model="item.price" placeholder="价格"></el-input></li>
          <li><el-input v-model="item.time" placeholder="时间"></el-input></li>
          <li><el-button type="danger" size="medium" @click="tableData.splice(index, 1)">删除</el-button></li>
        </ul>
      </div>
    </div>
    <div class="button">
      <div class="total">合计：{{total}}</div>
      <div class="delete" @click="deleteAll()">批量删除</div>
      <div class="submit" @click="outstoreroom()">出库</div>
    </div>
    <el-dialog title="查询结果" :visible.sync="dialogFormVisible">
      <div class="table">
        <ul class="table-title table_wrap">
          <li>名字</li>
          <li>条形码</li>
          <li>单位</li>
          <li>数量</li>
          <li>价格</li>
          <li>时间</li>
        </ul>
        <div class="table-content">
          <ul class="table_wrap">
            <li><el-input v-model="dialogtableData.name" placeholder="名字"></el-input></li>
            <li><el-input v-model="dialogtableData.code" placeholder="条形码"></el-input></li>
            <li><el-input v-model="dialogtableData.unit" placeholder="单位"></el-input></li>
            <li><el-input v-model="dialogtableData.number" placeholder="数量"></el-input></li>
            <li><el-input v-model="dialogtableData.price" placeholder="价格"></el-input></li>
            <li><el-input v-model="dialogtableData.time" placeholder="时间"></el-input></li>
          </ul>
        </div>
        <div class="table-button">
          <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="success" @click="addnewtableData()">添加</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../request/api.js'
  export default {
    data () {
      return {
        tableData: [], // 表格
        all: false, // 全选
        formInline: {
          code: ''
        }, // 搜索条件
        dialogFormVisible: false, // 弹出框
        dialogtableData: {}
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
          for (let i = 0; i < arr.length; i++) {
            this.tableData.splice(Number(arr[i]), 1)
          }
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message('没有可删除的')
        }
      }, // 批量删除
      onSubmit () {
        this.$ajax(api.getStoreroomOne,
          {
            method: 'POST',
            data: this.formInline
          }
          ).then(res => {
            this.dialogtableData = {}
            if (res.data.data.length) {
              this.dialogFormVisible = true
              this.dialogtableData = res.data.data[0]
              this.dialogtableData.time = this.cutTime(this.dialogtableData.time)
            } else {
              this.$message({
                message: '暂无数据',
                type: 'info'
              })
            }
          }).catch(e => {
            this.$message({
              message: '请确认输入内容是否正确',
              type: 'danger'
            })
          })
      }, // 搜索
      cutTime (data) {
        let date = new Date(data)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (month < 10) {
          month = "0" + month
        }
        if (day < 10) {
          day = "0" + day
        }
        return `${year}-${month}-${day}`
      }, // 转换时间
      addnewtableData () {
        this.tableData.push(this.dialogtableData)
        this.dialogFormVisible = false
        this.dialogtableData = {}
        this.formInline.code = ''
      }, // 添加
      outstoreroom () {
        this.$ajax(api.outStoreroom,
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
            } else {
              this.$message({
                message: res.data.msg,
                type: 'danger'
              })
            }
          }).catch(e => {
            this.$message({
              message: '请确认输入内容是否正确',
              type: 'danger'
            })
          })
      } // 出库
    },
    computed: {
      total () {
        let res = 0
        for (let key in this.tableData) {
          res += this.tableData[key].price
        }
        return res
      }
    },
    mounted(){
      let that = this
      let code = ''
      window.addEventListener('keypress',e => {
        if(e.key !== 'Enter'){
          code += e.key
        }else{
          console.log(code);
          that.formInline.code = code
          that.$ajax(api.getStoreroomOne,
          {
            method: 'POST',
            data: that.formInline
          }
          ).then(res => {
            if (res.data.data.length) {
              let obj = res.data.data[0]
              for (let key in that.tableData) {
                if (that.tableData[key].code === obj.code) {
                  that.tableData[key].number = that.tableData[key].number + obj.number
                } else {
                  that.tableData.push(obj)
                }
              }
              console.log(obj)
            } else {
              that.$message({
                message: '暂无数据',
                type: 'info'
              })
            }
            code = ''
          }).catch(e => {
            that.$message({
              message: '条形码无效',
              type: 'danger'
            })
          })
        }
      })
    }
  }
</script>

<style lang="scss">
.outstoreroom{
  width: 100%;
  height: 100%;
  position: relative;
  .total{
    left: 15px;
    width: 100px;
    height: 100%;
    color: #FBC76E !important;
    font-size: 42px !important;
  }
  .table-button{
    margin-top: 20px;
    text-align: center;
    .el-button{
      width: 100px;
      font-weight: 600;
    }
  }
}
</style>