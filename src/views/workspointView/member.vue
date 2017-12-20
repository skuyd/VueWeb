<template>
  <div :style="'height:'+windowHeight+'px;'">
    <!-- <el-tag type="success"  >标签二</el-tag> -->
    <div class="row" style="height:100%">
      <div :class="listClass" style="height:100%">
        <div class="box box-info" style="height:100%">
          <div class="box-header with-border">
            <h3 class="box-title">
              <i class="fa fa-user-o" aria-hidden="true"></i> 参与单位/人员</h3>

          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <el-tree v-if="showTree" :data="data" :node-key="'memberTree'" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div class="col-md-8" style="height:100%;padding:0;" v-if="showDetail">
        <div class="box" style="height:100%">
          <div class="box-header with-border">
            <h3 class="box-title">
              <i class="fa fa-thumb-tack" aria-hidden="true"></i> 任务/分配详情</h3>

          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <th>{{info.text}}</th>
                      <th v-if="info.Data">{{info.Data}}</th>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <table-grid v-if="showtable" :tabledata="tableParam" :refs="reftable" :url="taburl" :params="par" />
                </div>
                <!-- :refs="showtable" -->
              </div>
            </div>

          </div>
          <div class="box-footer" style="bottom:0;position:absolute">
            <div class="row">
              <!-- /.row -->
              <div class="col-md-12">
                * 左侧选择人员可查看该人员在当前站点的分配详细
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
  export default {
    name: "member",
    data() {
      return {
        windowHeight: "auto",
        showDetail:false,
listClass:"col-md-12",
        showTree: false,
        showtable: false,
        reftable: false,
        taburl: "/ProjectManage/ashx/WorkspointTaskHandler.ashx?action=GetUserTaskListByUserIdAndWpId&x=1",
        par: {},

        data: [],
        info: {},
        workspointId: "",
        defaultProps: {
          children: "children",
          label: "text"
        },
        tableParam: {
          url: "/ProjectManage/ashx/WorkspointTaskHandler.ashx?action=GetUserTaskListByUserIdAndWpId",
          // params: { workspointId: this.workspointId},
          columns: [{
              title: "任务",
              prop: "TaskName",
              formatter: function (row, col, cell) {
                if (row.TaskName == null) {
                  return "分配交付";
                } else {
                  return "分配任务-" + row.TaskName;
                }
              }
            },
            {
              title: "分配人",
              prop: "CreatorName"
            },
            {
              title: "时间",
              prop: "CreateTime"
            }
          ]
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        this.listClass="col-md-4";
        this.showDetail=true;


        if (data.Data === null) {
          this.info = data;
          this.showtable = false;
        } else {
          if (data.id != this.info.id) {
            this.info = data;
            this.taburl =
              "/ProjectManage/ashx/WorkspointTaskHandler.ashx?action=GetUserTaskListByUserIdAndWpId";
            this.par = {
              userId: data.id,
              workspointId: this.workspointId
            };
            this.showtable = true;
            this.reftable = !this.reftable;
          }
        }
      },
      getMembers() {
        this.$http.$axios
          .get(
            "/ProjectManage/ashx/WorksPointParticipant.ashx?Action=GetWorksPointParticipantGroup", {
              params: {
                workspointId: this.workspointId
              }
            }
          )
          .then(res => {
            if (res.data) {
              this.data = res.data;
              this.showTree = true;
            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    },
    created() {
      this.workspointId = this.$route.params.Id;
      this.windowHeight = Utils.getWindowSize().height - 240;
      this.getMembers();
    }
  };

</script>
