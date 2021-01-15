<template>
  <v-app>
    <AdminNavbar />
   <v-row align="center" class="list px-3 mx-auto">
    <v-col  cols="12" md="8">
      <v-text-field v-model="name" label="Search by Name"
      @mouseenter="searchName"
      ></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn text small @click="searchName">
        Search
        
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Publishers</v-card-title>

        <v-data-table
          :headers="headers"
          :items="publishers"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
           
            <v-icon small @click="deletePublisher(item.name)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="publishers.length > 0">
          <v-btn small color="error" @click="removeAllPublishers">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-app>
</template>
<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import PublisherDataService from "@/services/PublisherDataService.js";
export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
     
      publishers: [
        { name: "Mega", email: "emai1l@email", phone: "251111111",address:"Addis Ababa1" },
        { name: "Aster nega", email: "email@email", phone: "25111222222",address:"Addis Ababa" },
      ],
      name: "",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Address", value: "address", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrievePublishers() {
      PublisherDataService.getAll()
        .then((response) => {
          this.publishers = response.data.map(this.getDisplayPublisher);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePublishers();
    },

    removeAllPublishers() {
      PublisherDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      PublisherDataService.findByName(this.name)
        .then((response) => {
          this.publishers = response.data.map(this.getDisplayPublisher);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

   

    deletePublisher(name) {
      PublisherDataService.delete(name)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayPublisher(publisher) {
      return {
        id: publisher.id,
        name: publisher.name,
        email: publisher.email,
        phone: publisher.phone ,
        address:publisher.address

      };
    },
  },
};
</script>
