<template>
<div class="cart">
  <nav-bar class="nav">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
  <cart-list :cartList="cartList"/>
  <cart-bottom-bar/>
</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //...mapGetters(['getCartLength','getCarts'])
      ...mapGetters({
        length: 'getCartLength',
        cartList: 'getCarts'
      })
    }
  }

</script>

<style scoped>
  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
