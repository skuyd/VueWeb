<template>
  <div>
    <div class="box box-warning ">
      <div class="box-header with-border">

        <h3 class="box-title"> {{this.getSysName()}}
          <small> | 服务中心 (未找到相关问题？请在
            <router-link :to="'/serviceCenter/FeedBack'">意见反馈</router-link>中告诉我们)</small>
        </h3>
      </div>
      <div class="box-body">
        <el-collapse v-model="activeNames">

          <el-collapse-item>
            <template slot="title">
              <i class="fa fa-lg fa-question-circle question" aria-hidden="true"></i> 忘记账号密码怎么办？
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <i class="fa fa-lg fa-question-circle question" aria-hidden="true"></i> 如何下载客户端
            </template>
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <i class="fa fa-lg fa-question-circle question" aria-hidden="true"></i> 微信公众号如何切换用户？
            </template>
            <div>点击右侧....</div>

          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <i class="fa fa-lg fa-question-circle question " aria-hidden="true"></i> 施工点信号覆盖差如何提交日志？
            </template>
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'sysInfo',
    data() {
      return {
        activeNames: ['1']
      };
    }
  }

</script>
<style>

</style>
