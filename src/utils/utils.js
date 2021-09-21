/**
 * 防抖: 当事件快速连续不断触发时，动作只会执行一次
 * @param cb 回调函数
 * @param wait 等待时间
 * @returns function
 */
export const debounce = (cb, wait) => {
  let timer = null
  return (...rest) => {
    let args = rest
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      cb(args)
    }, wait)
  }
}

/**
 * 节流: 固定周期内，只执行一次动作
 * @param fun 回调函数
 * @param wait 等待时间
 * @returns function
 */
export const throttle = (fun, wait = 3000) => (...rest) => {
  let timer = null
  let args = rest
  if (!timer) {
    timer = setTimeout(() => {
      fun(args)
      timer = null
    }, wait)
  }
}

export const flatArr = (list, childName, newArr = []) => {
  list.forEach(item => {
    if (item[childName] && item[childName].length > 0) {
      const obj = { ...item }
      delete obj[childName]
      newArr.push(obj)
      flatArr(item[childName], childName, newArr)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}
