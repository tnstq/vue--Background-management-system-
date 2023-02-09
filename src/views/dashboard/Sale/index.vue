<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <!--  v-model="activeName" @tab-click="handleClick" -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="date"
            value-format="yyyy-MM-dd"
            class="date"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18"><div class="chartsed" ref="charts"></div></el-col>
          <el-col :span="6" class="rit">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">0</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>
                <span class="rindex">1</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>
                <span class="rindex">2</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>
                <span class="rindex">3</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>
                <span class="rindex">4</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>
                <span class="rindex">5</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>
                <span class="rindex">6</span
                ><span style="margin-left: 10px">鸡你太美</span
                ><span class="rvalue">babybaby</span>
              </li>
              <li>........</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      date: [],
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          color: "skyblue",
          data: [],
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    title() {
      //console.log(111);
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            color: "skyblue",
            data: this.title == "销售额" ? this.listState.orderFullYear : this.listState.userFullYear,
          },
        ],
      });
    },
    listState(){
       this.mycharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            color: "skyblue",
            data: this.title == "销售额" ? this.listState.orderFullYear : this.listState.userFullYear,
          },
        ],
      });
    }
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.el-card__header {
  border-bottom: none;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  text-align: center;
  margin-right: 10px;
}
.el-card__header {
  border-bottom: none;
}
.chartsed {
  width: 100%;
  height: 300px;
}
.rit {
  padding: 0;
}
.rit h3 {
  text-align: center;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}

ul li {
  height: 12%;
}

.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: #fff;
  text-align: center;
  line-height: 20px;
}
.rvalue {
  float: right;
}
.date {
  width: 250px;
}
</style>