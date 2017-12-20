<template>

<router-link class="treeview"   tag="li" :to="menu.navUrl" :active-class="activeClass">
         <a >
            <i :class="'fa '+ menu.icon"></i> <span>{{menu.navName}}</span>
            <span class="pull-right-container" v-if="menu.children&&menu.children.length">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
          <ul class="treeview-menu" v-if="menu.children&&menu.children.length">
          <treeMenu v-for="nav in menu.children"  :menu="nav"  :key="nav.Id"></treeMenu>
          </ul>
        </li>

</router-link>

</template>
<script>
export default {
name:"treeMenu",
data(){return {
  isParent:true,
  activeClass:' active'
}}, 
props:["menu"] ,
created(){
  if(this.menu.navUrl.length<1){
    this.activeClass=' ';
  }
  // console.log(this.isNotParent);
}
}
</script>
