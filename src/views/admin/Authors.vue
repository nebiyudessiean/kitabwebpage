<template>
  <v-app>
    <div v-if="isLogged">
      <AdminNavbar></AdminNavbar>
      <v-card app class="mt-5">
        <v-col cols="12" sm="12">
          <v-row class="mx-5">
            <v-text-field
              v-model="authorName"
              label="Search by name"
            ></v-text-field>
            <v-btn text class="green--text btn-lg " @click="searchAuthor">
              <v-icon>search</v-icon>
            </v-btn>
          </v-row>

          <v-card class="mx-auto" tile>
            <v-card-title>Authors</v-card-title>

            <v-data-table
              :headers="authorheaders"
              :items="authors"
              v-model="selectedAuthor"
              disable-pagination
              show-select
              item-key="name"
              :single-select="singleSelect"
              :hide-default-footer="true"
            >
              <template v-slot:top>
                <v-layout wrap row>
                  <v-flex xs12 md3>
                    <v-switch
                      v-model="singleSelect"
                      label="Disable multiselect"
                      class="pa-3"
                    ></v-switch>
                  </v-flex>
                  <v-snackbar v-model="snackbar" :timeout="timeout">
                    {{ text }}

                    <template v-slot:action="{ attrs }">
                      <v-btn
                        class="green"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                      >
                        Close
                      </v-btn>
                    </template>
                  </v-snackbar>
                </v-layout>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <div
                  v-if="
                    authors.indexOf(selectedAuthor[0]) ==
                      authors.indexOf(item) && singleSelect
                  "
                >
                  <v-icon
                    class="red--text"
                    small
                    @click="deleteAuthor(item.selectedAuthor)"
                    >mdi-delete</v-icon
                  >
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-card>
    </div>
    <NotLogged v-else></NotLogged>
  </v-app>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import http from "@/http-common.js";
import NotLogged from "@/NotLogged";
export default {
  components: {
    AdminNavbar,
    NotLogged,
  },
  data() {
    return {
      name: "",
      isLogged: false,
      authorName: "",
      snackbar: false,
      singleSelect: true,
      timeout: 2000,
      text: "",
      selectedAuthor: [],
      authors: [
        { name: "minalbat bimeta", email: "email@email", phone: "251111111" },
        { name: "dinknew gosmie", email: "email@email", phone: "25111222222" },
      ],

      authorheaders: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveAuthors() {
      http
        .get("/api/authors")
        .then((response) => {
          this.authors = response.data.map(this.getDisplayAuthor);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchAuthor() {
      var form = new FormData();
      form.append("name", this.authorName);
      http
        .get("api/author/search", form)
        .then((response) => {
          this.authors = response.data.map(this.getDisplayAuthor);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteAuthor(author) {
      http
        .delete(author)
        .then(() => {
          this.retrieveAuthors();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayAuthor(author) {
      return {
        name: author.name,
        phone: author.phone,
        email: author.email,
      };
    },
  },
  created() {
    var storage = window.localStorage;
    if (
      storage.getItem("kitabToken") != null &&
      storage.getItem("kitabUserType") != null &&
      storage.getItem("kitabUserType") === "admin"
    ) {
      this.isLogged = true;
    }
  },
};
</script>
