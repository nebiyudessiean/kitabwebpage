<template>
  <div v-if="!isLogged">
<PublisherNavbar/>
    <h1>This is the hompage of publisher</h1>
  </div>
  <div v-else>
 <p>Login first to access your account</p>
  </div>
</template>
<script>
import PublisherNavbar from "../../components/PublisherNavbar.vue";
export default {
  components: {
   PublisherNavbar
  },
  data() {
    return {
      isLogged: false,
    };
  },

  mounted() {
    // var userType = this.$cookie.get("userType");
    // var userName = this.$cookie.get("userName");
    // var password = this.$cookie.get("password");
    // this.isLogged =
    //   userName.isEmpty() && userType.isEmpty() && password.isEmpty();
  },
};
</script>
