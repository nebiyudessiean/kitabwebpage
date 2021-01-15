<template>
  <v-app>
    <div v-if="isLogged">
    <PublisherNavbar />
    <section class="container">
      <h1>Top read books</h1>
      <div class="columns">
        <div class="column">
          <reactive :chart-data="datacollection"></reactive>
        </div>
      </div>
    </section>
    </div>
<NotLogged v-else></NotLogged>
  </v-app>
</template>
<script>
import PublisherNavbar from "@/components/PublisherNavbar.vue";
import Reactive from "@/components/chart/Reactive";
import NotLogged from "@/NotLogged.vue"
import BookDataService from "@/services/BookDataService"

export default {
  components: {
    PublisherNavbar,
    Reactive,
    NotLogged,
  },
  data() {
    return {
      
      datacollection: null,
      isLogged:false,

    };
  },
  
  created(){
    var storage=window.localStorage;
    if (storage.getItem("kitabUserType")!=null&&storage.getItem("kitabToken")!=null) {
      this.isLogged=true;
      BookDataService.getAll(storage.getItem("kitabToken")).then(response=>this.datacollection=response).catch(()=>this.fillData())      
      }
    },
  methods: {
    fillData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: [
          "Dertogad",
          "oromay",
          "sememen",
          "fiker eske mekabr",
          "yotod",
          "tzta",
          "keadmass bashager",
          "gungun",
          "ramatohara",
          "yebirhan felegoch",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            // Data for the x-axis of the chart
            data: [
              20,
              40,
              80,
              30,
              50,
              100,
              200,
              150,
              25,
              15,
              23,
            4
            ]
          }
        ]
      };
    },
   
  },

  mounted() {
     
  }
};
</script>
