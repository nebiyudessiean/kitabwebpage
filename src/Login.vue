<template>
  <v-app>
   
    <v-card class="elevation-12 ma-auto mt-30% pa-5" height="auto" width="50%">
      <v-card-title dark class="purple white--text">Login Form</v-card-title>
      <v-select v-model="selectedUserType" class="mx-8" :items="userType" label="select user type"></v-select>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="account_circle"
            v-model="username"
            :counter="20"
            :rules="nameRules"
            label="username"
            required
            class="mt-5"
          ></v-text-field>

          <v-text-field
            prepend-icon="security"
            type="password"
            v-model="password"
          
            :counter="10"
            label="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions v-if="selectedUserType === 'admin' || !selectedUserType">
        <v-spacer></v-spacer>
        <v-btn dark color="primary" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn dark color="primary" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="green" @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
  import PasswordHash from "password-hash";
  
export default {
  components:{
   
  },

  data: () => ({
    
    userType: ["admin", "publisher", "author"],
    selectedUserType: "",
    valid: true,
    username: "",
    nameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 10) || "UserName must be less than 10 characters"
    ],
    password: "",
    
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // fetch("https://jsonplaceholder.typicode.com/posts", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     username: this.username,
        //     password: this.password,
        //     selectedUserType: this.selectedUserType
        //   }),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8"
        //   }
        // })
        //   .then(response => response.json())
        //   .then(json => console.log(json));

        // this.$router.push("/" + this.selectedUserType);
        console.log(this.password,PasswordHash.generate(this.password));

      }

      // this.$cookie.set("username", this.username, 1);
      // this.$cookie.set("userType", this.selectedUserType, 1);
      // this.$cookie.set("password", this.password, 1);
    },
    register() {
      this.$router.push("/register" + this.selectedUserType);
    }
  }
};
</script>
