<template>
  <div class="row">
    <div :class="listClass" style="padding-left:30px;background-color:#fff;">
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <span style="color:#409EFF">
              <i class="fa fa-file-text-o" aria-hidden="true"></i> 文件 (多选可批量
              <el-button type="text">
                打包下载
                <i class="fa fa-download" aria-hidden="true"></i>
              </el-button> )
            </span>
          </template>
          <div>
            <el-tree v-if="showFileTree" :data="filelist" :node-key="'fileTree'" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick"
              show-checkbox></el-tree>
          </div>

        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <span style="color:#EB9E05">
              <i class="fa fa-file-image-o" aria-hidden="true"></i> 照片 (多选可批量
              <el-button type="text" class="text-yellow">
                打包下载
                <i class="fa fa-download" aria-hidden="true"></i>
              </el-button> )
            </span>
          </template>
          <!-- <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div> -->
        </el-collapse-item>

      </el-collapse>
    </div>
    <div class="col-md-4" v-if="showDetails">
      <div class="callout callout-info">
        <!-- <h4 style=""><i class="fa fa-thumb-tack" aria-hidden="true"></i> </h4> -->
        <!-- <h4 >  <i class="fa fa-circle-o " aria-hidden="true"></i></h4> -->
        <h4> {{fileInfo.Comment}}</h4>
        <p style="padding:5px;">
          <span> {{fileInfo.CreatorName}}</span>
          <span style="float:right"> {{fileInfo.CreateTime}} </span>
        </p>
        <p style="padding:0 5px;">
          <el-button type="text" size="mini" style="color:#fff">
            <i class="fa fa-eye" aria-hidden="true"></i> 预览</el-button>
          <el-button type="text" size="mini" style="color:#fff">
            <i class="fa fa-download" aria-hidden="true"></i> 下载</el-button>
        </p>
        <div class="detailsInfo">

        </div>

      </div>

    </div>
  </div>

</template>
<script>
  import Utils from "@/common/help/utils";
  export default {
    name: "file",
    data() {
      return {
        workspointId: "",
        defaultProps: {
          children: "children",
          label: "text"
        },
        showDetails: false,
        fileInfo: {},
        node: {},
        showFileTree: false,
        showphotoTree: false,
        listClass: 'col-md-12',
        filelist: {},
        photolist: {}
      };
    },
    methods: {
      getFiles() {
        this.$http.$axios
          .get(
            "/ProjectManage/ashx/WorkspointTaskHandler.ashx?Action=GetWorksPointTaskFileList&filetype=0", {
              params: {
                workspointId: this.workspointId
              }
            }
          )
          .then(res => {
            if (res.data) {
              this.filelist = res.data;
              this.showFileTree = true;
            }
          })
          .catch(err => {
            // console.log(err);
          });
      },
      handleNodeClick(data) {
        this.fileInfo = data.attributes;
        this.node = data;
        this.showDetails = true;
        this.listClass = 'col-md-8'
      }
    },
    created() {
      this.workspointId = this.$route.params.Id;
      this.windowHeight = Utils.getWindowSize().height - 240;
      this.getFiles();
    }
  };

</script>
