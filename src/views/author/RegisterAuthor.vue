<template>
  <v-app>
    <v-card class="elevation-12  ma-auto mt-30% " height="auto" width="50%">
      <v-card-title dark class="blue lighten-2 white--text">
        Register Author
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="person"
            v-model="nameOfAuthor"
            :counter="10"
            :rules="nameRules"
            label="Name of Author"
            required
          ></v-text-field>

          <v-text-field
            type="number"
            prepend-icon="call"
            v-model="phone"
            label="Phone number"
            required
            :rules="phonedRules"
          >
          </v-text-field>
          <v-text-field
            prepend-icon="email"
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          >
          </v-text-field>
           <v-text-field
            prepend-icon="security"
             :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
            v-model="password"
          
            :counter="10"
            label="password"
            required
            :rules="passwordRules"
          ></v-text-field>
           <v-text-field
            prepend-icon="security"
             :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
            v-model="confirmPassword"
          :rules="confirmPasswordRules"
            :counter="10"
            label="Confirm password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-center>
          <v-btn class="primary">
            <span>submit</span>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import UserInputRules from "@/views/UserInputRules.js";
export default {
  data() {
    return {
      typePassword:true,
      valid: true,
      nameOfAuthor: "",
      nameRules: UserInputRules.nameRules,

      phone: "",
      phonedRules: UserInputRules.phonedRules,
      email: "",
      emailRules:UserInputRules.emailRules,
      confirmPassword:'',
      confirmPasswordRules:UserInputRules.confirmPasswordRules,
       password:'',
      passwordRules:UserInputRules.passwordRules,
    };
  },
};
</script>
