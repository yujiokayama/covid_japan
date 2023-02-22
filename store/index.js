export const state = () => ({})

export const mutations = {}

export const actions = {}

export const getters = {
  /**
   * 病床使用率
   * @return {Number}
   */
  bedUseRate: (state, getters, rootState, rootGetters) => {
    const currentPatients = rootGetters['modules/patientsdata/currentPatients']
    const numberOfBeds = rootGetters['modules/hospitalbed/numberOfBeds']
    return ((currentPatients / numberOfBeds) * 100).toFixed(1)
  },

  /**
   * 病床使用グラフ
   * @return {Object}
   */
  bedUseGraphData: (state, getters, rootState, rootGetters) => {
    const currentPatients =
      rootGetters['modules/patientsdata/selectedPrefData'].ncurrentpatients
    const numberOfBeds = rootGetters['modules/hospitalbed/numberOfBeds']
    const bedsLeft = numberOfBeds - currentPatients
    return {
      labels: ['現在感染者', '推定病床残数'],
      datasets: [
        {
          data: [currentPatients, bedsLeft],
          backgroundColor: ['#d63031', '#3498db'],
          borderColor: 'transparent'
        }
      ]
    }
  }
}
