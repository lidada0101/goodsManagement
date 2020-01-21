<template>
  <div class="storeroom">
    <div class="joinstoreroom-title title_wrap">
      <div class="back" @click="back">
        <div class="sanjiao"></div>
        返回
      </div>
      仓库
    </div>
    <div class="table">
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
        <el-form-item label="名字" prop="name">
          <el-input v-model="formInline.name" placeholder="名字" clearable></el-input>
        </el-form-item>
        <el-form-item label="条形码" prop="code">
          <el-input v-model="formInline.code" placeholder="条形码" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="type">
          <el-select v-model="formInline.type" placeholder="全部">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="缺货" value="缺货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="formInline.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <el-button type="primary" @click="reset('formInline')">重置</el-button>
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
        <ul class="table_wrap" v-show="tableData.length" v-for="(item, index) in tableData" :key="index" :class="item.checked ? 'active' : ''">
          <li><el-checkbox v-model="item.checked"></el-checkbox></li>
          <li>{{item.name}}</li>
          <li>{{item.code}}</li>
          <li>{{item.unit}}</li>
          <li class="number" :class="item.number <= 0 ? 'active' : ''">{{item.number}}</li>
          <li>{{item.price}}</li>
          <li>{{item.time}}</li>
          <li>
            <el-button type="primary" size="medium" @click="opendialog(item)">编辑</el-button>
            <el-button type="danger" size="medium" @click="tableData.splice(index, 1)">删除</el-button>
          </li>
        </ul>
        <ul class="table_wrap" v-show="!tableData.length">
          <li>暂无数据</li>
        </ul>
      </div>
      <div class="page" v-show="total > 10">
        <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </div>
    </div>
    <div class="button">
      <div class="delete" @click="deleteAll()">批量删除</div>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
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
          <el-button type="success" @click="redact()">添加</el-button>
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
          name: '',
          code: '',
          time: '',
          type: '全部'
        }, // 搜索条件
        currentPage: 1, // 当前页
        total: 10, // 总数
        dialogFormVisible: false,
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
      onSubmit () {
        let data = Object.assign({}, this.formInline,  {currentPage: this.currentPage})
        this.$ajax(api.getStoreroomList,
          {
            method: 'POST',
            data: data
          }
          ).then(res => {
            if (res.data.code === 0) {
              this.total = res.data.total
              res.data.data.forEach(item => {
                item.time = this.cutTime(item.time)
              })
              this.tableData = res.data.data
            }
          }).catch(e => {
            this.$message({
              message: '请确认输入内容是否正确',
              type: 'danger'
            })
          })
      }, // 搜索
      handleCurrentChange(val) {
        this.onSubmit()
      }, // 改变当前页
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
      redact () {
        this.$ajax(api.redactStoreroom,
          {
            method: 'POST',
            data: this.dialogtableData
          }
          ).then(res => {
            if (res.data.code === 0) {
              this.dialogFormVisible = false
              this.dialogtableData = {}
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          }).catch(e => {
            this.$message({
              message: '请确认输入内容是否正确',
              type: 'danger'
            })
          })
      }, // 修改
      opendialog (val) {
        this.dialogtableData = val
        this.dialogFormVisible = true
      }, // 打开弹出框
      reset (formInline) {
        this.$refs[formInline].resetFields()
        this.onSubmit()
      } // 重置
    },
    created () {
      this.onSubmit()
    }
  }
</script>

<style lang="scss">
.storeroom{
  width: 100%;
  height: 100%;
  position: relative;
  .delete{
    right: 30px !important;
  }
  .table_wrap{
    li{
      .el-button:first-child{
        left: 20px !important;
      }
      .el-button:last-child{
        left: 86px !important;
      }
    }
    .number.active{
      color: red !important;
    }
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