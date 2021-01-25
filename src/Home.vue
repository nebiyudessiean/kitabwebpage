<template>
  <v-app>
    <v-container>
      <v-img src="./assets/images/b.jpg" class="pt-20%">
        <v-btn
          text
          class="display-2 white--text font-italic font-weight-bold "
          @click="login"
        >
          Login
        </v-btn>
      </v-img></v-container
    >
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      image: "./assets/images/b.jpg",
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
  created() {
    setInterval(() => {}, 3000);
  },
};
</script>
