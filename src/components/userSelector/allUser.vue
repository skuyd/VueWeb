<template>
  <div>
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="单位类型" style="margin-bottom:0;">
          <el-radio-group v-model="customType" size="mini">
            <el-radio-button :label="1">监理</el-radio-button>
            <el-radio-button :label="2">建设</el-radio-button>
            <el-radio-button :label="3">施工</el-radio-button>
            <el-radio-button :label="4"> 设计</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单位" style="margin-bottom:0;">
          <el-cascader placeholder="请先选择单位类型" :options="options" v-model="selectedOptions" @change="comChange" 
            :change-on-select="true" size="mini" :disabled="comDisable" :props="comselprops" :filterable="true">
          </el-cascader>
        </el-form-item>

      </el-form>




    </el-row>
    <el-row style="margin-top:10px;">
      <user-selector :companyId="comId"></user-selector>
    </el-row>
  </div>
</template>

<script>
  import userSelector from "@/components/userSelector/sameComUser";
  export default {
    name: "alluserSelector",
    data() {
      return {
        comselprops: {
          value: 'Id',
          label: 'FullName'
          // children: 'chi'
        },
        comId: 'NAN',
        comDisable: true,
        selectedOptions: [],
        customType: -1,
        options: []
      }
    },
    methods: {
      comChange(val) {
        
        this.comId =val[0];
     
      },
           getCompany() {
        var  self=this;
        var res = this.$http.$axios.post('/sys/ashx/OrganizeHandler.ashx?action=CustomerSelectList&customerType='+this.customType, '','').then( 
             response =>  {
            self.options = response.data.rows;
           
          })
          .catch(function (error) {

          });


      }
    },
    created() {

    },
    components: {

      userSelector
    },
    watch: {
      customType: function () {
        
        this.comDisable = false;
        this.getCompany();
      }
    }
  };

</script>

<style>
  .userselctorrow {
    margin-bottom: 10px;
  }

</style>
