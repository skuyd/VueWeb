<template>
<div>
      <notification/>
   <section class="content-header">
      <h1> {{this.pageName}}
        {{this.icon}}
        <small>{{this.pageDes}}</small>
      </h1>
   
      <ol class="breadcrumb" >
            <!-- <li v-for="(item, index) in list"><span class="active" v-if="isLast(index)">{{ showName(item) }} </span>           
      <router-link :to="item.path" v-else>{{ showName(item) }}</router-link> -->
      </li>
        <!-- <li><a href="/"><i class="fa fa-dashboard"></i> 首页</a></li>-->
         <li class="active" v-for="(item, index) in list" >
           <!-- <a :href="item.path ">{{item.name}}</a> -->
             <router-link :to="item.path" >{{ item.name }}</router-link>
           </li> 
       <!-- <li>123</li> -->
      </ol>
    </section>

</div>
</template>
<script>
import notification from '../../components/layout/notification'
var v;
export default {
  name:"BreadCrumb",
  data(){
    return {
      pageName:"",
      pageDes:"",
      icon:''
    }
  },
  props:['list'],
  methods: {
    isLast (index) {

      return index === this.list.length - 1
    },
    showName (item) {
      // if (item.meta && item.meta.label) {
      //   item = item.meta && item.meta.label
      // }
      var titleName=""
      if (item.name) {
        titleName = item.name
      }
  
      return titleName
    }
  },
  watch:{
    list:(newVal,oldVal)=>{

      v.pageName=newVal[newVal.length-1].name;
      v.icon=newVal[newVal.length-1].icon;
    }
  },
  created(){
    v=this;
  },
  components:{notification}
}
</script>