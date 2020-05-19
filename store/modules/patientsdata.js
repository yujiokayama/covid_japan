export const state = () => ({
  /**
   * @val {String} lastUpdate
   * @val {Array} area
   */
  patientsData: {
    lastUpdate: '',
    area: [],
    selectedPrefData: []
  }
})

export const mutations = {
  getPatientsData(state, payload) {
    state.patientsData.lastUpdate = payload.lastUpdate
    state.patientsData.area = payload.area
  },
  getDataByPrefecture(state, payload) {
    state.patientsData.selectedPrefData = payload
  }
}

export const actions = {
  async getPatientsData({ commit }) {
    await this.$axios
      .$get('https://www.stopcovid19.jp/data/covid19japan.json')
      .then((res) => {
        commit('getPatientsData', res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getDataByPrefecture({ commit, getters }, pref) {
    const prefData = getters.patientsDataAll.find((e) => {
      return e.name === pref
    })
    commit('getDataByPrefecture', prefData)
  }
}

export const getters = {
  /**
   * 感染者情報
   */
  patientsDataAll: (state) => {
    return state.patientsData.area
  },
  /**
   * 最終更新日
   */
  lastUpdate: (state, getters) => {
    return state.patientsData.lastUpdate
  },
  /**
   * 選択した都道府県のデータ
   */
  selectedPrefData: (state) => {
    return state.patientsData.selectedPrefData
  },
  /**
   * 累積感染者数
   */
  totalPatients: (state, getters) => {
    return getters.selectedPrefData.npatients
  },
  /**
   * 現在の感染者数
   */
  currentPatients: (state, getters) => {
    return getters.selectedPrefData.ncurrentpatients
  },
  /**
   * 累積退院者数
   */
  currentExits: (state, getters) => {
    return getters.selectedPrefData.nexits
  },
  /**
   * @param {String} patients 累積患者数
   * @return {Object}
   */
  infectionStatus: () => (patients) => {
    return patients === 0
      ? { 'infection-status-fine': true }
      : patients >= 0 && patients <= 499
      ? { 'infection-status-caution-low': true }
      : patients >= 500 && patients <= 999
      ? { 'infection-status-caution-high': true }
      : patients >= 1000
      ? { 'infection-status-danger': true }
      : null
  }
}
