<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30% pa-5" height="auto" width="50%">
      <v-card-title dark class="purple white--text">Login Form</v-card-title>
       
        <v-select
                  v-model="userNamePhoneOrEmail"
                  :items="userNamePhoneOrEmailChoices"
                  class="mx-8"
                  label="Login with"
                 :rules='[(v) => !!v || "Please Select one"]'
                 >    

          </v-select>
      <v-card-text>
        <v-form ref="form" lazy-validation>
              <v-text-field
                    :prepend-icon="iconType"
                    v-model="username"
                    :counter="20"
                    :rules='rule'
                    label="username"
                    required
                    class="mt-5">
               </v-text-field>
              <v-text-field
                    prepend-icon="security"
                    :type="typePassword?'password':'text'"
                    :append-icon="typePassword ? 'visibility_off' : 'visibility'"
                    @click:append="typePassword=!typePassword"
                    v-model="password"
                    :counter="15"
                    label="password"
                    required>
          </v-text-field>
          <p v-if="errorMessaage" class="red--text">please enter the correct credentials</p>
        </v-form>
      </v-card-text>
      
      <v-card-actions >
        <v-col>
        <v-row>
        <v-btn dark color="primary" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="green" @click="register">Register</v-btn>
        </v-row>
        <v-spacer></v-spacer>
        <v-layout align-center="true" justify-center>
         
          <v-btn dark color="green" @click="forgotPassword">Forgot password?</v-btn>
        </v-layout>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>

import http from "./http-common";
import UserInputRules from "@/UserInputRules";
export default {
  components: {},

  data() {
    return{
    typePassword: true,
    errorMessaage:false,
    email:'',
    phone:'',
    rule:this.userNameRules,
    username: "",
    password: "",
    userNamePhoneOrEmail:'',
    iconType:'account_circle',   
    userNamePhoneOrEmailChoices:['email','phone','userName'],
    phoneRules:UserInputRules.phoneRules,
    emailRules:UserInputRules.emailRules,
    userNameRules:UserInputRules.userNameRules
   
    }
  },

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        var formData = new FormData();
        if (this.userNamePhoneOrEmail==='phone') {
          formData.append("uname", this.username);
        }
        else if(this.userNamePhoneOrEmail==='email'){
           formData.append("email", this.email);
        }
        else{
           formData.append("pno", this.phone);
        }
       
        formData.append("passwd", this.password);
              http.post("/api/auth",formData).then((response)=>{
              console.log(response.data.token);
              const storage=window.localStorage;
              storage.setItem('kitabToken',response.data.token);
              storage.setItem('kitabUserType',response.data.role);
              console.log(response);
              
              this.errorMessaage=false;
              this.$router.push("/"+response.data.role);
         }).catch((error)=>{
         this.errorMessaage=true;
         console.log(error);

         });
          
       
      }
    },
    register() {
      this.$router.push("/registration" );
    },
    forgotPassword(){
      this.$router.push("forgotPassword");
    }
  },
  watch:{
    userNamePhoneOrEmail:function (value) {
      if (value==='phone') {
        this.iconType='call';
        this.rule=this.phoneRules
      }
      else if(value==='userName'){
        this.iconType='account_circle'
        this.rule=this.userNameRules
      }
      else{
        this.iconType='email'
        this.rule=this.emailRules
      }
    }
  }
};
</script>
