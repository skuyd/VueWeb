<template>
  <div>

    <el-row>
      <el-col :span="1" style="right:0">
        <el-tooltip content="显示流程图" placement="top">
          <h4>
            <el-switch style="display: block" v-model="showflow" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </h4>
        </el-tooltip>
      </el-col>
      <el-col :span="7">
        <h4>{{Info.WorkspointName}}</h4>
      </el-col>
      <el-col :span="16"  v-show="showflow" style="border-bottom: 1px #3cb9f8 solid;padding-bottom: 10px;">
        <flowchart v-if="showflow1" />
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="info">
        <span slot="label">
          <i class="fa fa-info-circle" aria-hidden="true"></i> 基础信息
        </span>
        <info v-if="showinfo" />
      </el-tab-pane>
      <el-tab-pane name="member">
        <span slot="label">
          <i class="fa fa-users" aria-hidden="true"></i> 团队成员
        </span>
        <member v-if="showmember" />
      </el-tab-pane>
      <el-tab-pane name="task">
        <span slot="label">
          <i class="fa fa-tasks" aria-hidden="true"></i> 任务操作
        </span>
        <task v-if="showtask" />
      </el-tab-pane>
      <!-- <el-tab-pane name="flowchart">
        <span slot="label">
          <i class="fa fa-line-chart" aria-hidden="true"></i> 流程图
        </span>
        <flowchart v-if="showflowchart" />
      </el-tab-pane> -->
      <el-tab-pane name="file">
        <span slot="label">
          <i class="fa fa-paperclip" aria-hidden="true"></i> 附件
        </span>
        <file v-if="showfile" />
      </el-tab-pane>
      <!-- <el-tab-pane name="photo">
        <span slot="label">
          <i class="fa fa-picture-o" aria-hidden="true"></i> 照片
        </span>
        <photo v-if="showphoto" />
      </el-tab-pane> -->
    </el-tabs>

  </div>
</template>
<script>
import info from "../workspointView/info";
import member from "../workspointView/member";
// import member from "../workspointView/test";
import task from "../workspointView/task";
import flowchart from "../workspointView/flowchart";
import file from "../workspointView/file";
// import photo from "../workspointView/photo";

export default {
  name: "workspointView",
  data() {
    return {
      Info: {
        WorkspointName: "测试站点"
      },
      showflow: false,
      showflow1: false,
      showinfo: true,
      showmember: false,
      showtask: false,
      // showflowchart: false,
      showfile: false,
      // showphoto: false,
      activeName: "info"
    };
  },

  methods: {
    handleClick(tab, event) {
      // var a=eval('this.show'+tab.name);
      // a=true;
      switch (tab.name) {
        case "info":
          {
            this.showinfo = true;
          }
          break;
        case "member":
          {
            this.showmember = true;
          }
          break;
        case "task":
          {
            this.showtask = true;
          }
          break;
        // case 'flowchart':
        //   {
        //     this.showflowchart = true;
        //   }
        //   break;
        case "file":
          {
            this.showfile = true;
          }
          break;
        // case "photo":
        //   {
        //     this.showphoto = true;
        //   }
        //   break;
      }
      // console.log(tab, event);
    }
  },
  components: {
    info,
    member,
    task,
    flowchart,
    file
    // ,
    // photo
  },
  watch: {
    showflow: function(newval, oldval) {
      if (newval) {
        this.showflow1 = true;
      }
    }
  }
};
</script>
