<template>
  <div class="btnList">
      
    <el-button-group v-if="!small">
      <!-- <el-button class="filter-item"  size="mini" type="primary"  disabled> 右方选择操作 <i class="fa fa-hand-o-right" aria-hidden="true"></i></el-button> -->
      <el-button class="filter-item" size="mini" v-for="btn in btnList" :key="btn.btnKey" plain :type="btn.btnType" @click="gotoFun(btn.btnFunc)">
        <i :class="'fa '+btn.btnIcon  " aria-hidden="true"></i> {{btn.btnName}}</el-button>
    </el-button-group>
          
    <el-button-group v-else>
         <el-tooltip  v-for="btn in btnList" :key="btn.btnKey"  class="item" effect="dark" :content="btn.btnName" placement="top" >
      <!-- <el-button class="filter-item"  size="mini" type="primary"  disabled> 右方选择操作 <i class="fa fa-hand-o-right" aria-hidden="true"></i></el-button> -->
      <el-button class="filter-item" size="mini" plain :type="btn.btnType" @click="gotoFun(btn.btnFunc)">
        <i :class="'fa '+btn.btnIcon  " aria-hidden="true"></i></el-button>
  </el-tooltip>

    </el-button-group>
  </div>
</template>

<script>
  export default {
    name: 'buttonList',
    // data(){
    //     return {

    //     }
    // },
    props: ["btnList", "events", "small"],
    methods: {
      gotoFun: function (funcName) {
        this.$emit(funcName);
      }
    }
  }

</script>
<style>
  .btnList {
    margin-bottom: 5px;
    float: left;
    /* border-bottom: 3px solid #d2d6de; */
  }

</style>
