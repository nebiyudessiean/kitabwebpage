<template>
  <v-app>
   
    <v-card class="elevation-12 ma-auto mt-30% pa-5" height="auto" width="50%">
      <v-card-title dark class="purple white--text">Login Form</v-card-title>
      <v-select :rules="userTypeRules" v-model="selectedUserType" class="mx-8" :items="userType" label="select user type"></v-select>
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
            :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
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
    typePassword:true,
    
    userType: ["admin", "publisher", "author"],
    selectedUserType: "",
  
    userTypeRules: [
      v => v.length>0 || "Please select user type first",
     
    ],
    valid: true,
    username: "",
    
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
 this.$cookie.set("username", this.username, 1);
      this.$cookie.set("userType", this.selectedUserType, 1);
      this.$cookie.set("password", PasswordHash.generate(this.password), 1);
     
this.$router.push("/" + this.selectedUserType);

 console.log(this.password,PasswordHash.generate(this.password));
 console.log(PasswordHash.verify(this.password,this.$cookie.get('password')));
     
        
       

      }

     
    },
    register() {
      this.$router.push("/register" + this.selectedUserType);
    }
  }
};
</script>
