<template>
<div><el-row type="flex" class="userselctorrow" ><el-input
    placeholder="可输入手机号/姓名快速查找"
    v-model="searchtext"
    size="small">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input></el-row>
<el-row type="flex"  class="userselctorrow" >
  <table-grid :tabledata="tabledata"     :url="'/sys/ashx/UserHandler.ashx?action=Index'"
        :params="{companyId:this.companyId}"  :refs="gridref"  @getSelection="getTableSelection" >
  </table-grid></el-row>
<el-row type="flex"  class="userselctorrow" >
   <el-button type="primary"  style="width:100%" @click="subUsers" size="small">确认</el-button></el-row>

   </div>
</template>

<script>
export default {
  name: "userSelector",
  props: ["companyId"],
  data() {
    return {
      searchtext: "",
      selectorUsers: [],
      gridref:true,
      userList: [],
      tabledata: {
     // filter: '{"groupOp":"OR","rules":[{"field":"DepartmentId","op":"eq","data":"a62cc0bdb3db46aba98c75848893ee9e"},{"field":"DepartmentId","op":"eq","data":"5062d58f7ec147bdb913cfdbb217f5b0"}]}'
        showcheck: true,
        pagination: true,
        smallpage:true,
        pages: [10, 20],
        listQuery: {
          page: 1,
          rows: 10,
          sort: "Id",
          order: "asc"
        },
        columns: [
          {
            title: "姓名",
            prop: "TrueName",
            sort: true
          },
          {
            title: "账号",
            prop: "UserName",
            sort: "custom"
          }
        ]
      }
    };
  },
  methods: {
    getTableSelection: function(rows) {
      this.selectorUsers = rows;
    },
    subUsers: function() {
      this.$emit("getUsers", this.selectorUsers);
    }
  },
  watch:{
    companyId:function(newVal,oldVal){
      // console.log(newVal);
       this.$set(this.tabledata,"params",{companyId:this.companyId});
       console.log(this.tabledata);
      this.gridref=!this.gridref;
    }
  }
};
</script>

<style>
.userselctorrow {
  margin-bottom: 10px;
}
</style>
