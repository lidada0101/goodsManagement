<template>
  <div class="test">
    <h1>test测试1</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: []
    }
  },
  methods: {
  },
  mounted(){
    var that = this
    window.addEventListener('keypress',function(e){
      if(e.key !== 'Enter'){
        that.code = that.code + e.key
        // that.code.push(e.key)
      }else{
        console.log('code:',that.code);
        that.code = ''
        return that.code
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.test {
  h1 {
    color: red;
  }
}
</style>