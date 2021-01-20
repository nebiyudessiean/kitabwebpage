<template>
  <v-app>
    <div v-if="isLogged">
    <AdminNavbar />
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" sm="12">
        <ApexChart></ApexChart>
        <v-card class="mx-auto" tile>
          <v-card-title>Authors</v-card-title>

          <v-data-table
            :headers="authorheaders"
            :items="authors"
            disable-pagination
            :hide-default-footer="true"
          ></v-data-table>

          <v-card-actions v-if="authors.length > 10">
            <v-btn small color="error" @click="showMoreAuthors">show more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Publishers</v-card-title>

          <v-data-table
            :headers="publisherheaders"
            :items="publishers"
            disable-pagination
            :hide-default-footer="true"
          ></v-data-table>

          <v-card-actions v-if="publishers.length > 10">
            <v-btn small color="error" @click="showMorePublishers">show more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Books</v-card-title>

          <v-data-table
            :headers="bookheaders"
            :items="books"
            disable-pagination
            :hide-default-footer="true"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    </div>
    <NotLogged v-else></NotLogged>
  </v-app>
</template>

<script>
import AuthorDataService from "@/services/AuthorDataService.js";
import PublisherDataService from "@/services/AuthorDataService.js";
import AdminNavbar from "@/components/AdminNavbar";
import ApexChart from "@/components/chart/ApexChart.vue";
import NotLogged from "@/NotLogged.vue";
export default {
  name: "Report-for-admin",
  components: {
    AdminNavbar,
    ApexChart,
    NotLogged

  },
  data() {
    return {
      isLogged:false,
      options: {
      chart: {
        id: 'vuechart-example'
      },
      xaxis: {
        categories: []
      }
    },
    series: [{
      name: 'series-1',
      data: []
    }],
      authors: [
        {
          id: "2",
          name: "minalbat bimeta",
          email: "email@email",
          phone: "251111111"
        },
        {
          id: "3",
          name: "dinknew gosmie",
          email: "email@email",
          phone: "25111222222"
        }
      ],

      authorheaders: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone", sortable: false }
      ],
      publishers: [
        {
         // id: "",
          name: "minalbat bimeta",
          email: "email@email",
          phone: "251111111",
          address: "Addis Ababab"
        },
        {
         // id: "",
          name: "dinknew wubetu",
          email: "email@email",
          phone: "25111222222",
          address: "Addis Ababa"
        }
      ],

      publisherheaders: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Address", value: "address", sortable: false }
      ],
      books: [
        {
         // id: "",
          title: "The title",
          author: "minalbat bimeta",
          price: 200,
          sold: 20
        },
        {
         // id: "",
          title: "The title2",
          author: "dinknew wubetu",
          price: 300,
          sold: 30
        }
      ],

      bookheaders: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Author", value: "author", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Sold", value: "sold", sortable: false }
      ]
    };
  },
   created(){
      const storage=window.localStorage;
      if (storage.getItem("kitabToken")!=null&&storage.getItem('kitabUserType')!=null) {
        this.isLogged=true;
      }},
  methods: {
    retrieveAuthors() {
      AuthorDataService.getAll()
        .then(response => {
          this.authors = response.data.map(this.getDisplayAuthors);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrievePublishers() {
      PublisherDataService.getAll()
        .then(response => {
          this.publishers = response.data.map(this.getDisplayPublishers);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAuthors();
      this.retrievePublishers();
    },

    getDisplayAuthor(author) {
      return {
        id: author.id,
        name: author.name,
        phone: author.phone,
        email: author.email
      };
    },
    getDisplayPublisher(publisher) {
      return {
        id: publisher.id,
        name: publisher.name,
        phone: publisher.phone,
        address: publisher.address,
        email: publisher.email
      };
    },
   },
  
  // mounted() {
  //   this.retrieveTutorials();
  // },
};
</script>

<style>
.list {
  max-width: autho;
}
</style>