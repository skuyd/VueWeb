<template>
  <div id="TableGrid" style="width:100%">
    <el-table v-loading.body="listLoading" :key='tableparams.tableKey' :fit="true" :data="listdata" :show-summary="tableparams.showsummary"
      @sort-change="tableSortChange" @row-dblclick="dbClick" @row-click="rowClick" @selection-change="getSelection" border
      :size="this.tabsize" highlight-current-row>
      <el-table-column v-if="tableparams.showindex" type="index" width="50px" fixed="left">
      </el-table-column>
      <el-table-column v-if="tableparams.showcheck" type="selection" width="50px" fixed="left">
      </el-table-column>
      <el-table-column v-for="col in tableparams.columns" :key="col.Id" :prop="col.prop" :label="col.title" :fixed="col.fix" :width="col.width"
        :sortable="col.sort" :formatter="col.formatter">
      </el-table-column>
      <!-- 增加简单操作模块 -->
      
       <el-table-column label="操作" v-if="tableparams.op.showop">  
      <template slot-scope="scope">
          <el-button size="mini"  type="primary"  p lain @click="handleEdit(scope.$index, scope.row)" v-if="tableparams.op.showEdit"><span v-html="tableparams.op.EditName"></span></el-button>
        <el-button
          size="mini"
          type="text" 
          plain
          @click="handleDelete(scope.$index, scope.row)" v-if="tableparams.op.showDelete"><span v-html="tableparams.op.DeleteName"></span></el-button>
      </template>
    </el-table-column>
    </el-table>
    <div v-show="tableparams.pagination&&!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="tableparams.listQuery.page"
        :page-sizes="tableparams.pages" :page-size="tableparams.listQuery.rows" :small="psize.small" :layout="psize.layout"
        :total="total">
      </el-pagination>

    </div>

    <!-- <el-select v-model="tabsize" placeholder="表格尺寸切换">
    <el-option :size="'mini'"
      v-for="item in this.tabsizeoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->

    <div v-show="tableparams.download" class="download-container">
      <el-button-group>
        <el-button type="primary" size="mini" :loading="curdownloading" @click="downCurrent">
          <i class="fa  fa-arrow-circle-o-down" aria-hidden="true"></i>导出当前页</el-button>
        <el-button type="primary" size="mini" :loading="alldownloading" @click="downAll">
          <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>导出全部</i>
        </el-button>
        <el-button type="primary" size="mini" @click="refresh">
          <i class="fa  fa-refresh" aria-hidden="true"></i> 刷新</el-button>
        <el-tooltip class="item" effect="dark" content="选择表格尺寸" placement="top-start">
          <el-select v-model="tabsize" :size="'mini'" style="width:40px;">
            <el-option v-for="item in tabsizeoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-tooltip>

      </el-button-group>
      <!-- <div >        <el-slider v-model="tabnum" :step="1" :min="0" :max="3" :show-tooltip="false">
        </el-slider>      
    </div> -->

    </div>

  </div>
</template>

<script>
import css from "./tablecss.css";

