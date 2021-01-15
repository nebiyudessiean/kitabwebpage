<template>
  <v-app>
  <div v-if="isLogged">
    <AuthorNavbar/>
    <ApexChart></ApexChart>
  </div>
  <NotLogged v-else></NotLogged>
  </v-app>
</template>
<script>
import AuthorNavbar from "@/components/AuthorNavbar.vue";
import ApexChart from "@/components/chart/ApexChart.vue";
import NotLogged from "@/NotLogged.vue";
export default {
  components:{
AuthorNavbar,
NotLogged,
ApexChart
  },
  data() {
    return {
      isLogged: false,
    };
  },

   created(){
    var storage=window.localStorage;
    if (storage.getItem("kitabUserType")!=null&&storage.getItem("kitabToken")!=null) {
      this.isLogged=true;
    }
    

  }
};
</script>
