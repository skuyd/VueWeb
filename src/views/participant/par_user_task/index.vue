<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="padding:6px 16px;">
            <span style="line-height: 33px;">任务分配</span>
            <span style="float:right">
        <button-list :btnList="this.opbtnList" @startPar="startPar" @multiplePar="multiplePar"/>
            </span>
          </div>
          <div class="text item">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="专业">
                <el-select size="mini" placeholder="请选择专业">
                  <el-option>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务">
                <el-select size="mini" placeholder="请选择任务">
                  <el-option>

                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工期">
                <el-input size="mini" type="text" placeholder="请输入工期"></el-input>
              </el-form-item>
              <el-form-item label="紧急程度">
                <el-radio label="1">一般</el-radio>
                <el-radio label="2">紧急</el-radio>
              </el-form-item>
              <el-form-item label="备注">
                <el-input size="mini" type="textarea" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <div class="box">
        <div class="box-header with-border"><i class="fa fa-television" aria-hidden="true"></i> 选择交付
          <!-- <h3 class="box-title">选择交付</h3><small></small> -->
          <div class="box-tools pull-right">
        <button-list :btnList="this.wpbtnList" @addWp="addWp" @removeWp="removeWp" @addFilter="addFilter" @removeFilter="removeFilter"/>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <table-grid></table-grid>
            </div>
          </div>       
        </div>       
      </div>
    </el-row>
    <el-row >
        <div class="box">
        <div class="box-header with-border"><i class="fa fa-user-o" aria-hidden="true"></i> 选择对象
          <!-- <h4 class="box-title">选择对象</h4> -->
          <div class="box-tools pull-right">
         <button-list :btnList="this.objbtnList" @chooseUser="chooseUser" @chooseOrgUser="chooseOrgUser" @removeUser="removeUser"
      />          </div>
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
    </el-row>

  </div>
</template>
<script>
  import buttonList from "@/components/buttonList/index";
  export default {
    name: "par_user_task",
    data() {
      return { opbtnList: [         
          {
            btnType: "primary",
            btnIcon: "fa-play",
            btnFunc: "startPar",
            btnName: "开始分配"
          },
          {
            btnType: "primary",
            btnIcon: "fa-fast-forward",
            btnFunc: "multiplePar",
            btnName: "批量分配"
          }
        ],
        wpbtnList: [{
            btnType: "primary",
            btnIcon: "fa-plus-square-o",
            btnFunc: "addWp",
            btnName: "添加交付"
          },
          {
            btnType: "danger",
            btnIcon: "fa-minus-square-o",
            btnFunc: "showdoing",
            btnName: "移除选中"
          },
          {
            btnType: "primary",
            btnIcon: "fa-plus-square-o",
            btnFunc: "showend",
            btnName: "添加条件"
          },
          {
            btnType: "danger",
            btnIcon: "fa-minus-square-o",
            btnFunc: "submitTaskRecord",
            btnName: "清空条件"
          }
        ],
        objbtnList: [{
            btnType: "primary",
            btnIcon: "fa-user-secret",
            btnFunc: "search",
            btnName: "选择人员"
          },
          {
            btnType: "primary",
            btnIcon: "fa-user",
            btnFunc: "showdoing",
            btnName: "其他单位人员"
          },
          {
            btnType: "danger",
            btnIcon: "fa-user-times",
            btnFunc: "showend",
            btnName: "移除"
          }
        ]
      };
    },
    components: {
      buttonList
    }
  };

</script>
