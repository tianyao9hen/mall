import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state,payload){
      state.cartList.push(payload)
    },
    addCount(status,payload){
      payload.count += 1
    }
  },
  actions: {
    addCart(content,payload){
      return new Promise((resolve,reject) => {
        let oldProduct = content.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct){
          content.commit('addCount',oldProduct)
          resolve('商品数量+1')
        }else{
          payload.count = 1
          payload.checked = true
          content.commit('addCart',payload)
          resolve('商品+1')
        }
      })
    }
  },
  getters: {
    getCartLength(state){
      return state.cartList.length;
    },
    getCarts(state){
      return state.cartList;
    }
  }
})

export default store
