<template>
  <v-app>
    <v-card class="elevation-12 mx-auto my-auto  " width="70%" height="auto">
      <v-card-text>
        <v-img src="./assets/images/read.jpg" height="auto"> </v-img>

        <h1 class="mt-6">
          Log into your account or create one if u haven't
        </h1>
      </v-card-text>

      <v-card-actions class="mt-12">
        <v-btn
          rounded
          class="display-2 green mx-auto font-weight-bold "
          @click="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
export default {
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
