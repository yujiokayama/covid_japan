import Vue from 'vue'

/**
 * closest for IE
 */
Vue.prototype.$closest = (node, selector) => {
  // IEや一部ブラウザでは.closet()が実装されていないので自前も用意
  return (
    node.closest ||
    function(_selector) {
      do {
        // nodeとselectorがマッチしたら返す
        if ((node.matches || node.msMatchesSelector).call(node, _selector)) {
          return node
        }
        // マッチしなかったら親要素を代入
        node = node.parentElement || node.parentNode
      } while (node !== null && node.nodeType === 1)

      return null
    }
  ).call(node, selector)
}
