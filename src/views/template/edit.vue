<template>
  <el-form ref="templateForm" :model="templateForm" label-width="120px">
    <el-form-item label="模板名称">
      <el-input v-model="templateForm.TemplateName"></el-input>
    </el-form-item>
    <el-form-item label="所属专业">
      <el-select v-model="templateForm.SpecialityId" placeholder="请选择专业">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="模板类型">
      <el-select v-model="templateForm.TemplateType" placeholder="请选择模板类型">
        <el-option label="T形模板" value="0"></el-option>
        <el-option label="导航模板" value="1"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="备注">
      <el-input type="textarea" v-model="templateForm.Remark"></el-input>
    </el-form-item>
    <el-form-item label="来源共享模板">
      <el-switch v-model="templateForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
   </template> 
  <script>
export default {
  name: "templateEdit",
  data() {
    return {
      templateForm: {
        Id: "",
        TemplateName: "",
        SpecialityId: "",
        TemplateType: "0",
        Remark: "",
        radCopy: false,
        SourceTemplateId: ""
      }
    };
  },
  methods: {
    onSubmit() {},
    initForm() {
      // $reset 会报错 所以用这种办法 重置
      this.templateForm["Id"] = "";
      this.templateForm["TemplateName"] = "";
      this.templateForm["SpecialityId"] = "";
      this.templateForm["TemplateType"] = "0";
      this.templateForm["Remark"] = "";
      this.templateForm["radCopy"] = false;
      this.templateForm["SourceTemplateId"] = "";

      //初始化
      if (this.editModel != null) {
        for (var v in this.editModel) {
          if (this.templateForm.hasOwnProperty(v)) {
            this.templateForm[v] = this.editModel[v].toString();
          }
        }
      }
    }
  },
  props: ["editModel"],
  created() {
    this.initForm();
  },
  watch: {
    editModel(val, old) {
      this.initForm();
    }
  }
};
</script>
