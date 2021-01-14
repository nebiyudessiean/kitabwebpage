<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30% pa-5" height="auto" width="50%">
      <v-card-title dark class="purple white--text">Login Form</v-card-title>
    
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="account_circle"
            v-model="username"
            :counter="20"
            label="username"
            required
            class="mt-5"
          ></v-text-field>

          <v-text-field
            prepend-icon="security"
            :type="typePassword?'password':'text'"
            :append-icon="typePassword ? 'visibility_off' : 'visibility'"
            @click:append="typePassword=!tyvpePassword"
            v-model="password"
            :counter="15"
            label="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      
      <v-card-actions >
        <v-btn dark color="primary" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="green" @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>

import http from "./http-common";

export default {
  components: {},

  data() {
    return{
    typePassword: true,
   
    valid: true,
    username: "",
     password: ""
    }
  },

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        var formData = new FormData();
        formData.append("uname", this.username);
        formData.append("passwd", this.password);
         http.post("/api/auth",formData).then((response)=>{
              console.log(response.data.token);
              const storage=window.localStorage;
              storage.setItem('kitabToken',response.data.token);
              storage.setItem('kitabUserType',this.selectedUserType);
              this.$router.push(this.selectedUserType===response.data.role?'/'+this.selectedUserType:'/login');
         }).catch(()=>{
         console.log("Invalid input");

         });
          
       
      }
    },
    register() {
      this.$router.push("/registration" );
    }
  }
};
</script>
