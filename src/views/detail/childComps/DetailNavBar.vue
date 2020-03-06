<template>
  <div class="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title" class="title-item" @click="itemClick(index)" :class="{active: index === currentTitleIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data(){
      return {
        title: ['商品','参数','评论','推荐'],
        currentTitleIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentTitleIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }

</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>
