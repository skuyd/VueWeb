<template>
  <div :style="'height:'+windowHeight+'px;'">
    <!-- <el-tag type="success"  >标签二</el-tag> -->
<div class="row" style="min-height:auto">
  <div :class="listClass" style="height:auto">        <div class="box box-info" style="height:auto">
          <div class="box-header with-border">
            <h3 class="box-title">
              <i class="fa fa-tasks" aria-hidden="true"></i> 任务</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <el-collapse accordion @change="accChange">
                  <el-collapse-item v-for="task in taskList" :key="task.Id" :name="task.Id">
                    <template slot="title">
                      <el-row>
                        <el-col :span="2">
                          <span v-show="task.state==2">
                            <el-button type="text" size="mini" plain>
                              <i class="fa fa-plus" aria-hidden="true"></i>
                            </el-button>
                          </span>
                        </el-col>
                        <el-col :span="20"> {{task.TaskName}}</el-col>
                      </el-row>
                    </template>
                    <div v-if="panelshow['show_'+task.Id]">
                      <table-grid :tabledata="buildTableData(task.Id)" :url="'/ProjectManage/ashx/WorksPointTaskHandler.ashx'"  :params="buildParams(task.Id)" @handleDelete="handleDelete" @getHighLightRow="handleClick" />
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>

          </div>

        </div></div>
  <div class="col-md-7" style="height:100%;padding:0;" v-if="showDetail"> <div class="box" style="eight:100%">
          <div class="box-header with-border">
            <h3 class="box-title">
              <i class="fa fa-info-circle" aria-hidden="true"></i> 记录详细</h3>

          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <div v-show="!showDetail"> 选择提交记录,查看记录明细 ... ...</div>
                <div style="background-color:#fff;padding:5px;" v-show="showDetail">
                  <table class="table table-hover table-bordered">
                    <tbody v-if="record.State==1" style="color:#FA5555">
                      <tr>
                        <th colspan="4">
                          <i class="fa fa-trash-o" aria-hidden="true"></i> 该记录已被删除</th>
                      </tr>
                      <tr>
                        <td>删除日期</td>
                        <td>{{record.DelTime}}</td>
                        <td>原因</td>
                        <td>{{record.DelReason}}</td>
                      </tr>
                    </tbody>
                    <tbody style="color:#409EFF">
                      <tr>
                        <th colspan="4">
                          <i class="fa fa-info-circle" aria-hidden="true"></i> 基础信息</th>
                      </tr>

                      <tr>
                        <td>创建人</td>
                        <td>{{record.CreatorName}}</td>
                        <td>单位</td>
                        <td>{{record.CreatorCompanyName}}</td>
                      </tr>

                      <tr>
                        <td>来源</td>
                        <td>{{record.SubmitClientDeviceTypeName}}-{{record.SubmitWayName}}</td>
                        <td>时间</td>
                        <td>{{record.CreateTime}}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <th colspan="4">
                          <i class="fa fa-asterisk" aria-hidden="true"></i> 详细信息</th>
                      </tr>
                      <tr v-for="item in detail" :key="item.Id">
                        <td colspan="1">{{item.ShowName}}</td>
                        <!-- <td colspan="3" v-html="showFieldHtml(item)"></td>
                        <td colspan="3" v-html="showFieldHtml(item)"></td>
                        <td colspan="3" v-html="showFieldHtml(item)"></td> -->

                        <td colspan="3"  v-if="item.FieldDataType<20">
                          {{item.FieldValue}}
                        </td>
                        <td colspan="3"  v-else-if="item.FieldDataType===20">
                          <!-- 文件 -->
                          <file-list-view :files="item.FieldValue"/>
                        </td>
                        <td colspan="3"  v-else-if="item.FieldDataType===21"> 
                                                   <!-- 图片 -->
                        <photo-list-view :photos="item.FieldValue"/>
                        </td>
                        <td colspan="3"  v-else>
                          {{item.FieldValue}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
          <div class="box-footer" style="bottom:0;position:absolute;">
            <div class="row">
              <!-- /.row -->
              <div class="col-md-12">
                * 左侧选择记录查看详细
              </div>
            </div>
            <!-- /.box-footer -->
          </div>

        </div>
</div>
</div>
   
  </div>
</template>
<script>
  import Utils from "@/common/help/utils";
  import fileListView from  "@/components/file/file"
  import photoListView from  "@/components/file/photo"
  export default {
    name: "task",
    data() {
      return {
        showDetail: false,
        listClass:'col-md-12',
        record: {},
        detail: {},
        Id: "",
        panelshow: {},
        taskList: [],
        windowHeight: "auto"
      };
    },
    methods: {
      buildParams(taskId){
return    {
            Action: "GetTaskRecordList",
            workspointId: this.Id,
            taskId: taskId
          }
      },
      buildTableData(taskId) {
        // return null;
        var d = {
          
        
          op: {
            showop: true,
            //   showEdit: false,
            showDelete: true,
            //   EditName: "<i class='fa fa-pencil'></i>",
            DeleteName: "<span style='color:#FA5555'><i class='fa fa-minus'></i> 删除</span>"
          },
          columns: [{
              title: "任务片",
              prop: "TaskName"
            },
            {
              title: "创建人",
              prop: "CreatorName"
            }
            // {
            //   title: "单位",
            //   prop: "CreatorCompanyName"
            // },
            // {
            //   title: "时间",
            //   prop: "CreateTime"
            // }
          ],
          pagination: true,
          smallpage: true
        };
        return d;
      },
      showTable(taskId) {
        return true;
      },
      getDetails(rowId) {
        this.$http.$axios
          .get(
            "/ProjectManage/ashx/WorksPointTaskHandler.ashx?action=GetRecordDetails", {
              params: {
                recordId: rowId
              }
            }
          )
          .then(res => {
            if (res.data.Success) {
              this.detail = res.data.Data;
            }
          })
          .catch(err => {
            // console.log(err);
          });
      },
      handleDelete(row) {},
      handleClick(row) {
        //单击事件
     if(this.record.Id!=row.Id){
        this.record = row;
        this.getDetails(row.Id);
        this.showDetail = true;
        this.listClass="col-md-5";
     }
       
      },
      accChange(activeNames) {
        if (activeNames.length == 32) {
          this.panelshow["show_" + activeNames] = true;
        }
        this.$forceUpdate();
        // console.log(activeNames);
      },
      getTaskList() {
        this.$http.$axios
          .get("/TP/ashx/TaskHandler.ashx?action=GetTaskListByWorkspointId", {
            params: {
              worksPointId: this.Id
            }
          })
          .then(res => {
            var d = res.data.rows;
            d.forEach(element => {
              this.panelshow["show_" + element.Id] = false;
            });
            console.log(this.panelshow);
            this.taskList = res.data.rows;
            // console.log(res);
          })
          .catch(err => {
            // console.log(err);
          });
      },
      showFieldHtml(item) {
        switch (item.FieldDataType) {
          case 20:
            {
              return "文件";
            }
            break;
          case 21:
            {
              return "图片";
            }
            break;
          default:
            {
              return item.FieldValue;
            }
        }
      }
    },
components:{fileListView,photoListView},
    created() {
      this.windowHeight = Utils.getWindowSize().height - 240;
      this.Id = this.$route.params.Id;
      this.getTaskList();
    }
  };

</script>
