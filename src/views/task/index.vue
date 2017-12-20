<template>
  <div class="row">
      <!-- <div class="callout callout-info " >
          <h4>
          <i class="fa fa-list-alt" aria-hidden="true"></i>   模板 : {{templateName}}
            <span style="float:right">
              <el-button type="text" style="color:#fff" @click="backToTemplate">
                <i class="fa fa-chevron-left" aria-hidden="true"></i> 返回模板列表</el-button>
            </span>
          </h4>
        </div> -->
        <div style="margin: 5px 15px;">
            <el-alert 
    :title="'模板 : '+templateName"
        type="success"
    close-text="返回列表">
  </el-alert>
      
        </div>
        
        <!-- <p class="bg-info">模板 : {{templateName}}</p> -->
  <div class="col-md-6">
        <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">任务</h3>
          <div class="box-tools pull-right">
          <button-list :btnList="taskbtnList"/>
            </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
            <table-grid />
            </div>
          </div>
       
        </div>
        
      </div>

  </div>
  <div class="col-md-6">
        <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">任务片</h3>
          <div class="box-tools pull-right">
        <button-list :btnList="taskstatusbtnList"/>
            </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
            <table-grid />
            </div>
          </div>
       
        </div>
       
      </div>

  </div>
</div>
</template>

<script>
import ButtonList from "@/components/buttonList/index";
export default {
  name: "templateTask",
  data() {
    return {
        templateId:'',
        templateName:'',

      task: null,
      taskUrl: "/TP/ashx/TaskHandler.ashx",
      taskParams: { action: "GetAllTaskByTemplateId", templateId: "" },
      taskTableParams: {},
      taskbtnList: [{
            btnType: "primary",
            btnIcon: "fa-plus",
            btnFunc: "addTask",
            btnName: "添加"
          },
          {
            btnType: "primary",
            btnIcon: "fa-pencil",
            btnFunc: "editTask",
            btnName: "编辑"
          },
          {
            btnType: "danger",
            btnIcon: "fa-trash-o",
            btnFunc: "delTask",
            btnName: "删除"
          },
          {
            btnType: "primary",
            btnIcon: "fa-link",
            btnFunc: "linkTask",
            btnName: "关联"
          },
          {
            btnType: "primary",
            btnIcon: "fa-bullseye",
            btnFunc: "setTarget",
            btnName: "指标"
          }
        ],

      taskstatus: null,
      taskstatusUrl: "/TP/ashx/TaskHandler.ashx",
      taskstatusParams: { action: "GetTaskStatusList", taskId: "" },
      taskstatusTableParams: {},
      taskstatusbtnList: [{
            btnType: "primary",
            btnIcon: "fa-plus",
            btnFunc: "addTaskStatus",
            btnName: "添加"
          },
          {
            btnType: "primary",
            btnIcon: "fa-pencil",
            btnFunc: "editTaskStatus",
            btnName: "编辑"
          },
          {
            btnType: "danger",
            btnIcon: "fa-trash-o",
            btnFunc: "delTaskStatus",
            btnName: "删除"
          },
          {
            btnType: "primary",
            btnIcon: "fa-glide",
            btnFunc: "setGuide",
            btnName: "操作指引"
          }
        ]
    };
  },
  methods: {
    taskClick(row) {},
    getTaskList() {},
    addTask() {},
    editTask() {},
    delTask() {},
    linkTask(){},
    setTarget(){},

    taskStatusClick(row) {},
    getTaskStatusList() {},
    addTaskStatus() {},
    editTaskStatus() {},
    delTaskStatus() {},
    setGuide(){

    }
  },
  created() {
      this.templateId = this.$route.params.templateId;
      this.templateName=this.$route.params.templateName;
  },
  components:{ButtonList}
};
</script>

<style>

</style>
