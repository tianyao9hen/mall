<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImageListener: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    mixin: [itemListenerMixin],
    created(){
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        //获取商家信息
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //获取评论信息
        if(data.rate.cRate !==0){
            this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      })


    },
    mounted(){
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        // 工具条根据滚动的位置自动的转换
        //1.获取滚动到的位置
        const positionY = -position.y
        //2.与themeTopYs中的值进行比较
        for(let i=0;i<this.themeTopYs.length;i++){
         if( this.currentIndex !== i && (i < this.themeTopYs.length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
           || (i === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]) ){
            this.currentIndex = i;
            this.$refs.nav.currentTitleIndex = this.currentIndex
         }
        }
      },
      addToCart(){
        //加入购物车
        //1. 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2. 将商品添加到购物车里
        this.$store.dispatch('addCart',product).then(res => {
          this.$toast.show(res);
        })
      }
    }
  }

</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
