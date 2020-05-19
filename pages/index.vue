<template>
  <div class="container">
    <section>
      <h1 class="title-main">日本COVID-19情報</h1>
      <p class="text-last-update">最終更新日: {{ lastUpdate }}</p>
      <div class="css-grid">
        <div
          :id="patientsData.name"
          v-for="patientsData in patientsDataAll"
          :key="patientsData.name_jp"
          :class="[
            'list-patients-data',
            infectionStatus(patientsData.npatients)
          ]"
        >
          <dl @click="setDataByPrefecture">
            <dt class="title-sub">
              {{ patientsData.name_jp }}
            </dt>
            <dd>{{ patientsData.npatients }}人</dd>
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
    ...mapGetters(['lastUpdate']),
    ...mapGetters('modules/patientsdata/', [
      'patientsDataAll',
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
