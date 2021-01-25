<template>
  <v-card v-show="isAuthor">
    <v-app-bar dark color="blue" flat app>
      <v-btn rounded text to="/books">
        Books
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn rounded text to="/addbook">
        Add book
      </v-btn>
      <v-btn rounded text small to="/editAuthor">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn
        rounded
        text
        @click.prevent="logout"
        class="white--text blue"
        to="/login"
      >
        Logout
        <v-icon>
          mdi-exit-to-app
        </v-icon>
      </v-btn>
    </v-app-bar>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      isAuthor: false,
    };
  },
  methods: {
    logout() {
      const storage = window.localStorage;
      storage.removeItem("kitabUserType");
      storage.removeItem("kitabToken");
      // this.$router.push("/login");
    },
  },
  created() {
    var storage = window.localStorage;
    if (
      storage.getItem("kitabUserType") != null &&
      storage.getItem("kitabUserType") === "author"
    ) {
      this.isAuthor = true;
    }
  },
};
</script>
