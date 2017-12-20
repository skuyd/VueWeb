<template>
  <ul class="el-upload-list el-upload-list--text">
      <li v-for="item in convertList" :key="item.Id"><i class="fa fa-file-text-o" aria-hidden="true"></i> {{item.Comment}}   <a :href="item.FilePath"> <i class="fa fa-download" aria-hidden="true"></i> 下载 </a></li>
  </ul>
</template>
<script>

export default {
 name:'files',
 data(){
     return {
         convertList:[]

     }
 },
 props:['files'],
 method:{

 },
 created(){
       this.convertList=JSON.parse(this.files);
 }
}
</script>
