<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30%" height="auto" width="50%">
      <v-card-title dark class="blue lighten-2 white--text">
        Register publisher
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="business"
            v-model="nameOfPublisher"
            :counter="10"
            :rules="nameRules"
            label="Name of publisher"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="location_on"
            v-model="address"
            label="address"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="call"
            v-model="phone"
            :rules="phoneRules"
            label="Phone number"
            required
            type="tel"
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
            v-model="password"
          :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
            :counter="10"
            label="password"
            required
          ></v-text-field>
           <v-text-field
            prepend-icon="security"
            
            v-model="confirmPassword"
            :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
            :counter="10"
            label="Confirm password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-center>
          <v-btn class="primary" @click="registerPublisher">
            <span>Submit</span>
          </v-btn>
          
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import UserInputRules from "@/views/UserInputRules.js"
import PasswordHash from "password-hash";
import PublisherDataService from "@/services/PublisherDataService";
export default {
  data() {
    return {
     
      value:String,
      typePassword:true,
      nameOfPublisher: "",
      nameRules: UserInputRules.nameRules,
      address: "",
      addressdRules: UserInputRules.addressdRules,
      phone: "",
      phoneRules:UserInputRules.phoneRules,
      email: "",
      emailRules:UserInputRules.emailRules,
      password:'',
      passwordRules:UserInputRules.passwordRules,
    };
  },
  methods:{
    registerPublisher(){
      var data={
        nameOfPublisher:this.nameOfPublisher,
        phone:this.phone,
        email:this.email,
        address:this.address,
        password:PasswordHash.generate(this.password),
      };
      PublisherDataService.create(data)
        .then((response) => {
          this.author.id = response.data.id;
          console.log(response.data);
         
        })
        .catch((e) => {
          console.log(e);
        });
    

    }
  }
};
</script>
