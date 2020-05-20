export const state = () => ({
  /**
   * @val {Object} patientsData
   * @val {Array} selectedPrefData
   */
  patientsData: {},
  selectedPrefData: []
})

export const mutations = {
  getPatientsData(state, payload) {
    state.patientsData = payload
  },
  getDataByPrefecture(state, payload) {
    state.selectedPrefData = payload
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
    const prefData = getters.patientsDataArea.find((e) => {
      return e.name === pref
    })
    commit('getDataByPrefecture', prefData)
  }
}

export const getters = {
  /**
   * 現在患者数
   */
  totalCurrentPatients: (state) => {
    return state.patientsData.ncurrentpatients
  },
  /**
   * 累積退院者
   */
  cumulativeDischarge: (state) => {
    return state.patientsData.nexits
  },
  /**
   * 累積死亡者
   */
  cumulativeDeath: (state) => {
    return state.patientsData.ndeaths
  },
  /**
   * 最終更新日
   */
  lastUpdate: (state) => {
    return state.patientsData.lastUpdate
  },
  /**
   * 都道府県別のコロナ情報
   */
  patientsDataArea: (state) => {
    return state.patientsData.area
  },
  /**
   * 選択した都道府県のデータ
   */
  selectedPrefData: (state) => {
    return state.selectedPrefData
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
      : patients > 0 && patients <= 100
      ? { 'infection-status-caution-low': true }
      : patients >= 101 && patients <= 999
      ? { 'infection-status-caution-high': true }
      : patients >= 1000
      ? { 'infection-status-danger': true }
      : null
  }
}
