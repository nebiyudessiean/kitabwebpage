<template>
  <v-app v-if="!isLogged">
    <AdminNavbar />
    <h1>This is the hompage of Admin</h1>
  </v-app>
  <v-app v-else>
    <h1>you have logged out</h1>
  </v-app>
</template>
<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
      isLogged: false,
    };
  },

  // created() {
  //   var userType = this.$cookie.get("userType");
  //   var userName = this.$cookie.get("userName");
  //   var password = this.$cookie.get("password");
  //   this.isLogged =
  //     userName.isEmpty() && userType.isEmpty() && password.isEmpty();
  // },
};
</script>
