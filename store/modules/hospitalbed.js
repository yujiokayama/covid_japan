export const state = () => ({
  /**
   * @val {Array} hospitalBed
   */
  hospitalBed: []
})

export const mutations = {
  getHospitalBedData(state, payload) {
    state.hospitalBed = payload
  }
}

export const actions = {
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
  /**
   * APIを扱いやすくする
   */
  hospitalBeds: (state) => {
    const hospitalBed = state.hospitalBed.map((e) => {
      return {
        localGovernment: e['自治体名'],
        numberOfBeds: e['新型コロナウイルス対策感染症病床数'],
        announcementDate: e['発表日'],
        source: e['出典'],
        remark: e['備考']
      }
    })

    return hospitalBed
  },
  /**
   * 選択された都道府県の病床データを取得する
   */
  hospitalBed: (state, getters, rootState, rootGetters) => {
    const selectedPrefData =
      rootGetters['modules/patientsdata/selectedPrefData']
    const localGovernment = getters.hospitalBeds.filter((e) => {
      return e.localGovernment === selectedPrefData.name_jp
    })
    const AnnouncementDate = localGovernment.sort((a, b) => {
      return (
        new Date(b.announcementDate) - new Date(a.announcementDate) ||
        b.numberOfBeds - a.numberOfBeds
      )
    })
    return AnnouncementDate[0]
  },
  /**
   * 病床数
   */
  numberOfBeds: (state, getters) => {
    return getters.hospitalBed.numberOfBeds
  },
  /**
   * 出典
   */
  sourceOfBedsNumber: (state, getters) => {
    return getters.hospitalBed.source
  },
  /**
   * 備考
   */
  remarkOfBedsNumber: (state, getters) => {
    return getters.hospitalBed.remark
  }
}
