<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  .title_wrap{
    position: relative;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 60px;
    color: #fff;
    background: #0C85E0;
    .back{
      position: absolute;
      top: 24px;
      left: 40px;
      width: 100px;
      height: 50px;
      line-height: 50px;
      font-size: 26px;
      cursor: pointer;
      background: #3eb9f2;
      .sanjiao{
        position: absolute;
        top: 0px;
        left: -50px;
        border: 25px solid #3eb9f2;
        border-color: transparent #3eb9f2 transparent transparent;
      }
    }
  }
  .table{
    height: calc(100% - 200px);
    padding: 20px 15px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    .table_wrap{
      display: flex;
      justify-content: space-between;
      text-align: center;
      list-style: none;
      border-right: 1px solid #333;
      li{
        position: relative;
        flex: 1;
        height: 42px;
        line-height: 42px;
        font-size: 20px;
        border: 1px solid #333;
        border-right: none;
        .el-input__inner{
          font-size: 20px;
          padding: 0;
          text-align: center;
          border: none;
          color: #333;
        }
        .el-checkbox__inner{
          width: 25px;
          height: 25px;
          &::after{
            border-width: 2px;
            width: 8px;
            height: 15px;
            left: 6px;
            top: 0;
          }
        }
        .el-checkbox{
          position: absolute;
          top: -2px;
          left: 56px;
        }
        .el-button--danger{
          color: #0C85E0;
          background: #fff;
          border-color: #fff;
        }
        .el-button{
          position: absolute;
          top: 3px;
          left: 56px;
        }
      }
      &.active{
        background: #f5f5f5;
        .el-input__inner{
          background: #f5f5f5;
        }
        .el-button--danger{
          color: #fff;
          background: #F56C6C;
          border-color: #F56C6C;
        }
      }
    }
    .el-form--inline{
      .el-form-item{
        margin-right: 50px;
      } 
    }
    .page{
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
  }
  .button{
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 80px;
    div{
      position: absolute;
      top: 0;
      width: 200px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 26px;
      cursor: pointer;
      color: #fff;
    }
    .delete{
      right: 235px;
      background: #F56C6C;
    }
    .submit{
      right: 15px;
      background: #FBC76E;
    }
  }
}
</style>
