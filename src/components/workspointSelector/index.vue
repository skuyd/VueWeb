<template>
<div><el-row type="flex" class="workspointselctorrow" ><el-input
    placeholder="可输入站点名/站点编码快速查找"
    v-model="searchtext">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input></el-row>
<el-row type="flex"  class="workspointselctorrow" >
  <table-grid :tabledata="tabledata"  :url="'/ProjectManage/ashx/WorksPoint.ashx'"
        :params="{action:'GetWorksPointList',displayType:0,constructionState:'UnderConstruction'}"   @getSelection="getTableSelection" >

  </table-grid></el-row>
<el-row type="flex"  class="workspointselctorrow" > <el-button type="primary"  style="width:100%" @click="subWorkspoints">确认</el-button></el-row>

   </div>
</template>

<script>
export default {
  name: "workspointSelector",
  props: ["specialTemplateId"],
  data() {
    return {
      searchtext: "",
      selectorWorkspoints: [],
   
      tabledata: {
        // filter: '{"groupOp":"OR","rules":[{"field":"DepartmentId","op":"eq","data":"a62cc0bdb3db46aba98c75848893ee9e"},{"field":"DepartmentId","op":"eq","data":"5062d58f7ec147bdb913cfdbb217f5b0"}]}'
        showcheck: true,
        pagination: true,
        pages: [10, 20],
        listQuery: {
          page: 1,
          rows: 10,
          sort: "Id",
          order: "asc"
        },
        columns: [
          {
            title: "交付名称",
            prop: "WorksPointName"
          },
          {
            title: "交付编号",
            prop: "WorksPointNo"
          },
          {
            title: "区域",
            prop: "Area"
          },
          {
            title: "专业",
            prop: "SpecialityName"
          },
          {
            title: "创建时间",
            prop: "CreateTime"
          }
        ]
      }
    };
  },
  methods: {
    getTableSelection: function(rows) {
      this.selectorWorkspoints = rows;
    },
    subWorkspoints: function() {
      this.$emit("geWorkspoints", this.selectorWorkspoints);
    }
  }
};
</script>

<style>
.workspointselctorrow {
  margin-bottom: 10px;
}
</style>
