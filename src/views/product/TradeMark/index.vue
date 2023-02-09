<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="100px" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌LOGO"
        width="width"
        align="center"
      >
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; hight: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
          @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      分页器
      三大要素：
      1.当前第几页
      2.数据的总条数
      3.每一页展示的条数
       -->
    <el-pagination
      style="margin-top: 50px; textalign: center"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="6"
      :page-sizes="[3, 5, 10]"
      :page-size="3"
      :page-count="7"
      layout="prev, pager, next, jumper, -> ,sizes, total"
      :total="90"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleFrom">
        <el-form-item label="品牌名称" :label-width="`100px`" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="`100px`" prop="logoUrl">
          <!-- 
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      //代表分页器是第几页
      page: 1,
      //当前页面展示的条数
      limit: 3,
      //总共数据的条数total
      total: 0,
      //列表展示的数组
      list: [],
      //控制对话框显示与隐藏的属性
      dialogFormVisible: false,
      //收集品牌信息：对象身上的属性不能乱写
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        //品牌名称的验证规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        //品牌logo的验证规则
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  //当组件挂载完毕就开始发请求
  mounted() {
    this.getPageList();
  },
  methods: {
    //获取品牌列表数据
    async getPageList() {
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      //console.log(result);
      if (result.code == 200) {
        //分别是展示数据的总条数
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    handleCurrentChange(pager) {
      this.page = pager;
      this.getPageList();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    showDialog() {
      this.dialogFormVisible = true;
      //清除数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    //修改按钮，row是当前用户选中的品牌信息
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      //console.log(row);
      this.tmForm = { ...row };
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加按钮
    addOrUpdateTradeMark() {
      this.$refs.ruleFrom.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          //发请求
          if (!this.tmForm.id) {
            let result = await this.$API.trademark.reqAddTradeMark(this.tmForm);
            if (result.code == 200) {
              //弹出信息
              this.$message({ type: "success", message: "添加品牌成功" });
              this.getPageList();
            }
          } else {
            let result = await this.$API.trademark.reqPutTradeMark(this.tmForm);
            if (result.code == 200) {
              //弹出信息
              this.$message({ type: "success", message: "修改品牌成功" });
              this.getPageList(this.page);
            }
          }
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
      /*  this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        }); */
    },
    //删除功能
    deleteTradeMark(row){
      this.$confirm(`你确定删除${row.tmName}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await this.$API.trademark.reqDeleteTradeMark(row.id);
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          //再次获取品牌列表数据
          this.getPageList(this.list.length>1?this.length:1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      //let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
    }
  },
};
</script>

<style>
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>