<template>
<div>
    <el-alert v-for="n in notifications"
    :key="n.Id"
    :title="n.Content"
    :type="n.Type"
     center
    show-icon>
  </el-alert>
    
  </el-alert>

</div>
</template>
<script>
  import moackapi from "../../api/mockapi";
export default {
  name: "notification",
  data() {
    return {
     notifications:[]
    };
  },
  methods: {
    getNotifications: function() {
      this.notifications= moackapi.getnotifications()
    }
  },
created(){
    this.getNotifications();
}
};
</script>

