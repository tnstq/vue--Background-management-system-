<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>

    <el-card>
      <div v-show="scene == 0">
        <!-- 展示SPU列表的内容 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加Spu</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column typr="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="Spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ row }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部的sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <div v-show="scene == 1">
        <SpuFrom @changeScene="changeScene" ref="spu" />
      </div>
      <div v-show="scene == 2">
        <SkuFrom ref="sku" @changeScenes="changeScenes" />
      </div>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table
        :data="skuList"
        style="width: 100%"
        border
        v-loading="loading">
        <el-table-column
          prop="skuName"
          label="名称"
          width="width">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="width">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="width">
        </el-table-column>
        <el-table-column
          label="默认图片"
          width="width">
          <template v-slot="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuFrom from "./SkuFrom";
import SpuFrom from "./SpuFrom";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      page: 1, //分页器当前第几页
      limit: 3, //每一页需要展示多少条数据
      records: [],
      total: 0, //一共需要展示数据的条数
      scene: 0, //0代表spu列表, 1代表添加或修改Spu, 2代表添加Sku
      dialogTableVisible:false,//控制对话框的显示与隐藏
      spu:{},
      skuList:[],
      loading:true,
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      //categoryId:获取1，2，3级分类的id,level：为了区分是几级id
      if (level == 1) {
        this.category1Id = categoryId;
        //清除2，3级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    //获取Spu列表数据的方法
    async getSpuList() {
      //需要携带三个参数
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      //console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //点击分页器第几页按钮回调
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    //当分页器的某一页展示数据的条数发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加Spu按钮的回调
    addSpu() {
      this.scene = 1;
      //通知子组件spuform发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改Spu
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList(1);
      }
    },
    //删除Spu按钮
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      //切换场景为2
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求
      this.$refs.sku.gatDate(this.category1Id, this.category2Id, row);
    },
    //通知父组件修改场景
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看sku按钮的回调
    async handler(spu){
      //点击按钮时对话框可见
      this.dialogTableVisible = true;
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if(result.code == 200){
        this.skuList = result.data;
        this.loading = false
      }
    },
    //关闭对话框的回调
    close(done){
      //loading属性再次变为真
      this.loading = true;
      //清除sku列表的数据
      this.skuList = [];
      done();
    }
  },
  components: { SkuFrom, SpuFrom },
};
</script>

<style>
</style>