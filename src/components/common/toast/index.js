import Toast from './Toast'

const toastObj = {}

toastObj.install = function(Vue){
  //1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2. new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastConstructor()

  //3. 将组件对象挂载到一个元素上
  toast.$mount(document.createElement('div'))

  //4. toast.$el对应的就是上面挂载的div
  document.body.appendChild(toast.$el)

  //5. 设置Vue的$toast
  Vue.prototype.$toast = toast
}

export default toastObj
