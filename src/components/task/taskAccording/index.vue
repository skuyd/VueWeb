<template>
   <el-collapse accordion @change="accChange">
  <el-collapse-item v-for="task in taskList"  :key="task.Id" :name="task.Id">
    <template slot="title">
      <el-row>
        <el-col :span="2">
            <span v-show="task.canAdd">
          <el-button type="text" size="mini" plain>
            <i class="fa fa-plus" aria-hidden="true"></i>
          </el-button>
            </span>
        </el-col>
        <el-col :span="20"> {{task.TaskName}}</el-col>
      </el-row>
    </template>
    <table-grid :tabledata="getTableData(task.Id)" :url="'/ProjectManage/ashx/WorksPointTaskHandler.ashx'"
        :params="buildParams(task.Id)"  @handleDelete="handleDelete" @getHighLightRow="handleClick"/>
  </el-collapse-item>
     </el-collapse >
</template>
<script>
// 站点详情--任务操作--左侧任务折叠面板
export default {
  name: "taskAccording",
  data() {
    return {};
  },
  methods: {
    buildParams(taskId){
return { Action: "GetTaskRecordList",
          workspointId: this.workspointId,
          taskId: taskId
        };
    },
    buildTableData(taskId) {
      var d = {
       
        op: {
          showop: true,
          //   showEdit: false,
          showDelete: true,
          //   EditName: "<i class='fa fa-pencil'></i>",
          DeleteName: "<i class='fa fa-minus'></i> "
        },
        columns: [
          {
            title: "任务片",
            prop: "ParticipantTypeName",
            width: "80px"
          },
          {
            title: "创建人",
            prop: "ParticipantWayName",
            width: "110px"
          },
          {
            title: "单位",
            prop: "CreateTime"
          },
          {
            title: "时间",
            prop: "CreateTime"
          }
        ],
        pagination: true,
        smallpage: true
      };
      return d;
    },
    handleDelete(row){

    },
    handleClick(row){
        //单击事件
    },
    accChange(activeNames){
        console.log(activeNames);
    }
  },
  props: ["taskList", "workspointId"]
 
};
</script>