export default {
  name: "TableGrid",
  data() {
    return {
      tableparams: {
        tableKey: "Id",

        //----------TableGrid Params  Begin ---------------
        tableName: "列表数据", // -------- 表名
       // ----------数据Url    必填项
        columns: null, // ---------- 列数组
        datas: null,
        params: {}, // 参数 request 格式
        filter: "", // 参数 form-body 格式 a&B

        showcheck: false, //---------- 显示 CheckBox
        showindex: false, //---------- 显示索引 1,2,3,4
        showsummary: false, //---------- 显示求和行
        pagination: false, //---------- 显示分页
        download: false, //---------- 是否下载
        smallpage: false, //---------- 小分页

        op: {
          showop: false,
          showEdit: false,
          showDelete: false,
          EditName: "<i class='fa fa-pencil'></i> 编辑",
          DeleteName: "<i class='fa fa-minus'></i> 删除"
        },

        pages: [10, 20, 50], // 分页
        listQuery: {
          page: 1,
          rows:20,
          sort: "Id",
          order: "asc"
        }
      },
      //----------TableGrid Params  End ----------------
      // ----------- 分页自定义参数 -----------------
      paginationSizes: {
        smallSize: {
          small: true,
          layout: "prev, pager, next"
        },
        bigSize: {
          small: false,
          layout: "total, sizes, prev, pager, next, jumper"
        }
      },
      psize: null,
      // ----------- 分页自定义参数 -----------------
      listdata: null, // 列表 数据
      total: 0, // 总数
      listLoading: true, // 正在加载列表中... ...
      // selections: null,
      // ---------- 下载按钮 加载动画 ----------
      curdownloading: false,
      alldownloading: false,
      // ---------- 下拉选择大小 -----------
      tabnum: 1,
      tabsize: "mini",
      tabsizeoptions: [
        {
          value: "large",
          label: "大"
        },
        {
          value: "small",
          label: "中"
        },
        {
          value: "mini",
          label: "小"
        }
      ]
      // ---------------------------------
    };
  },
  props: ["tabledata", "refs","url","params"],
  // 各个参数
  methods: {
    getList() {
      // 开始执行网络请求  1
      this.listLoading = true;

      if (this.tableparams.datas) {
        this.total = this.tabledata.datas.length;
        this.listdata = this.tabledata.datas.slice(
          this.tableparams.listQuery.rows *
            (this.tableparams.listQuery.page - 1),
          this.tableparams.listQuery.rows * this.tableparams.listQuery.page
        );
        this.listLoading = false;
      } else {
        var param = {};
        if (this.tableparams.pagination) {
          Object.assign(
            param,
            this.params,
            this.tableparams.listQuery
          );
        } else {
          param = this.params;
        }

        var self = this;
        this.$http.$axios
          .get(this.url, {
            params: param
          })
          .then(response => {
            var data = response.data;
            this.listdata = data.rows;
            this.total = data.total;
            this.listLoading = false;
          })
          .catch(function(err) {
            self.listLoading = false;
          });
      }
      // this.listLoading = false;
    },
    //更换分页大小
    handleSizeChange(val) {
      this.tableparams.listQuery.rows = val;
      this.getList();
    },
    //切换页数
    handleCurrentChange(val) {
      this.tableparams.listQuery.page = val;
      this.getList();
    },
    //切换排序
    tableSortChange(col) {
      if (col.column != null && col.column.sortable == "custom") {
        this.tableparams.listQuery.sort = col.prop;
        this.tableparams.listQuery.order = col.order.replace("ending", "");
        this.getList();
      }
    },
    //单击事件
    // Click(row, event, column) {
    //     // console.log('This is a Click Event')
    // this.$emit("Click", row, event, column);
    // },
    //双击事件 -- 父容器实现dbClick事件
    dbClick(row, event, column) {
      this.$emit("dbClick", row, event, column);
    },
    //获取已选项 -- 父容器实现getSelection事件
    getSelection(selection) {
      this.$emit("getSelection", selection);
    },
    //获取高亮行 -- 父容器 实现 getHighLightRow 事件
    rowClick(row, event, column) {
      this.$emit("getHighLightRow", row);
    },
    // 下载当前页
    downCurrent() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        this.curdownloading = true;
        var columnName = [];
        var props = [];
        for (var col of this.columns) {
          columnName.push(col.title);
          props.push(col.prop);
        }
        const tHeader = columnName;
        const filterVal = props;

        const data = this.formatJson(filterVal, this.listdata);
        export_json_to_excel(
          tHeader,
          data,
          this.tableparams.tableName + "当前页数据导出"
        );
        this.curdownloading = false;
      });
    },
    // 下载所有数据
    downAll() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        this.alldownloading = true;
        var columnName = [];
        var props = [];
        var alldata = {};
        for (var col of this.columns) {
          columnName.push(col.title);
          props.push(col.prop);
        }

        const tHeader = columnName;
        const filterVal = props;

        alldata = this.$http.$axios
          .get(this.url, {
            params: this.params
          })
          .then(response => {
            const data = this.formatJson(filterVal, response.data.rows);
            export_json_to_excel(
              tHeader,
              data,
              this.tableparams.tableName + "全部数据导出"
            );
            this.alldownloading = false;
          })
          .catch(function(err) {
            v.$message.error(err);
          });
      });
    },

    handleEdit(index, row) {
    
      this.$emit("handleEdit", row);
    },

    handleDelete(index, row) {
      
      this.$emit("handleDelete", row);
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    refresh() {
      this.getList();
      // this.$forceUpdate();
    },
    //初始化方法
    init() {
      this.psize = this.paginationSizes.bigSize;

      for (var v in this.tabledata) {
        if (this.tableparams.hasOwnProperty(v)) {
          this.tableparams[v] = this.tabledata[v];
        }
      }
      if (this.tableparams.smallpage) {
        this.psize = this.paginationSizes.smallSize;
      }
    }
  },
  created() {
    //根据 url 获取
    this.init();
    this.getList();
  },
  watch: {
    refs: function(newval, oldval) {

      this.getList();
    }
  }
};
</script>
