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
      .$get('https://www.stopcovid19.jp/data/covid19japan.json')
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
    return state.response.patientsData.area.find((e) => {
      return e.name === 'Saitama'
    })
  },
  getHospitalBedData: (state) => {
    const localGovernment = state.response.HospitalBed.filter((e) => {
      return e['自治体名'] === '埼玉県'
    })
    const AnnouncementDate = localGovernment.sort((a, b) => {
      return (
        new Date(b['発表日']) - new Date(a['発表日']) ||
        b['新型コロナウイルス対策感染症病床数'] -
          a['新型コロナウイルス対策感染症病床数']
      )
    })
    return AnnouncementDate[0]
  },
  numberOfBeds: (state, getters) => {
    return getters.getHospitalBedData['新型コロナウイルス対策感染症病床数']
  },
  remarkOfBedsNumber: (state, getters) => {
    return getters.getHospitalBedData['備考']
  },
  sourceOfBedsNumber: (state, getters) => {
    return getters.getHospitalBedData['出典']
  },
  bedUseRate: (state, getters) => {
    return (
      (getters.patientsData.ncurrentpatients / getters.numberOfBeds) *
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
    const dt = new Date(state.response.patientsData.lastUpdate)
    const weakData = ['日', '月', '火', '水', '木', '金', '土']
    const day = weakData[dt.getDay()]
    return `${state.response.patientsData.lastUpdate.replace(
      /-/g,
      '/'
    )}(${day})`
  },
  bedUseGraphData: (state, getters) => {
    return {
      labels: ['現在感染者', '推定病床残数'],
      datasets: [
        {
          data: [
            getters.patientsData.ncurrentpatients,
            getters.numberOfBeds - getters.patientsData.ncurrentpatients
          ],
          backgroundColor: ['#d63031', '#3498db'],
          borderColor: 'transparent'
        }
      ]
    }
  },
  bedUseGraphOptions: () => {
    return {
      options: {}
    }
  },
  dischargeRateGraphData: (state, getters) => {
    return {
      labels: ['現在感染者数', '累積退院者'],
      datasets: [
        {
          data: [
            getters.patientsData.ncurrentpatients,
            getters.patientsData.nexits
          ],
          backgroundColor: ['#d63031', '#3498db'],
          borderColor: 'transparent'
        }
      ]
    }
  },
  dischargeRateGraphOptions: () => {
    return {
      options: {}
    }
  }
}
