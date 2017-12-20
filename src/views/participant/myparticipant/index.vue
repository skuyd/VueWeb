<template>

  <el-row :gutter="5" :style="'height:'+windowHeight+'px;'">
    <el-col :span="8" style="height:100%">
      <div class="box box-info" style="height:100%">
        <div class="box-header with-border">
          <h3 class="box-title">
            <i class="fa fa-history" aria-hidden="true"></i> 分配历史</h3>
          <div class="box-tools pull-right">
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table-grid :tabledata="parList_table" :url="'/ProjectManage/ashx/WorksPointParticipant.ashx?action=GetMyParticipantMainList'"  @getHighLightRow="getparDetails"></table-grid>
        </div>
        <!-- ./box-body -->
        <div class="box-footer">
        </div>
        <!-- /.box-footer -->
      </div>
    </el-col>
    <el-col :span="16" style="height:100%">
      <div class="box box-warning" style="height:100%">
        <div class="box-header with-border">
          <h3 class="box-title ">
            <i class="fa fa-asterisk" aria-hidden="true"></i> 详细</h3>
          <div class="box-tools pull-right">
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">

          <el-tabs v-model="tabName" @tab-click="tabClick">
            <el-tab-pane label="记录" name="first">
              <el-row>
                <div class="cardtitle">分配交付</div>
                <table-grid :tabledata="parWpList_table" :url="'/ProjectManage/ashx/WorksPointParticipant.ashx?action=GetParObjList'"  :params="par_params" ></table-grid>



              </el-row>
              <el-row style="margin-top:20px;">
                <div class="cardtitle">分配对象</div>
                <table-grid :tabledata="parOrgList_table"  :url="'/ProjectManage/ashx/WorksPointParticipant.ashx?action=GetParObjList'"  :params="par_params"  />
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="详细" name="second">
              <el-row v-if="showTask">
                <div class="cardtitle">任务详细</div>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="专业">
{{taskInfo.specialName}}
                  </el-form-item>
                  <el-form-item label="任务">
{{taskInfo.taskName}}
                  </el-form-item>
                  <el-form-item label="工期">
{{taskInfo.gq}}
                  </el-form-item>

                  <el-form-item label="紧急程度">
{{taskInfo.status}}
                  </el-form-item>

                  <el-form-item label="备注">
                   {{taskInfo.remark}}
                  </el-form-item>

                </el-form>
              </el-row>
              <el-row>
                <div class="cardtitle">分配详细</div>
                <table-grid :tabledata="parDetailList_table" :url="'/ProjectManage/ashx/WorksPointParticipant.ashx?action=GetParWpList'" :params="par_params" />
              </el-row>
            </el-tab-pane>

          </el-tabs>
        </div>
        <!-- ./box-body -->
        <div class="box-footer">
        </div>
        <!-- /.box-footer -->
      </div>
    </el-col>
  </el-row>

</template>
<script>
  import Utils from '@/common/help/utils';
  export default {
    name: "myparticipant",
    data() {
      return {
        windowHeight: 'auto',
        par: {
          Id: '1'
        },
        showTask: true,
        taskInfo:{
          specialName:'室分光网',
          taskName:'光网整改现场验收',
          gq:'5天',
          status:'紧急',
          remark:'系统初始化数据'
        },
        tabName: 'first',
        // parList: [],
        // parWpList: [],
        // parOrgList: [],
        // parDetailList: [],
        par_params:{
          participantId:''
        },
        parList_table: {
          
          columns: [{
              title: "分配类型",
              prop: "ParticipantTypeName",
              width: '80px'
            },
            {
              title: "方式",
              prop: "ParticipantWayName",
              width: '110px'
            },
            {
              title: "操作时间",
              prop: "CreateTime"
            }
          ],
          pagination: true,
          smallpage: true
        },
        parWpList_table: {          
              columns: [{
              title: "交付编号",
              prop: "WorksPointNo",
              sort: true
            },
            {
              title: "交付名称",
              prop: "WorksPointName",
              sort: "custom"
            },
            {
              title: "专业",
              prop: "SpecialName",
              sort: "custom"
            },
            {
              title: "区域",
              prop: "AreaName",
              sort: "custom"
            }
          ],
          pagination: true

        },
        parOrgList_table: {
         
                  columns: [{
              title: "用户名",
              prop: "TrueName"
            },
            {
              title: "账号",
              prop: "UserName"
            },
            {
              title: "单位名称",
              prop: "OrganizationName",
              sort: "custom"
            },
            {
              title: "单位类型",
              prop: "OrganizationType",
              sort: "custom"
            }
          ],
          pagination: true
        },
        parDetailList_table: {
         columns: [{
              title: "交付名称",
              prop: "WorksPointName",
              sort: true
            },
            {
              title: "专业",
              prop: "SpecialityName",
              sort: "custom"
            },
            {
              title: "责任人",
              prop: "UserName",
              sort: "custom"
            },
            {
              title: "单位",
              prop: "OrganizeName",
              sort: "custom"
            },
            {
              title: "详细",
              prop: "UserName",
              sort: "custom"
            }
          ],
          pagination: true,
          smallpage: true
        },
        parDetailListDetails_table: {
          url: "/ProjectManage/ashx/WorksPointTaskHandler.ashx?action=GetWorkPointParticipantUserLogList&participantId=BC544A39FB794764B452510FDE85F10B",
          params: {
            participantId: 'this.par.Id'
          }, // filter: '{"groupOp":"OR","rules":[{"field":"DepartmentId","op":"eq","data":"a62cc0bdb3db46aba98c75848893ee9e"},{"field":"DepartmentId","op":"eq","data":"5062d58f7ec147bdb913cfdbb217f5b0"}]}'
          columns: [{
              title: "动作",
              prop: "OperateTypeName",
              sort: true
            },
            {
              title: "操作人",
              prop: "UserName",
              sort: "custom"
            },
            {
              title: "操作时间",
              prop: "CreateTime",
              sort: "custom"
            },
            {
              title: "备注",
              prop: "Remark",
              sort: "custom"
            }
          ],
          pagination: true,
          smallpage: true
        }
      };
    },

    methods: {
      getparDetails: function (row) {

      },
      tabClick: function () {

      }
    },
    created() {
      this.windowHeight = Utils.getWindowSize().height - 140;

    }
  };

</script>

