<template>
  <v-app>
    <v-layout align-center md8 justify-center="">
      <v-flex lg6>
        <v-card class="pa-6" elevation="12">
          <v-card-title dark class="purple white--text">
            Book form
          </v-card-title>
          <v-form ref="bookform">
            <v-text-field
              prepend-icon="title"
              class="mt-3"
              label="Title of the book"
              required
              v-model="titleOfBook"
              outlined
            >
            </v-text-field>
            <v-text-field
              prepend-icon="account_box"
              label="Author of  the book"
              required
              v-model="authorOfBook"
              outlined
            >
            </v-text-field>
            <v-text-field
              prepend-icon="request_quote"
              v-model="price"
              outlined
              required
              label="price of book"
            >
            </v-text-field>
            <v-file-input
              outlined
              accept="document/pdf"
              required
              label="Book content"
              prepend-icon=""
            >
            </v-file-input>
            <v-spacer></v-spacer>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="select publication date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
            <v-btn class="primary" @click="submitBook">submit</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      titleOfBook: "",
      authorOfBook: "",
      price: 0,
      menu2: false,
      date: "",

      publicationDate: null,
    };
  },

  methods: {
    submitBook() {
      alert(
        "The book writen " +
          this.titleOfBook +
          "Written by " +
          this.authorOfBook +
          " on " +
          this.date +
          " is about $" +
          this.price
      );
    },
  },
};
</script>
