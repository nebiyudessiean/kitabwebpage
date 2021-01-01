<template>
  <div v-if="!isLogged">
<AuthorNavbar/>
    <h1>This is the hompage of author</h1>
  </div>
  <div v-else>
    <h1>you have logged out</h1>
  </div>
</template>
<script>
import AuthorNavbar from "../../components/AuthorNavbar.vue";
export default {
  components:{
AuthorNavbar
  },
  data() {
    return {
      isLogged: false,
    };
  },

  created() {
    // var userType = this.$cookie.get("userType");
    // var userName = this.$cookie.get("userName");
    // var password = this.$cookie.get("password");
    // this.isLogged =
    //   userName.isEmpty() && userType.isEmpty() && password.isEmpty();
  },
};
</script>
