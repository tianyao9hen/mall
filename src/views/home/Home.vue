<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 ref="tabControl1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoodList"/>
    </scroll>
    <!--@click.native 触发组件根目录的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
      }
    },
    mixin: [itemListenerMixin],
    computed: {
      showGoodList(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      // 监听item中图片加载完成
      // 这里的监听方法之所以卸载mounted里，是因为，这个方法需要拿取组件中的元素，
      // 只有在组件加载完成后，才能够拿到这个组件
      // 这里使用了防抖动函数处理
      let refresh = debounce(this.$refs.scroll.refresh,50)
      this.itemImageListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    deactivated(){
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      swiperImageLoad(){
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      * 网络请求相关方法
      * */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].page = page
          this.goods[type].list.push(...res.data.list)
          this.$refs.scroll.finishPullUp()
        })
      },

      /*
      * 操作滚动条相关方法
      * */
      backClick(){
        //返回顶端
        //得到组件对象中的scroll属性
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //1. 判断BackTop是否显示
        this.isShowBackTop = position.y < -1000

        //2. 决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },

    }
  }

</script>

<style scoped>
  #home {
    height: 100vh; /*vh => view height： 视口高度*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*在使用浏览器原生滚动，为了使导航不跟随滚动设置的*/
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .tab-control {
    /*position: sticky;
    top: 44px;*/
    position: relative;
    z-index:9;
  }
  .content {
    /*使用相对定位，可以严格的设置大小，可以根据屏幕的大小自动调整*/
    /*子组件使用相对定位，上一级组件要设置为绝对定位，并且设置大小，这里设置了vh*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
