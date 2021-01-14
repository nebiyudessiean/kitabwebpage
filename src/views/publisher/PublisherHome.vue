<template>
  <v-app>
    <PublisherNavbar />
    <section class="container">
      <h1>Top read books</h1>
      <div class="columns">
        <div class="column">
          <reactive :chart-data="datacollection"></reactive>
          <button class="button is-primary" @click="fillData()">Randomize</button>
        </div>
      </div>
    </section>
  </v-app>
</template>
<script>
import PublisherNavbar from "@/components/PublisherNavbar.vue";
import Reactive from "@/components/chart/Reactive";

export default {
  components: {
    PublisherNavbar,
    Reactive
  },
  data() {
    return {
      // instantiating datacollection with null
      datacollection: null
    };
  },
  created() {
    //anytime the vue instance is created, call the fillData() function.
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            // Data for the x-axis of the chart
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getRandomInt() {
      // JS function to generate numbers to be used for the chart
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },

  mounted() {}
};
</script>
