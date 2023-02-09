<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "ProgressCharts",
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置对象
    lineCharts.setOption({
      xAxis: {
        show: false,
        min:0,
        max:100,
      },
      yAxis: {
        show: false,
        type: "category"
      },
      series: [
        {
          type: "bar",
          color:'yellowgreen',
          data:[55],
          barWidth:'30px',
          showBackground:true,
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      label:{
        show:true,
        formatter:'|',
        position:'right'
      }
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>