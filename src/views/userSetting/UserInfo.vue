<template>
  <el-main>
    <!-- 基础信息 -->
    <div class="box box-success ">
      <div class="box-header with-border">
        <h3 class="box-title">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 基础信息
          <small>| {{ this.$route.params.TrueName }} - {{ this.$route.params.UserName }}</small>
        </h3>
      </div>
      <div class="box-body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="邮箱" prop="Email">
            <el-input placeholder="请输入邮箱" v-model="ruleForm.Email">
              <template slot="prepend">
                <i class="fa fa-at"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="ruleForm.Remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="submitForm('ruleForm')">修改资料</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="box box-info ">
      <div class="box-header with-border">
        <h3 class="box-title ">
          <i class="fa fa-unlock-alt" aria-hidden="true"></i> 修改密码
          <small> </small>
        </h3>
      </div>
      <div class="box-body">
        <el-form :model="PassWordForm" :rules="rules" ref="PassWordForm" label-width="80px">
          <el-form-item label="原密码" prop="OldPassWord">
            <el-input  type="password"  v-model="PassWordForm.OldPassWord" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="NewPassWord">
            <el-input type="password" v-model="PassWordForm.NewPassWord" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="CheckNewPassWord">
            <el-input type="password" v-model="PassWordForm.CheckNewPassWord" placeholder="请再一次输入新密码密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('PassWordForm')">修改密码</el-button>

          </el-form-item>

        </el-form>
      </div>
    </div>
  </el-main>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.PassWordForm.CheckNewPassWord !== "") {
          this.$refs.PassWordForm.validateField("CheckNewPassWord");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.PassWordForm.NewPassWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        Email: "",
        Remark: ""
      },
      PassWordForm: {
        OldPassWord: "",
        NewPassWord: "",
        CheckNewPassWord: ""
      },
      rules: {
        OldPassWord: [
          {
            required: true,
            type: "string",
            message: "请输入原密码",
            trigger: "blur"
          }
        ],
        NewPassWord: [{ validator: validatePass, trigger: "blur" }],
        CheckNewPassWord: [{ validator: validatePass2, trigger: "blur" }],
        Email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
             { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        Remark: [
          {
            required: false,
            message: "请填写备注",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["UserInfo", "UserName"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
