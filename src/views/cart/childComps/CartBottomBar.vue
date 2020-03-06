<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" @click.native="checkClick" class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import checkButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'


  export default {
    name: 'CartBottomBar',
    components: {
      checkButton
    },
    computed: {
      ...mapGetters(['getCarts']),
      totalPrice(){
        console.log(this.getCarts);
        return '￥' + this.getCarts.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.count * item.price
        },0).toFixed(2)
      },
      checkLength(){
        return this.getCarts.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.getCarts.length === 0) return false
        //return !(this.getCarts.filter(item => !item.checked).length)
        return !this.getCarts.find(item => !item.checked)
      }
    },
    methods: {
      checkClick(){
        if(this.isSelectAll){
          this.getCarts.forEach(item => item.checked = false)
        }else{
          this.getCarts.forEach(item => item.checked = true)
        }
      }
    }
  }

</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    font-size: 16px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background: red;
    color: #ffffff;
    text-align: center;
  }


</style>
