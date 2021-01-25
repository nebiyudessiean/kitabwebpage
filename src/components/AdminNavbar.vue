<template>
  <nav v-show="isAdmin">
    <v-card>
      <v-app-bar dark flat app>
        <v-btn text rounded to="/books">Books</v-btn>
        <v-spacer></v-spacer>

        <v-btn rounded text to="/publishers">Publishers</v-btn>
        <v-btn rounded text to="/authors">Authors</v-btn>

        <v-btn rounded text to="/updateAdminAccount">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-btn @click="logout" text>
          Logout
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isAdmin: false,
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
      storage.getItem("kitabUserType") === "admin"
    ) {
      this.isAdmin = true;
    }
  },
};
</script>
