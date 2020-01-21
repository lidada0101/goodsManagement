<template>
  <div class="home">
    <div class="title">货物管理</div>
    <div class="nav">
      <div class="outstoreroom box" @click="jump('/outstoreroom')">
        <img src="../../assets/imgs/chuku.png" alt="">
        <div>出库</div>
      </div>
      <div class="joinstoreroom box" @click="jump('/joinstoreroom')">
        <img src="../../assets/imgs/ruku.png" alt="">
        <div>入库</div>
      </div>
      <div class="storeroom box" @click="jump('/storeroom')">
        <img src="../../assets/imgs/cangku.png" alt="">
        <div>仓库</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jump (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.home{
  width: 100%;
  height: 100%;
  .title{
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-size: 60px;
    color: #fff;
    background: #0C85E0;
  }
  .nav{
    width: 60%;
    height: calc(100% - 200px);
    margin: 0 auto;
    padding-top: 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .box{
      width: 200px;
      height: 200px;
      text-align: center;
      font-size: 30px;
      cursor: pointer;
      color: #fff;
      img{
        width: 100px;
        height: 100px;
        margin: 20px 0;
      }
    }
    .outstoreroom{
      background: #FDAEAB;
    }
    .joinstoreroom{
      background: #FBC76E;
    }
    .storeroom{
      background: #67D8B5;
    }
  }
}
</style>