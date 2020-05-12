<template>
  <div class="container">
    <h1 class="title-main">埼玉県新型コロナ情報</h1>
    <p class="text-last-update">最終更新日 {{ dateToJapanese }}</p>
    <section>
      <div class="grid">
        <div>
          <dl>
            <dt>累積感染者数</dt>
            <dd>{{ patientsData.npatients }}人</dd>
            <dt>現在感染者数</dt>
            <dd>{{ patientsData.ncurrentpatients }}人</dd>
            <dt>累積退院者</dt>
            <dd>{{ patientsData.nexits }}人</dd>
            <dt>累積死者</dt>
            <dd>{{ patientsData.ndeaths }}人</dd>
          </dl>
        </div>
      </div>
      <div class="grid">
        <div>
          <p class="text-bed-userate">
            退院率: <span>{{ dischargeRate }} </span>%
          </p>
          <circle-graph id="dischargeRate" :data="dischargeRateGraphData" />
        </div>
        <div>
          <p class="text-bed-userate">
            病床使用率: <span>{{ bedUseRate }} </span>%
          </p>
          <circle-graph id="bedUseRate" :data="bedUseGraphData" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Circle from '~/components/Circle'
import CircleGraph from '~/components/CircleGraph'

export default {
  components: {
    'circle-graph': Circle,
    CircleGraph
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'patientsData',
      'getHospitalBedData',
      'bedUseRate',
      'dischargeRate',
      'dateToJapanese',
      'bedUseGraphData',
      'bedUseGraphOptions',
      'dischargeRateGraphData',
      'dischargeRateGraphOptions'
    ])
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('getPatientsData'),
      store.dispatch('getHospitalBedData')
    ])
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
$tab: 560px;
$pc: 960px;

@mixin tab {
  @media (min-width: ($tab)) {
    @content;
  }
}

@mixin pc {
  @media (min-width: ($pc)) {
    @content;
  }
}

.container {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 1em;
  @include tab {
    padding: 0 1.8rem;
  }
  @include pc {
    max-width: 1240px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  // grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 0rem;
  margin: 0 0 0.5rem;
  & > div {
    background: white;
    overflow: auto;
    min-width: 0;
    padding: 1rem;
  }
}
.title-main {
  margin: 10px 0;
  text-align: center;
  font-weight: normal;
}
.text-last-update {
  text-align: center;
}
.text-bed-userate {
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  text-align: center;
}
dl {
  @include tab {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    border-top: none;
  }
}
dt {
  width: 100%;
  padding: 10px;
  text-align: center;
  background: #ddd;
  @include tab {
    width: 30%;
    border-top: 1px solid #ccc;
    text-align: left;
  }
}
dd {
  width: 100%;
  padding: 10px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
  &:last-child {
    border-bottom: 1px solid #ccc;
  }
  @include tab {
    border-top: 1px solid #ccc;
    border-right: none;
    border-left: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    width: 70%;
    text-align: left;
    background: #fff;
  }
}
</style>
