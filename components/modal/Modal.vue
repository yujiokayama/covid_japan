<template>
  <div class="modal">
    <section>
      <i @click="modalClose" class="modal-close mdi mdi-close" />
      <h1 class="title-main">{{ selectedPrefData.name_jp }}</h1>
      <div class="grid">
        <div>
          <p class="text-bed-userate">
            病床使用率: <span>{{ bedUseRate }} </span>%
          </p>
          <circle-graph id="bedUseRate" :data="bedUseGraphData" />
          <p v-if="remarkOfBedsNumber" class="text-bed-remark">
            備考: {{ remarkOfBedsNumber }}
          </p>
          <p v-if="sourceOfBedsNumber" class="text-bed-sorce">
            出典:
            <a :href="sourceOfBedsNumber" target="_blank"
              >新型コロナウイルス感染症入院患者受入病床数等</a
            >
          </p>
        </div>
        <div>
          <dl>
            <dt>累積感染者数</dt>
            <dd>{{ selectedPrefData.npatients }}人</dd>
            <dt>現在感染者数</dt>
            <dd>{{ selectedPrefData.ncurrentpatients }}人</dd>
            <dt>累積退院者</dt>
            <dd>{{ selectedPrefData.nexits }}人</dd>
            <dt>累積死者</dt>
            <dd>{{ selectedPrefData.ndeaths }}人</dd>
            <dt>推定病床数</dt>
            <dd>{{ numberOfBeds }}床</dd>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Circle from '~/components/graph/Circle'

export default {
  components: {
    'circle-graph': Circle
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'bedUseRate',
      'dischargeRate',
      'bedUseGraphData',
      'dischargeRateGraphData'
    ]),
    ...mapGetters('modules/patientsdata/', [
      'patientsData',
      'selectedPrefData'
    ]),
    ...mapGetters('modules/hospitalbed/', [
      'hospitalBeds',
      'latestHospitalBeds',
      'numberOfBeds',
      'remarkOfBedsNumber',
      'sourceOfBedsNumber'
    ])
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions('modules/modal', ['modalClose'])
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: relative;
  &-close {
    position: absolute;
    right: 10px;
    font-size: 2rem;
    cursor: pointer;
  }
}
</style>
