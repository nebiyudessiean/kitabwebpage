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
        <v-card-title>Authors</v-card-title>

        <v-data-table
          :headers="headers"
          :items="authors"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editAuthor(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteAuthor(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="authors.length > 0">
          <v-btn small color="error" @click="removeAllAuthors">
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
import AuthorDataService from "@/services/AuthorDataService.js";
export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
     
      authors: [
        {id:'', name: "minalbat bimeta", email: "email@email", phone: "251111111" },
        { id:'',name: "dinknew gosmie", email: "email@email", phone: "25111222222" },
      ],
      name: "",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveAuthors() {
      AuthorDataService.getAll()
        .then((response) => {
          this.authors = response.data.map(this.getDisplayAuthor);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAuthors();
    },

    removeAllAuthors() {
      AuthorDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      AuthorDataService.findByTitle(this.name)
        .then((response) => {
          this.authors = response.data.map(this.getDisplayAuthor);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editAuthor(id) {
      this.$router.push({ name: "author-details", params: { id: id } });
    },

    deleteAuthor(id) {
      AuthorDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayAuthor(author) {
      return {
        id: author.id,
        name: author.name,
        phone: author.phone,
        email: author.email,
      };
    },
  },
};
</script>
