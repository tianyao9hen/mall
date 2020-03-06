export function debounce(func,delay=50){
  //防抖函数，减少调用scroll.refresh的次数
  //func 执行的方法
  //delay 间隔的时间
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

export function formateDate(date,fmt){
  //时间戳转指定格式字符串方法

  //获取年份
  if(/(y+)/.test(fmt)){
    //RegExp.$1 截取出来的内容 $1截取的第一个内容
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //获取其他日期和时间
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str){
  return ('00' + str).substr(str.length)
}
