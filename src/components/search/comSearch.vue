<template>
  <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">搜索</h3>
          <div class="box-tools pull-right">
               </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
             
            </div>
          </div>
       
        </div>
        <!-- ./box-body -->
        <div class="box-footer">
          <div class="row">
              这里是按钮
            <!-- /.row -->
          </div>
          <!-- /.box-footer -->
        </div>
      </div>
</template>
<script>
export default {
 name:'comSearch',
 data(){
     return {
         filterResult:'',
         func:[]
     }
 } ,
 props:["columns"],
 methods:{

 },
 created(){

 }

}
</script>


