<template>


  <div>
    Tips: 流程图编辑页面将重新设计，不考虑 复杂流程设计 ，暂缓...........................
    <div class="row">
 
      <div class="col-md-5">
        <table-grid :url="url" :params="params" :tabledata="flowcharParams" @getHigtLightRow="rowClick" />
      </div>
      <div class="col-md-7">
        <div class="callout callout-info " style="margin-left:-15px;">
          <h4>
          <i class="fa fa-list-alt" aria-hidden="true"></i>   模板 : {{templateName}}
            <span style="float:right">
              <el-button type="text" style="color:#fff" @click="backToTemplate">
                <i class="fa fa-chevron-left" aria-hidden="true"></i> 返回模板列表</el-button>
            </span>
          </h4>
        </div>
        <div class="row">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">预览</h3>

            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">

                  <el-steps :active="1" simple>
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                  </el-steps>
                </div>
              </div>

            </div>

          </div>

        </div>
        <div class="row">
          <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">属性</h3>
                 <div class="box-tools pull-right">
          <el-button type="primary" plain size="mini" @click="addNode">
                <i class="fa fa-plus" aria-hidden="true"></i>  添加新节点 </el-button>
                      <el-button type="success" plain  size="mini" @click="editNode">
                <i class="fa fa-pencil" aria-hidden="true"  ></i> 编辑 </el-button>
            </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                  <el-form label-width="120px" :model="nodeForm" ref="nodeForm">
                    <el-form-item label="节点名"  prop="NodeName">
                      <el-input v-model="nodeForm.NodeName" v-if="showEdit" ></el-input>
             
                      <span class="lead"  v-if="!showEdit" >{{nodeForm.NodeName}}</span>
                    </el-form-item>
                    <el-form-item label="序号"   prop="Order">
                      <el-input v-model="nodeForm.Order" v-if="showEdit"></el-input>
                      <span class="lead"  v-if="!showEdit" >{{nodeForm.Order}}</span>
                    </el-form-item>
                    <el-form-item label="开始·公式"  v-if="showEdit"  prop="BeginFun">
                      <el-input v-model="nodeForm.BeginFun"></el-input>
                    </el-form-item>
                    <el-form-item label="进行中·公式"  v-if="showEdit" prop="DoingFun">
                      <el-input v-model="nodeForm.DoingFun" v-if="showEdit" ></el-input>
                    </el-form-item>
                    <el-form-item label="完成·公式"  v-if="showEdit" prop="EndFun">
                      <el-input v-model="nodeForm.EndFun" v-if="showEdit" ></el-input>
                    </el-form-item>
                    
                     <el-button type="primary" v-if="showEdit"  size="small" style="width:100%"><i class="fa fa-floppy-o" aria-hidden="true"></i> 保存</el-button>

                  </el-form>
                </div>
              </div>

            </div>


          </div>

        </div>
      </div>

    </div>

  </div>


</template>

<script>
  export default {
    name: "workflow",
    data() {
      return {
        showEdit:false,

        templateId: "",
        templateName:"",
        flowchart: {},

        url: "",
        params: {},
        flowcharParams: {
          columns: [{
              title: "节点名",
              prop: "NodeName"
            },
            // {
            //   title: "序号",
            //   prop: "Order"
            // }
          ]
        },
        nodeForm: {
          NodeName: "",
          Order: 1,
          BeginFun: "",
          DoingFun: "",
          EndFun: ""
        }
      };
    },
    methods: {
      backToTemplate(){
        this.$router.push({path:'/Template/List'})
      },
      rowClick(row) {
        this.flowchart = row;
        this.showEdit=false;
      },
      addNode(){
         this.showEdit=true;
        this.$refs["nodeForm"].resetFields();     
      },
      editNode(){
         this.showEdit=true;
          this.$refs["nodeForm"].resetFields();     
      }
    },
    created() {
      this.templateId = this.$route.params.templateId;
      this.templateName=this.$route.params.templateName;
     
    }
  };

</script>

<style>


</style>
