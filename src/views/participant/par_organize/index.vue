<template>
  <div>
     <el-row>
      <div class="box "  style="margin-bottom:0px !important;border: 0;">
        <div class="box-header with-border"><i class="fa fa-sitemap" aria-hidden="true"></i> 单位分配                 
          <div class="box-tools pull-right">
        <button-list :btnList="this.opbtnList" @startPar="startPar" @multiplePar="multiplePar"/>
          </div>
        </div>               
      </div>

    </el-row>
    <el-row >
      <div class="box box-info ">
        <div class="box-header with-border"><i class="fa fa-angle-right" aria-hidden="true"></i><i class="fa fa-angle-right" aria-hidden="true"></i> 选择交付
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
        <div class="box box-info">
        <div class="box-header with-border"><i class="fa fa-angle-right" aria-hidden="true"></i><i class="fa fa-angle-right" aria-hidden="true"></i> 选择单位
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
    name: "par_user",
    data() {
      return {
          opbtnList: [         
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
            btnIcon: "fa-sitemap",
            btnFunc: "search",
            btnName: "选择单位"
          },
          {
            btnType: "danger",
            btnIcon: "fa-times",
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
