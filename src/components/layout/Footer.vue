<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 3.0.0
    </div>
    <strong>Copyright &copy; 2015-2018 <a href="https://www.duxinjianli.com">{{this.getDevCompanyName()}}</a>.</strong> All rights
    reserved. Develop By {{this.getDevCompanyName()+this.getDevDepartmentName()}}
  </footer>
</template>
<script>

export default {
  name:"Footer",
  // data(){},
  props:[],
  methods:{},
  created(){},
  watch:{}
}
</script>