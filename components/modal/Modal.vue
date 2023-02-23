<template>
  <div class="modal">
    <section>
      <i @click="modalClose" class="modal-close mdi mdi-close" />
      <h1 class="title-main">{{ selectedPrefData.name_jp }}</h1>
      <div class="grid grid-320">
        <div>
          <p class="text-bed-userate">
            病床使用率: <span>{{ bedUseRate }} </span>%
          </p>
          <div class="graph-container">
            <CircleGraph id="bedUseRate" :data="bedUseGraphData" />
          </div>
        </div>
        <div class="patients-data">
          <dl>
            <dt>累積感染者数</dt>
            <dd>{{ commaSeparated(selectedPrefData.npatients) }}人</dd>
            <dt>現在感染者数</dt>
            <dd>{{ commaSeparated(selectedPrefData.ncurrentpatients) }}人</dd>
            <dt>累積退院者</dt>
            <dd>{{ commaSeparated(selectedPrefData.nexits) }}人</dd>
            <dt>累積死者</dt>
            <dd>{{ commaSeparated(selectedPrefData.ndeaths) }}人</dd>
            <dt>推定病床数</dt>
            <dd>{{ commaSeparated(numberOfBeds) }}床</dd>
          </dl>
        </div>
      </div>
      <p v-if="remarkOfBedsNumber" class="text-bed-remark">
        備考: {{ remarkOfBedsNumber }}
      </p>
      <p v-if="sourceOfBedsNumber" class="text-bed-sorce">
        出典:
        <a :href="sourceOfBedsNumber" target="_blank"
          >新型コロナウイルス感染症入院患者受入病床数等</a
        >
      </p>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CircleGraph from '~/components/graph/CircleGraph'

export default {
  components: {
    CircleGraph
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'commaSeparated',
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
    ]),
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
.graph {
  &-container {
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
