export const state = () => ({
  response: {
    patientsData: [],
    HospitalBed: []
  }
})

export const mutations = {
  getPatientsData(state, payload) {
    state.response.patientsData = payload
  },
  getHospitalBedData(state, payload) {
    state.response.HospitalBed = payload
  }
}

export const actions = {
  async getPatientsData({ commit }) {
    await this.$axios
      .$get('https://www.stopcovid19.jp/data/covid19japan-fast.json')
      .then((res) => {
        commit('getPatientsData', res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getHospitalBedData({ commit }) {
    await this.$axios
      .$get('https://www.stopcovid19.jp/data/bedforinfection_current.json')
      .then((res) => {
        commit('getHospitalBedData', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getters = {
  patientsData: (state) => {
    return state.response.patientsData.find((e) => {
      return e.name === 'Saitama'
    })
  },
  getHospitalBedData: (state) => {
    const localGovernment = state.response.HospitalBed.filter((e) => {
      return e['自治体名'] === '埼玉県'
    })
    const AnnouncementDate = localGovernment.sort((a, b) => {
      return new Date(b['発表日']) - new Date(a['発表日'])
    })
    return AnnouncementDate[0]['新型コロナウイルス対策感染症病床数']
  },
  bedUseRate: (state, getters) => {
    return (
      (getters.patientsData.ncurrentpatients / getters.getHospitalBedData) *
      100
    ).toFixed(1)
  },
  dischargeRate: (state, getters) => {
    return (
      (getters.patientsData.nexits / getters.patientsData.npatients) *
      100
    ).toFixed(1)
  },
  dateToJapanese: (state, getters) => {
    const dt = new Date(getters.patientsData.lastUpdate)
    const dateT = ['日', '月', '火', '水', '木', '金', '土']
    const day = dateT[dt.getDay()]
    return `${getters.patientsData.lastUpdate.replace(/-/g, '/')}(${day})`
  },
  bedUseGraphData: (state, getters) => {
    return {
      labels: ['現在感染者', '推定病床残数'],
      datasets: [
        {
          data: [
            getters.patientsData.ncurrentpatients,
            getters.getHospitalBedData - getters.patientsData.ncurrentpatients
          ],
          backgroundColor: ['#d63031', '#3498db'],
          borderColor: 'transparent'
        }
      ]
    }
  },
  bedUseGraphOptions: (state, getters) => {
    return {
      options: {}
    }
  },
  dischargeRateGraphData: (state, getters) => {
    return {
      labels: ['累積感染者数', '累積退院者'],
      datasets: [
        {
          data: [getters.patientsData.npatients, getters.patientsData.nexits],
          backgroundColor: ['#d63031', '#3498db'],
          borderColor: 'transparent'
        }
      ]
    }
  }
}
