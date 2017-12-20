<template>
  <div >
  <el-steps simple >
      <el-step v-for="item in flowdata" :key="item.nodeId" :title="item.text.text" description="" :status="getStatus(item.attr.fill)"></el-step>
  </el-steps>
</div>
</template>
<script>
export default {
  name: "flowchart",
  data() {
    return {
      workspointId: "",
      flowdata: {}
    };
  },
  methods: {
    draw: function() {
      this.$http.$axios
        .get("/TP/ashx/WorkFlowHandler.ashx?action=DrawWorkFlowInWorksPoint", {
          params: {
            workspointId: this.workspointId
          }
        })
        .then(res => {
          if (res.data) {
            var d = res.data.FlowChartData;
            console.log(JSON.parse(d).states);
            this.flowdata = JSON.parse(d).states;
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    getStatus(color) {
      var status = "progress";
      switch (color) {
        case "#fff":
          {
            status='progress'
          }
          break;
           case "#000":
          {
            status='error'
          }
          break;
           case "#00ff00":
          {
            status='success'
          }
          break;
           case "#ff0000":
          {
            status='error'
          }
          break;
         
      }
      return status;
    }
  },
  created() {
    this.workspointId = this.$route.params.Id;
    this.draw();
  }
};
</script>

<style>
.el-steps--simple {
  padding: 2px 4%;
  border-radius: 4px;
  background: transparent;
}
</style>
