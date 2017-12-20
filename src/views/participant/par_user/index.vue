<template>
  <div>
    <el-row>
      <div class="box " style="margin-bottom:0px !important;border: 0;">
        <div class="box-header with-border">
          <i class="fa fa-user" aria-hidden="true"></i> 人员分配

          <div class="box-tools pull-right">
            <button-list :btnList="this.opbtnList" @startPar="startPar" @multiplePar="multiplePar" />
          </div>
        </div>
      </div>

    </el-row>
    <el-row>
      <div class="box box-warning">
        <div class="box-header with-border">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
          <i class="fa fa-angle-right" aria-hidden="true"></i> 选择交付
          <!-- <h3 class="box-title">选择交付</h3><small></small> -->
          <div class="box-tools pull-right">
            <button-list :btnList="this.wpbtnList" @addWp="addWp" @removeWp="removeWp" @addFilter="addFilter" @removeFilter="removeFilter"
            />
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <table-grid :tabledata="wpdata" :refs="wprefs" @dbClick="wpdbClick" @getSelection="wpGetSelection" />
            </div>
          </div>

        </div>

      </div>
    </el-row>
    <el-row>
      <div class="box box-warning">
        <div class="box-header with-border">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
          <i class="fa fa-angle-right" aria-hidden="true"></i> 选择对象
          <!-- <h4 class="box-title">选择对象</h4> -->
          <div class="box-tools pull-right">
            <button-list :btnList="this.objbtnList" @chooseUser="chooseUser" @chooseOrgUser="chooseOrgUser" @removeUser="removeUser"
            /> </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <table-grid :tabledata="userdata" :refs="userrefs"  @dbClick="userdbClick" @getSelection="userGetSelection" />
            </div>
          </div>
        </div>

      </div>
    </el-row>
    <el-dialog :visible.sync="showUserSelector">
      <span slot="title" class="dialog-title">
        <i class="fa fa-user-o" aria-hidden="true"></i> 选择人员</span>
      <user-selector @getUsers="getUsers"></user-selector>
    </el-dialog>
    <el-dialog :visible.sync="showWpSelector" width="80%">
      <span slot="title" class="dialog-title">
        <i class="fa fa-television" aria-hidden="true"></i> 选择交付</span>
      <wp-selector @geWorkspoints="geWorkspoints"></wp-selector>
    </el-dialog>

   <el-dialog :visible.sync="showOthUserSelector" width="50%">
      <span slot="title" class="dialog-title">
        <i class="fa fa-user-o" aria-hidden="true"></i> 选择其他单位人员</span>
      <alluser-selector @getUsers="getUsers"></alluser-selector>
    </el-dialog>

  </div>
</template>
<script>
  import buttonList from "@/components/buttonList/index";
  import userSelector from "@/components/userSelector/sameComUser";
  import alluserSelector from "@/components/userSelector/allUser";
  import wpSelector from "@/components/workspointSelector/index";
  import utils from "@/common/help/utils.js"
  export default {
    name: "par_user",
    data() {
      return {
        wprefs: false,
        userrefs: false,
        // ---- btn begin  ------
        opbtnList: [{
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
            btnFunc: "removeWp",
            btnName: "移除选中"
          },
          {
            btnType: "primary",
            btnIcon: "fa-plus-square-o",
            btnFunc: "addFilter",
            btnName: "添加条件"
          },
          {
            btnType: "danger",
            btnIcon: "fa-minus-square-o",
            btnFunc: "removeFilter",
            btnName: "清空条件"
          }
        ],
        objbtnList: [{
            btnType: "primary",
            btnIcon: "fa-user-secret",
            btnFunc: "chooseUser",
            btnName: "选择人员"
          },
          {
            btnType: "primary",
            btnIcon: "fa-user",
            btnFunc: "chooseOrgUser",
            btnName: "其他单位人员"
          },
          {
            btnType: "danger",
            btnIcon: "fa-user-times",
            btnFunc: "removeUser",
            btnName: "移除"
          }
        ],
        // ----  btn end ------
        // --- dialog  visible---
        showUserSelector: false,
        showWpSelector: false,
        showOthUserSelector:false,
        // --- dialog  end ---
        //------ table begin ---------
        wpsels: [],
        wpdata: {

          pagination: true,
          smallpage: true,
          showcheck: true,
          columns: [{
              title: "交付名称",
              prop: "WorksPointName"
            },
            {
              title: "交付编号",
              prop: "WorksPointNo"
            },
            {
              title: "区域",
              prop: "Area"
            },
            {
              title: "专业",
              prop: "SpecialityName"
            },
            {
              title: "创建时间",
              prop: "CreateTime"
            }
          ],

        },
        usersels: [],
        userdata: {
          datas: [],
          pagination: true,
          smallpage: true,
          showcheck: true,
          columns: [{
              title: "姓名",
              prop: "TrueName",
              sort: true
            },
            {
              title: "账号",
              prop: "UserName",
              sort: "custom"
            }
          ]
        }
        // -------- table end ----------
      };
    },
    methods: {
      startPar: function () {

      },
      multiplePar: function () {

      },

      addWp: function () {
        this.showWpSelector = true;
      },
      removeWp: function () {

        var newdata = utils.removeArray(this.wpdata.datas, this.wpsels)
        this.wpdata.datas = newdata;
        this.wprefs = !this.wprefs;

      },
      addFilter: function () {

      },
      removeFilter: function () {

      },
      wpdbClick: function (row) {

      },
      wpGetSelection: function (rows) {
        this.wpsels = rows;
      },
      userdbClick: function (row) {

      },
      userGetSelection: function (rows) {
        this.usersels = rows;
      },
      chooseUser: function () {
                    console.log(this);
        this.showUserSelector = true;
      },
      chooseOrgUser: function () {
        this.showOthUserSelector = true;
      },
      removeUser: function () {
        var newdata = utils.removeArray(this.userdata.datas, this.usersels)
        this.userdata.datas = newdata;
        this.userrefs = !this.userrefs;

      },
      getUsers: function (users) {
        var newdata = utils.mergeArray(this.userdata.datas, users);
        this.userdata.datas = newdata;
        this.userrefs = !this.userrefs;
        this.showUserSelector = false;
              },
      geWorkspoints: function (wps) {
        var newdata = utils.mergeArray(this.wpdata.datas, wps);
        this.wpdata.datas = newdata;
        this.wprefs = !this.wprefs;
        this.showWpSelector = false;
      }
    },
    components: {
      buttonList,
      wpSelector,
      userSelector,
      alluserSelector
    }
  };

</script>
