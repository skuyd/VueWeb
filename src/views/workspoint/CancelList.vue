<template>
  <div class="app-container calendar-list-container">
    <!-- <tool-list :buttonList="btnList"></tool-list> -->
    <!-- <el-button class="filter-item" size="small" style="margin-left: 10px;" v-for="button in btnList" @Click="btnFunTest" :type="button.btnType" :icon="button.btnIcon"> {{button.btnName}} </el-button> -->
    <div class="filter-container">

      <el-input placeholder="交付名称" class="filter-item" icon="search" size="small" style="width: 200px;" v-model="searchInput" :on-icon-click="handleIconClick">
      </el-input>
      <el-button class="filter-item" type="primary" size="small" v-waves icon="search" @click="submitTaskRecord">高级搜索</el-button>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="tabledbClick" type="primary" icon="edit">待办</el-button>
      <!-- <el-button class="filter-item" size="small" type="success" icon="document" @click="handleDownload">归档</el-button> -->
      <el-button class="filter-item" size="small" type="primary" v-waves icon="search" @click="submitTaskRecord">已归档</el-button>
      <el-button class="filter-item" size="small" style="margin-left: 10px;" @click="submitTaskRecord" type="primary" icon="edit">提交记录</el-button>
      <!-- <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox> -->
    </div>

    
    <table-grid :tabledata="tabledata" :url="'/ProjectManage/ashx/WorksPointTaskHandler.ashx?Action=GetUserTaskList'"
        :params="{ excludeWorkspoint: 1 }" @dbClick="tabledbClick" @getSelection="getTableSelection" @getHighLightRow="getRow">
    </table-grid>

  </div>
</template>
<script>

export default {
  name: 'MyTask',
  data() {
    return {
      // ----------- gridTable  Params Begin ---------
      tabledata: {
     
        showcheck: true,
        showindex: false,
        showsummary: false,
        download: true,
        pagination: true,
        pages: [10, 20, 50, 100, 200],
        listQuery: {
          page: 1,
          rows: 10,
          sort: 'Id',
          order: 'asc'
        },
        columns: [
          { title: '交付名称', prop: 'WorksPointName', width: '220px', fix: 'left', sort: true },
          { title: '交付编号', prop: 'WorksPointNo', width: '180', fix: 'left', sort: 'custom' },
          { title: '所属专业', prop: 'SpecialityName', width: '100', sort: false },
          { title: '区域', prop: 'Area', width: '80', sort: false },
          { title: '任务名称', prop: 'TaskName', width: '100' },
          { title: '责任人', prop: 'UserName', width: '100' },
          { title: '任务状态', prop: 'NodeTaskStatusLevelName', width: '100' },
          { title: '工期（天）', prop: 'TimeoutPeriod', width: '120' },
          { title: '计划开始时间', prop: 'ScheduledStartTime', width: '180' },
          { title: '归档日期', prop: 'ActualCompletTime', width: '180' }]
      },
      gridselections: null,
      gridhighligthrow: null,

      // ----------- gridTable  Params End  ---------

      btnList: [{ btnType: 'primary', btnIcon: 'search', btnFun: 'tabledbClick', btnName: '搜索' }],
      searchInput: '',
      // -------- Add-Record-Form Params Begin ---------
      OpenTaskId: null,
      OpenTaskName: '',
      TaskWpId: null,
      AddRecorddialogVisible: false,
     // ----------Add-Record-Form Params End--------

    }
  },
  
  methods: {

    // ------ tableGrid Event/Function  Begin ----------
    // --- Tips : 方法命名可在对应方法绑定自己修改   eg : @DbClick=“UrFunctionName”
    tabledbClick(row, event, column) {
     this.gridhighligthrow = row;
      this.submitTaskRecord();
    },
    getTableSelection(seletion) {
      // console.log(seletion);
      this.gridselections = seletion;
    },
    getRow(row) {
      this.gridhighligthrow = row;
    },
    // ------ tableGrid Event/Function End  ----------

    // handleDownload() {
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('vendor/Export2Excel');
    //     const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
    //     const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
    //     const data = this.formatJson(filterVal, this.list);
    //     export_json_to_excel(tHeader, data, 'table数据');
    //   })
    // },
    handleIconClick() {
      if (this.searchInput == '') {
        console.log('Input Search keyWord');
      } else {
        console.log(this.searchInput);
      }
    },
    submitTaskRecord() {
      this.AddRecorddialogVisible = true;
    }, 
    closeDialog(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
         done();
        })
        .catch(_ => { console.log(_); });
    }
  },
  watch:{
    gridhighligthrow:function(val,oldVal){
      this.OpenTaskId = val.TaskId;
      this.OpenTaskName = val.TaskName;
      this.TaskWpId = val.WorksPointId;
    }
  }
  // ,components:{ToolList}
}
</script>
