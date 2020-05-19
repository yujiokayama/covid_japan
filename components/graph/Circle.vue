<template>
  <div>
    <canvas :id="id" width="100" height="100"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js'

export default {
  props: {
    id: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  mounted() {
    const ctx = document.getElementById(this.id)

    /**
     * ツールチップを常時表示
     */
    Chart.pluginService.register({
      beforeRender(chart) {
        if (chart.config.options.showAllTooltips) {
          // create an array of tooltips
          // we can't use the chart tooltip because there is only one tooltip per chart
          chart.pluginTooltips = []
          chart.config.data.datasets.forEach(function(dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function(sector, j) {
              chart.pluginTooltips.push(
                new Chart.Tooltip(
                  {
                    _chart: chart.chart,
                    _chartInstance: chart,
                    _data: chart.data,
                    _options: chart.options.tooltips,
                    _active: [sector]
                  },
                  chart
                )
              )
            })
          })

          // turn off normal tooltips
          chart.options.tooltips.enabled = false
        }
      },
      afterDraw(chart, easing) {
        if (chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
            if (easing !== 1) return
            chart.allTooltipsOnce = true
          }

          // turn on tooltips
          chart.options.tooltips.enabled = true
          Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
            tooltip.initialize()
            tooltip.update()
            // we don't actually need this since we are not animating tooltips
            tooltip.pivot()
            tooltip.transition(easing).draw()
          })
          chart.options.tooltips.enabled = false
        }
      }
    })

    /* eslint no-unused-vars: 0 */
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.data,
      options: {
        responsive: true,
        // maintainAspectRatio: true,
        showAllTooltips: true,
        legend: {
          position: 'top',
          display: false
        },
        animation: {
          animateScale: true
        }
      },
      plugins: []
    })
  }
}
</script>
