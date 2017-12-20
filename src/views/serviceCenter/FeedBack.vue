<template>
  <div>
    <div class="box box-info ">
      <div class="box-header with-border">
        <h3 class="box-title"> {{this.getSysName()}}
          <small> | 服务中心 (我们将全力解答和解决你的所有问题)</small>
        </h3>

      </div>
      <div class="box-body">

        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="">
      <el-tag>用心吐槽</el-tag>
      <el-tag>用心接受</el-tag>
        <el-tag>51交付，一起创造，一起分享</el-tag>
  </el-form-item> -->

          <el-form-item label="反馈问题">
            <el-input v-model="form.name" placeholder="请简述遇到的问题或建议"></el-input>
          </el-form-item>


          <el-form-item label="反馈类型">
            <el-checkbox-group v-model="form.type">

              <el-checkbox label="功能不完善" value="notenough"></el-checkbox>
              <el-checkbox label="操作太复杂" value="notsimple"></el-checkbox>
              <el-checkbox label="界面太难看" value="ugly"></el-checkbox>
              <el-checkbox label="服务支持不到位" value="badservice"></el-checkbox>
              <el-checkbox label="无法解决工作中的痛点" value="nosolute"></el-checkbox>
              <el-checkbox label="其它" value="other"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="想说更多">
            <el-input type="textarea" v-model="form.desc" placeholder="还有更多想吐槽的。可以在此尽情吐槽，我们会用心接受你的每一个反馈，51交付将努力让你拥有更好的体验"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">扔给你们</el-button>

          </el-form-item>
        </el-form>
      </div>
      <!-- /.box-body -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'feedBack',
    data() {
      return {
        form: {
          title: '',
          type: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$message({
          showClose: false,
          type: 'success',
          message: '我们已收到反馈，正在快马加鞭为您解决... ...'
        });
      }
    }
  }

</script>

