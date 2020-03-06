<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot  name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot  name="item-text"></slot>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'TabBarItem',
      props: {
        path: String,
        activeColor: {
          type: String,
          default: 'deeppink'
        }
      },
      data(){
        return {
            //isActive: false
        }
      },
      computed: {
        //计算属性会自动的执行方法并且检测变化
        isActive(){
          return !this.$route.path.indexOf(this.path);
        },
        activeStyle(){
          return this.isActive ? {color: this.activeColor}: {}
        }
      },
      methods: {
        itemClick(){
          if(this.$route.path.indexOf(this.path)){
            this.$router.replace(this.path);
          }
        }
      }
    }

</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /*一般底部50像素，除了49之外，还有一个像素的阴影*/
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
