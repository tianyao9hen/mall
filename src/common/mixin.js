import {debounce} from './utils'

export const itemListenerMixin = {
  data(){
    return {
      itemImageListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,50)
    this.itemImageListener = () => {
      refresh()
    }

    this.$bus.$on('itemImageLoad',this.itemImageListener)
  }
}
