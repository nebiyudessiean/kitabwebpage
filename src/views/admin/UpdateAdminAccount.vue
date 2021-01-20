<template>
<v-app>
    <v-card v-if="isLogged"
      class="elevation-12 ma-auto  mt-30% pa-5"
      height="autho"
      width="50%"
    >
    <v-card-title class="pink">
      Edit publisher
    </v-card-title>
  <div v-if="admin" class="edit-form py-3">
    <p class="headline">Modify your account</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="admin.userName"
        :rules="nameRules"
        prepend-icon="account_circle"
        label="Usernamee"
        required
      ></v-text-field>
       <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        prepend-icon="security"
        required
      ></v-text-field>
       <v-divider class="my-5"></v-divider>
       <v-btn color="success" small @click="updateAdmin">
        Update
      </v-btn>
      <v-btn class="error" @click="cancel">cancel</v-btn>
    </v-form>

    
  </div>
  <div v-else>
      <p>Unable to connect to server</p>
      <v-btn class="error" @click="cancel">Cancel</v-btn>
  </div>
  </v-card>
  <NotLogged v-else></NotLogged>
</v-app>
  
</template>

<script>
import http from "@/http-common";
import UserInputRules from "@/UserInputRules.js";
import NotLogged from "@/NotLogged.vue";
export default {
  name: "publisher",
  components:{
    NotLogged
  },
  data() {
    return {
      typePassword:true,
      isLogged:false,
      password:'',
      admin: null,
      nameRules:UserInputRules.nameRules,
      passwordRules:UserInputRules.passwordRules,
         
     
    };
  },
  methods: {
   
    adminInfo() {
       var storage=window.localStorage;
      http.get(storage.getItem("kitabToken"))
        .then((response) => {
          this.admin = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

   

    updateAdmin() {
      http.update(this.currentPublisher.id, this.currentPublisher)
        .then((response) => {
          console.log(response.data);
          this.message = "The publisher was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

   
    cancel(){
        this.$router.go(-1);
    }
  },
  mounted() {
   
    this.adminInfo();
  },
  created(){
    var storage=window.localStorage;
    if (storage.getItem("kitabUserType")!=null&&storage.getItem("kitabToken")!=null) {
      this.isLogged=true;
    }
}
}
</script>

<style>
.edit-form {
  max-width: auto;
  margin: auto;
}
</style>