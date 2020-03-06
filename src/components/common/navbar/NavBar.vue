<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'NarBar',
  }

</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px; /*一般导航栏高度都是44,如果要加导航栏一般是64*/
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
  .left,.right {
    width: 60px;
  }
  .center {
    flex: 1;/*将剩余部分全部填充*/
  }
</style>
