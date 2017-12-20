<template>
  <div id="MyTask" class="app-container calendar-list-container">
    <!-- <tool-list :buttonList="btnList"></tool-list> -->
    <!-- <el-button class="filter-item" size="small" style="margin-left: 10px;" v-for="button in btnList" @Click="btnFunTest" :type="button.btnType" :icon="button.btnIcon"> {{button.btnName}} </el-button> -->

<button-list :btnList="this.btnList" @submitTaskRecord="submitTaskRecord" @search="search" @showdoing="showdoing" @showend="showend"/>
    <el-dialog :title="'提交任务记录--'+OpenTaskName" :visible.sync="AddRecorddialogVisible" :close-on-click-modal="false" :close-on-press-escape="true" :before-close="closeDialog">
      <add-task-record :TaskId="OpenTaskId" :WorksPointId="TaskWpId" :dialogVisible.sync="AddRecorddialogVisible" v-if="AddRecorddialogVisible">
       </add-task-record>
    </el-dialog>

    <table-grid :tabledata="tabledata"  :url="'/ProjectManage/ashx/WorksPointTaskHandler.ashx?Action=GetUserTaskList'" 
        :params="{ excludeWorkspoint: 1 }"  @dbClick="tabledbClick" @getSelection="getTableSelection" @getHighLightRow="getRow">
    </table-grid>

  </div>

</template>

<script>
import AddTaskRecord from "@/components/task/addTaskStatus/AddTaskRecord";
import tableGrid from "@/components/tableGrid/index";
import buttonList from "@/components/buttonList/index";
// import { parseTime } from 'utils';

export default {
  name: "MyTask",
  data() {
    return {
      // ----------- gridTable  Params Begin ---------
      tabledata: {       
        showcheck: true,
        download: true,
        pagination: true,
        pages: [10, 20, 50, 100, 200],
        columns: [
          {
            title: "交付名称",
            prop: "WorksPointName",
            width: "220px",
            fix: "left",
            sort: true
          },
          {
            title: "交付编号",
            prop: "WorksPointNo",
            width: "180",
            fix: "left",
            sort: "custom"
          },
          { title: "所属专业", prop: "SpecialityName", width: "100", sort: false },
          { title: "区域", prop: "Area", width: "80", sort: false },
          { title: "任务名称", prop: "TaskName", width: "100" },
          { title: "责任人", prop: "UserName", width: "100" },
          { title: "任务状态", prop: "NodeTaskStatusLevelName", width: "100" },
          { title: "工期（天）", prop: "TimeoutPeriod", width: "120" },
          { title: "计划开始时间", prop: "ScheduledStartTime", width: "180" },
          { title: "归档日期", prop: "ActualCompletTime", width: "180" }
        ]
      },
      gridselections: null,
      gridhighligthrow: null,

      // ----------- gridTable  Params End  ---------
      btnList: [
        {
          btnType: "primary",
          btnIcon: "fa-search",
          btnFunc: "search",
          btnName: "搜索"
        },
          {
          btnType: "primary",
          btnIcon: "fa-hourglass-o",
          btnFunc: "showdoing",
          btnName: "待办列表"
        },
          {
          btnType: "primary",
          btnIcon: "fa-hourglass",
          btnFunc: "showend",
          btnName: "已归档列表"
        },
          {
          btnType: "primary",
          btnIcon: "fa-check-square-o",
          btnFunc: "submitTaskRecord",
          btnName: "提交记录"
        }
        
      ],
      searchInput: "",
      // -------- Add-Record-Form Params Begin ---------
      OpenTaskId: null,
      OpenTaskName: "",
      TaskWpId: null,
      AddRecorddialogVisible: false
      // ----------Add-Record-Form Params End--------
    };
  },
  components: { AddTaskRecord, buttonList },
  methods: {
    //----------btnEvent---------------
    search() {
  this.$message({
          message: '搜索',
          type: 'success'
        });
    },
    showdoing() {
  this.$message({
          message: '待办',
          type: 'success'
        });
    },
    showend() {
  this.$message({
          message: '归档',
          type: 'success'
        });
    },

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
    handleIconClick() {
      if (this.searchInput == "") {
      } else {
      }
    },
    submitTaskRecord() {
      if(this.gridhighligthrow){        
      this.AddRecorddialogVisible = true;
      }else{
  this.$message({
          message: '未选中任何待办项。',
          type: 'warning'
        });
      }
    },
    closeDialog(done) {
      this.$confirm("确认要关闭对话框？")
        .then(_ => {
          done();
        })
        .catch(_ => {
          console.log(_);
        });
    }
  },
  watch: {
    gridhighligthrow: function(val, oldVal) {
      this.OpenTaskId = val.TaskId;
      this.OpenTaskName = val.TaskName;
      this.TaskWpId = val.WorksPointId;
    }
  }
  // ,components:{ToolList}
};
</script>
<style>

</style>
