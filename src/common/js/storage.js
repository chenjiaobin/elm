/**
 * 存储数据到localstorage
 */
export function saveStore (key, value) {
  let elm = window.localStorage._elm_
  if (!elm) {
    elm = {}
  } else {
    elm = JSON.parse(elm)
  }
  elm[key] = value
  console.log(123)
  window.localStorage._elm_ = JSON.stringify(elm)
}

/**
 * 获得指定的缓存信息
 * key准备获取的key值
 * def为缓存不存在的时候返回的信息
 */
export function getStore (key, def) {
  let elm = window.localStorage._elm_
  if (!elm) {
    return def
  }
  elm = JSON.parse(elm)
  let temp = elm[key]
  return temp || def
}