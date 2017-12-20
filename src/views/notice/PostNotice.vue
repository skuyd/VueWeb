<template>
  <div class="box box-info ">
    <div class="box-header">
      <h3 class="box-title">通知内容
        <small>|
          <i class="fa fa-info-circle" aria-hidden="true"></i> 暂只支持发送给本公司人员</small>
      </h3>
      <!-- tools box -->
      <div class="pull-right box-tools">

        <el-button size="mini" type="danger" plain>
          <i class="fa fa-trash" aria-hidden="true"></i> 清空内容
        </el-button>
        <el-button size="mini" type="primary" plain>
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i> 投递通知
        </el-button>
      </div>
      <!-- /. tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body pad">
      <el-form ref="form" :model="noticeForm" size="small" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="noticeForm.title" placeholder="请输入通知标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor ref="myTextEditor" placeholder="请输入通知内容" v-model="noticeForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="noticeForm.type" label="1">普通通知</el-radio>
        </el-form-item>
        <el-form-item label="回执">
          <el-switch v-model="noticeForm.receipt" active-text="需回执">
          </el-switch>
        </el-form-item>
        <el-form-item label="接收人">


          <el-row >
            <el-tag size="small" style="margin-left:2px;" v-for="(u,index) in receiveUsers" :key="u.Id" closable @close="delUser(index)">
            {{u.TrueName}} </el-tag>
          </el-row>
          <el-row type="flex">
            <el-button type="text" @click="showSelector">选择接收人员</el-button>
          </el-row>

        </el-form-item>
        <el-form-item label="附件">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3" :file-list="noticeForm.attachList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="选择人员" :visible.sync="showUserSelector">
      <user-selector @getUsers="getUsers"></user-selector>
    </el-dialog>
  </div>
</template>
<script>
  import userSelector from "@/components/userSelector/sameComUser";
  export default {
    name: "postNotice",
    data() {
      return {
        receiveUsers: [],
        showUserSelector: false,
        noticeForm: {
          title: "",
          type: "1",
          content: "",
          receipt: false,
          receiveUserIds: [],
          attachList: []
        },

        editorOption: {
          placeholder: "请输入通知具体内容",
          theme: "snow"
          // modules: {
          //   toolbar: [
          //     ["bold", "italic", "underline"], // toggled buttons
          //     //   ['blockquote', 'code-block'],
          //     [{ header: 1 }, { header: 2 }], // custom button values
          //     [{ list: "ordered" }, { list: "bullet" }],
          //     [{ script: "sub" }, { script: "super" }], // superscript/subscript
          //     //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          //     //   [{ 'direction': 'rtl' }],                         // text direction
          //     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          //     [{ align: [] }],
          //     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
          //     ["clean"]
          //   ] // remove formatting button]
          // }
        }
      };
    },
    methods: {
      delUser: function (index) {
        this.receiveUsers.splice(index, 1);
      },
      showSelector: function () {
        this.showUserSelector = true;
      },
      getUsers: function (users) {
        this.receiveUsers = users;
        this.showUserSelector = false;
      }
    },
    components: {
      userSelector
    }
  };

</script>
