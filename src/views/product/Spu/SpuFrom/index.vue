<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="Spu名称">
        <el-input placeholder="Spu的名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="Spu描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSale.length}未选择}}`" v-model="attrIdAndAttrName">
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect) in unSelectSale"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaveAttr">添加销售属性</el-button>
        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template v-slot="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                <!--  -->
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
                <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              </el-input>
              <el-button v-else class="button-new-tag" size="small"
              @click="addSaleAttrValueName(row)"
                >+ 添加</el-button
              >
              <!-- @click="showInput" -->
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuFrom",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        spuName: "",
        //品牌id
        tmId: "",
        category3Id: 0,
        //描述
        description: "",
        spuImageList: [
          /* {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          }, */
        ],
        //平台属性与属性值
        spuSaleAttrList: [
          /* {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          }, */
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      attrIdAndAttrName:'',//收集未选择的销售属性的id
    };
  },
  methods: {
    //照片墙删除图片的时候触发
    handleRemove(file, fileList) {
      //file代表删除的哪张图片
      //fileList照片墙删除某一张图片后剩余的图片
      //收集照片墙图片的设计
      this.spuImageList = fileList;
    },
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response,file,fileList){
      //console.log(fileList);
      this.spuImageList = fileList;
    },
    //初始化SpuFrom的数据
    async initSpuData(spu) {
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      //console.log(spuResult);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌的信息
      let tradeResult = await this.$API.spu.reqTradeMarkList();
      //console.log(tradeResult);
      if (tradeResult.code == 200) {
        this.tradeMarkList = tradeResult.data;
      }
      //获取spu图片的数据
      let imgResult = await this.$API.spu.reqSpuImageList(spu.id);
      //console.log(imgResult);
      if (imgResult.code == 200) {
        let listArr = imgResult.data;
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
        //this.spuImageList = imgResult.data;
      }
      //获取平台全部的销售属性
      let baseResult = await this.$API.spu.reqBaseSaleAttrList();
      //console.log(baseResult);
      if (baseResult.code == 200) {
        this.saleAttrList = baseResult.data;
      }
    },
    //添加新的销售属性
    addSaveAttr(){
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':')
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndAttrName = '';
    },
    //点击销售属性值当中的添加按钮时，需要有button变为input
    addSaleAttrValueName(row){
      this.$set(row,'inputVisible',true);
      this.$set(row,'inputValue','')
    },
    //失去焦点的事件
    handleInputConfirm(row){
      const {baseSaleAttrId,inputValue} = row;
      //属性值不能为空
      if(inputValue.trim() == ''){
        this.$message('属性值不能为空');
        return;
      }
      //属性值不能重复
      let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName!=inputValue);
      if(!result){
        this.$message('属性值不能重复');
        return;
      }
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue};
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    //保存按钮的回调
    async addOrUpdateSpu(){
      //需要整理照片墙的数据
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return{
          imgName:item.name,
          imgUrl:(item.response&&item.response.data) || item.url
        }
      })
      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(result.code == 200){
        this.$message({type:'success',message:'保存成功'});
        //通知父组件回到场景0
        this.$emit('changeScene',{scene:0,flag:this.spu.id? '修改':'添加'})
      }
      Object.assign(this._data,this.$options.data());
    },
    //点击添加按钮的时候发请求
    async addSpuData(category3Id){
      this.spu.category3Id = category3Id;
      //获取品牌的信息
      let tradeResult = await this.$API.spu.reqTradeMarkList();
      //console.log(tradeResult);
      if (tradeResult.code == 200) {
        this.tradeMarkList = tradeResult.data;
      };
       //获取平台全部的销售属性
      let baseResult = await this.$API.spu.reqBaseSaleAttrList();
      //console.log(baseResult);
      if (baseResult.code == 200) {
        this.saleAttrList = baseResult.data;
      };
    },
    //取消按钮
    cancel(){
      this.$emit('changeScene',{scene:'0',flag:''});
      Object.assign(this._data,this.$options.data());
    }
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSale() {
      //整个平台的销售属性一共有三个：颜色，尺寸，版本
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>