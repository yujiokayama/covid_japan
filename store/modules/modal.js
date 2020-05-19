export const state = () => ({
  /**
   * @var {String} currentModal
   */
  currentModal: null,
  /**
   * @var {Boolean} modalFlg
   */
  modalFlg: false
})

export const mutations = {
  setCurrentModal(state, payload) {
    state.currentModal = payload
  },
  modalFlg(state, payload) {
    state.modalFlg = payload
  }
}

export const actions = {
  modalOpen({ commit }, modal) {
    commit('modalFlg', true)
    commit('setCurrentModal', modal)
  },
  modalClose({ commit }) {
    commit('modalFlg', false)
    commit('setCurrentModal', null)
  }
}

export const getters = {
  currentModal: (state) => {
    return state.currentModal
  },
  modalFlg: (state) => {
    return state.modalFlg
  }
}
