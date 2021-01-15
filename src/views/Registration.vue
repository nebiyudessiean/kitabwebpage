<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30%" height="auto" width="50%">
      <v-card-title dark class="blue lighten-2 white--text">Register Author</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            :rules="userTypeRules"
            v-model="selectedAccountType"
            class="mx-8"
            :items="accountType"
            label="select account  type"
          ></v-select>
          <v-text-field
            prepend-icon="person"
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name "
            required
          ></v-text-field>

          <v-text-field
            type="number"
            prepend-icon="call"
            v-model="phone"
            label="Phone number"
            required
            :rules="phonedRules"
          ></v-text-field>
          <v-text-field
            prepend-icon="email"
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-if="selectedAccountType==='publisher'"
            prepend-icon="location_on"
            v-model="address"
            :rules="nameRules"
            label="address"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="security"
            :type="typePassword?'password':'text'"
            :append-icon="typePassword ? 'visibility_off' : 'visibility'"
            @click:append="typePassword=!typePassword"
            v-model="password"
            :counter="10"
            label="password"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="security"
            :type="typePassword?'password':'text'"
            :append-icon="typePassword ? 'visibility_off' : 'visibility'"
            @click:append="typePassword=!typePassword"
            v-model="confirmPassword"
            :counter="10"
            label="Confirm password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-center>
          <v-btn class="primary" @click="register">
            <span>submit</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="cancel">
            <span>Have account?</span>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import UserInputRules from "@/views/UserInputRules.js";

import AuthorDataService from "@/services/AuthorDataService";
export default {
  data() {
    return {
   
      accountType: ["publisher", "author"],
      selectedAccountType: "",
      typePassword: true,
      valid: true,
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",

      nameRules: UserInputRules.nameRules,
      userTypeRules: [v => v.length > 0 || "Please select user type first"],
      phonedRules: UserInputRules.phonedRules,
      emailRules: UserInputRules.emailRules,
      confirmPasswordRules: UserInputRules.confirmPasswordRules,
      passwordRules: UserInputRules.passwordRules
    };
  },
  methods: {
    register() {
      var form = new FormData();
      form.append("uname", this.name);
      form.append("pno", this.phone);
      form.append("email", this.email);
      form.append("role", this.selectedAccountType);
      form.append("passwd", this.password);

      AuthorDataService.create(form)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push("/login");
    }
  },
   created(){
   

  }
}
</script>
