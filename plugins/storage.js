export default ({ app }, inject) => {
  inject('setStorage', (key, state) =>
    localStorage.setItem(key, JSON.stringify(state))
  )
  inject('getStorage', (key) => {
    return localStorage.getItem(key)
  })
}
