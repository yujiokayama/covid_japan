<template>
  <div v-if="!isLoading" class="container">
    <section>
      <h1 class="title-main">日本COVID-19情報</h1>
      <p class="text-last-update">最終更新日: {{ update }}</p>
      <div class="grid grid-320 total-infomation">
        <div>
          <dl>
            <dt>累積退院者</dt>
            <dd>{{ commaSeparated(cumulativeDischarge) }}人</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>現在患者数</dt>
            <dd>{{ commaSeparated(totalCurrentPatients) }}人</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>累積死亡者</dt>
            <dd>{{ commaSeparated(cumulativeDeath) }}人</dd>
          </dl>
        </div>
      </div>
    </section>
    <section>
      <div class="grid grid-120">
        <div
          :id="patientsData.name"
          v-for="patientsData in patientsDataArea"
          :key="patientsData.name_jp"
          :class="[
            'list-patients-data',
            infectionStatus(patientsData.ncurrentpatients)
          ]"
        >
          <dl @click="setDataByPrefecture">
            <dt class="title-sub">
              {{ patientsData.name_jp }}
            </dt>
            <dd>{{ commaSeparated(patientsData.ncurrentpatients) }}人</dd>
          </dl>
        </div>
      </div>
    </section>
    <ModalContainer v-if="modalFlg">
      <component :is="currentModal" />
    </ModalContainer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalContainer from '~/components/modal/ModalContainer'
import Modal from '~/components/modal/Modal'

export default {
  components: {
    ModalContainer,
    Modal
  },
  data() {
    return {
      update: '',
      isLoading: true
    }
  },
  computed: {
    ...mapGetters('modules/patientsdata/', [
      'totalCurrentPatients',
      'cumulativeDischarge',
      'cumulativeDeath',
      'patientsDataArea',
      'infectionStatus',
      'getLastUpdate'
    ]),
    ...mapGetters('modules/modal', ['currentModal', 'modalFlg']),
    /**
     * カンマ区切り
     * @return {string} カンマ区切り
     */
    commaSeparated() {
      return (str) => {
        return Number(str).toLocaleString()
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    ...mapActions('modules/patientsdata', [
      'storageLastUpdate',
      'storagePatientsDataArea',
      'setDataByPrefecture',
      'getDataByPrefecture',
      'getPatientsData'
    ]),
    ...mapActions('modules/hospitalbed', ['getHospitalBedData']),
    ...mapActions('modules/modal', ['modalOpen']),
    init() {
      Promise.all([this.getPatientsData(), this.getHospitalBedData()]).then(
        () => {
          this.setLastUpdate()
          this.isLoading = false
        }
      )
    },
    /**
     * 最終更新日をセットする
     */
    setLastUpdate() {
      const lastUpdate = this.getLastUpdate
      const dt = new Date(lastUpdate)
      const weakData = ['日', '月', '火', '水', '木', '金', '土']
      const day = weakData[dt.getDay()]

      this.update = `${lastUpdate.replace(/-/g, '/')}(${day})`
    }
  }
}
</script>

<style lang="scss" scoped></style>
