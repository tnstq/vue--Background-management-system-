<template>
  <div>
    <div class="header">
      <span>11111</span>
      <svg
        t="1675741770842"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2815"
        width="25"
        height="25"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          fill="#707070"
          p-id="2816"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="title">22222</span>
      <span class="content">022222</span>
      <svg
        t="1675829324107"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2693"
        width="16"
        height="16"
      >
        <path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="2694"></path>
      </svg>
      <svg
        t="1675829440211"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4643"
        width="16"
        height="16"
      >
        <path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="4644"></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "LineCharts",
   mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置对象
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          smooth:true,
          color:'skyblue',
          data: [7, 5, 3, 6, 10,5,8,11,12,8,3,5,3,11,15],
          itemStyle:{
            opacity:0
          },
         areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "skyblue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.header span {
  margin-right: 15px;
}
.main{
  margin: 10px 0;
}
.main .title{
  margin-right: 30px;
}
.main .content{
  margin-right: 10px;
}
.charts{
  width: 100%;
  height: 50px;
}
</style>