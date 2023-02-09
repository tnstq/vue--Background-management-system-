<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card>
          <Detail title="总销售额" count="￥ 114515">
            <template slot="charts"
              ><span
                >周同比&nbsp;77.77%
                <svg
                  t="1675744200788"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2689"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    fill="#d81e06"
                    p-id="2690"
                  ></path>
                </svg> </span
              >&nbsp;
              <span
                >日同比 19.96 &nbsp;<svg
                  t="1675744200788"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2689"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    fill="#1afa29"
                    p-id="2690"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 11451</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="访问量" count="2023207">
            <template slot="charts"><LineChart /></template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template></Detail
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="支付笔数" count="55926">
            <template slot="charts">
              <BarCharts />
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template></Detail
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="运营活动项目" count="55%">
            <template slot="charts">
              <ProgressCharts />
            </template>
            <template slot="footer"
              ><span
                >周同比&nbsp;77.77%
                <svg
                  t="1675744200788"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2689"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    fill="#d81e06"
                    p-id="2690"
                  ></path>
                </svg> </span
              >&nbsp;
              <span
                >日同比 19.96 &nbsp;<svg
                  t="1675744200788"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2689"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    fill="#1afa29"
                    p-id="2690"
                  ></path></svg
              ></span> </template></Detail></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from "./LineChart";
import BarCharts from "./BarCharts";
import ProgressCharts from "./ProgressCharts";
export default {
  name: "Card",
  components: { Detail, LineChart, BarCharts, ProgressCharts },
};
</script>

<style>
</style>