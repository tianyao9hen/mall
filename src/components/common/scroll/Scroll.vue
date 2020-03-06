<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null,
      }
    },
    mounted(){
      //这里new BScroll 就已经使滚动组件生效了
      //同时可以将BScroll对象保存一下，方便调用
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动事件
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) => {
          //这个事件，在scroll对象probeType: 3时生效
          this.$emit('scroll',position)
        })
      }

      //监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          //这个事件，在scroll对象pullUpload:true时会生效
          this.$emit("pullingUp")
        })
      }
    },
    methods: {
      scrollTo(x,y,time = 300){
        // 之所以这么写是因为 && 如果前面为false,后面的代码就不会执行了
        // 之所以前面要加上判断，是因为 scroll对象是在该组件加载完成之后才初始化的，但调用这些方法时，初始化不一定已经执行完成了
        // 所以必须在确保初始化已经完成后，才能执行方法
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
          this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh(){
          this.scroll && this.scroll.refresh && this.scroll.refresh()
      }

    }
  }
</script>

<style scoped>

</style>
