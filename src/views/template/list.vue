<template>
  <div>
    <div class="row">
      <div class="callout callout-info fade in" v-if="showInfo">
        <h4> {{template.TemplateName}}
          <span style="font-size:12px;">
            | {{template.SpecialtyName}} |
            <span v-html="getShare()"></span>
            <i class="fa fa-user-o" aria-hidden="true"></i> {{template.CreatorName}} |
            <i class="fa fa-clock-o" aria-hidden="true"></i> {{template.CreateTime}}

            <span style="float:right">
              <el-button type="text" size="mini" style="color:#fff" @click="removeInfo">
                <i class="fa fa-times" aria-hidden="true"></i>
              </el-button>
            </span>
          </span>
        </h4>
      </div>
      <div :class="listClass+' fade in'">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">模板</h3>
            <div class="box-tools pull-right">
              <button-list :btnList="templatebtns" :small="true" @addtemplate="addtemplate" @eidttemplate="eidttemplate" @editFlow="editFlow" @editTask="editTask"
              />
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <table-grid :tabledata="templateTableParams" :url="templateUrl" :params="templateParams" @getHighLightRow="templateClick"
                />
              </div>
            </div>

          </div>

        </div>


      </div>
      <div class="col-md-7 fade in" style="padding:0;" v-if="showFields">

        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">字段</h3>
            <div class="box-tools pull-right">
              <button-list :btnList="fieldbtns" :small="false" />
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <table-grid :tabledata="fieldTableParams" :url="fieldUrl" :params="fieldParams" :refs="fieldrefresh" />
              </div>
            </div>

          </div>

        </div>


      </div>
    </div>

    <el-dialog title="模板" :visible.sync="editTemplateDialog" width="50%">
      <template-edit :editModel="editTemplate" />
    </el-dialog>

  </div>
</template>
<script>
  import ButtonList from "@/components/buttonList/index";
  import templateEdit from "./edit";
  export default {
    name: "templateList",
    data() {
      return {
        listClass: "col-md-12",
        showFields: false,
        showInfo: false,
        fieldrefresh: false,

        editTemplateDialog: false,

        editTemplate: null,
        template: {},
        templateId: "",
        templateUrl: "/TP/ashx/SpecialtyTemplate.ashx",
        templateParams: {
          action: "List"
        },
        templateTableParams: {
          pagination: true,
          smallpage: true,
          columns: [{
              title: "模板名",
              prop: "TemplateName"
            },
            {
              title: "专业",
              prop: "SpecialtyName"
            }
          ]
        },
        templatebtns: [{
            btnType: "primary",
            btnIcon: "fa-plus",
            btnFunc: "addtemplate",
            btnName: "添加"
          },
          {
            btnType: "primary",
            btnIcon: "fa-pencil",
            btnFunc: "eidttemplate",
            btnName: "编辑"
          },
          {
            btnType: "danger",
            btnIcon: "fa-trash-o",
            btnFunc: "deltemplate",
            btnName: "删除"
          },
          {
            btnType: "primary",
            btnIcon: "fa-tasks",
            btnFunc: "editTask",
            btnName: "任务"
          },
          {
            btnType: "primary",
            btnIcon: "fa-line-chart",
            btnFunc: "editFlow",
            btnName: "流程图"
          }
        ],

        field: {},
        fieldUrl: "/TP/ashx/TempleteField.ashx?action=List",
        fieldParams: {},
        fieldTableParams: {
          pagination: true,
          smallpage: true,
          columns: [{
              title: "名称",
              prop: "ShowName"
            },
            {
              title: "类型",
              prop: "FieldDataTypeName"
            },
            {
              title: "必填",
              prop: "Required"
            },
            {
              title: "备注",
              prop: "Remark"
            }
            // { title: "任务状态", prop: "NodeTaskStatusLevelName", width: "100" },
            // { title: "工期（天）", prop: "TimeoutPeriod", width: "120" },
            // { title: "计划开始时间", prop: "ScheduledStartTime", width: "180" },
            // { title: "归档日期", prop: "ActualCompletTime", width: "180" }
          ]
        },
        fieldbtns: [{
            btnType: "primary",
            btnIcon: "fa-plus",
            btnFunc: "search",
            btnName: "添加"
          },
          {
            btnType: "primary",
            btnIcon: "fa-pencil",
            btnFunc: "showdoing",
            btnName: "编辑"
          },
          {
            btnType: "danger",
            btnIcon: "fa-trash-o",
            btnFunc: "showend",
            btnName: "删除"
          }
        ]
      };
    },
    methods: {
      editTask(){
          if(this.template==null||this.template.Id==null){
 this.$message({
          message: '请选择模板......',
          type: 'warning'
        });
        }else{          
        this.$router.push({
          name: '任务编辑',
          params: {
            templateId: this.template.Id,
            templateName:this.template.TemplateName
          }
        });
        }
      },
      editFlow() {
        if(this.template==null||this.template.Id==null){
 this.$message({
          message: '请选择模板......',
          type: 'warning'
        });
        }else{          
        this.$router.push({
          name: '流程图',
          params: {
            templateId: this.template.Id,
            templateName:this.template.TemplateName
          }
        });
        }
      },

      addtemplate() {
        this.editTemplate = null;
        this.editTemplateDialog = true;
      },
      eidttemplate() {
        this.editTemplate = this.template;
        this.editTemplateDialog = true;
      },
      getShare() {
        if (this.template.ShareRange > 0) {
          return '<i class="fa fa-check-square-o " aria-hidden="true"></i> 已共享 |';
        } else {
          return "";
        }
      },
      removeInfo() {
        this.showInfo = false;
      },
      getFiledParams() {
        return {
          dynamicTabeld: this.template.DynamicTabeld
        };
      },
      templateClick(row) {
        if (this.template.Id !== row.Id) {
          this.template = row;
          this.fieldParams = {
            dynamicTabeld: this.template.DynamicTabeld
          };
          this.listClass = "col-md-5";
          this.showFields = true;
          this.showInfo = true;
          this.fieldrefresh = !this.fieldrefresh;
        }
      }
    },
    components: {
      ButtonList,
      templateEdit
    }
  };

</script>
