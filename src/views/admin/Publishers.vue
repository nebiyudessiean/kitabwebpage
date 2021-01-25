<template>
  <v-app>
    <div v-if="isLogged">
      <AdminNavbar></AdminNavbar>
      <v-card app class="mt-5">
        <v-col cols="12" sm="12">
          <v-row class="mx-5">
            <v-text-field
              v-model="publisherName"
              label="Search by name"
            ></v-text-field>
            <v-btn text class="green--text btn-lg " @click="searchPublisher">
              <v-icon>search</v-icon>
            </v-btn>
          </v-row>

          <v-card class="mx-auto" tile>
            <v-card-title>Publishers</v-card-title>

            <v-data-table
              :headers="publisherheaders"
              :items="publishers"
              v-model="selectedPublisher"
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
                    publishers.indexOf(selectedPublisher[0]) ==
                      publishers.indexOf(item) && singleSelect
                  "
                >
                  <v-icon
                    class="red--text"
                    small
                    @click="deletePublisher(item.selectedPublisher)"
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
      isLogged: false,
      publisherName: "",
      selectedPublisher: [],
      singleSelect: true,
      snackbar: false,
      timeout: 2000,
      publishers: [
        {
          name: "Mega",
          email: "emai1l@email",
          phone: "251111111",
          address: "Addis Ababa1",
        },
        {
          name: "Aster nega",
          email: "email@email",
          phone: "25111222222",
          address: "Addis Ababa",
        },
      ],
      name: "",
      publisherheaders: [
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
      http
        .get("/api/authors")
        .then((response) => {
          this.publishers = response.data.map(this.getDisplayPublisher);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchPublisher() {
      var form = new FormData();
      form.append("name", this.publisherName);
      http
        .get("/api/publisher/search", form)
        .then((response) => {
          this.publishers = response.data.map(this.getDisplayPublisher);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePublisher(publisher) {
      http
        .delete(publisher)
        .then(() => {
          this.retrievePublishers();
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
        phone: publisher.phone,
        address: publisher.address,
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
