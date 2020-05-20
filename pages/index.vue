<template>
  <div class="container">
    <section>
      <h1 class="title-main">日本COVID-19情報</h1>
      <p class="text-last-update">最終更新日: {{ lastUpdate }}</p>
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
    return {}
  },
  computed: {
    ...mapGetters(['lastUpdate', 'commaSeparated']),
    ...mapGetters('modules/patientsdata/', [
      'totalCurrentPatients',
      'cumulativeDischarge',
      'cumulativeDeath',
      'patientsDataArea',
      'infectionStatus'
    ]),
    ...mapGetters('modules/modal', ['currentModal', 'modalFlg'])
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('modules/patientsdata/getPatientsData'),
      store.dispatch('modules/hospitalbed/getHospitalBedData')
    ])
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions('modules/patientsdata', ['getDataByPrefecture']),
    ...mapActions('modules/modal', ['modalOpen']),
    setDataByPrefecture(e) {
      this.modalOpen('Modal')
      this.getDataByPrefecture(this.$closest(e.target, 'div').id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
