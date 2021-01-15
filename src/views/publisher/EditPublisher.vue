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
  <div v-if="currentPublisher" class="edit-form py-3">
    <p class="headline">Edit Publisher</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentPublisher.name"
        :rules="nameRules"
        prepend-icon="business"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentPublisher.email"
        :rules="emailRules"
        prepend-icon="email"
        label="Email"
        required
      ></v-text-field>
       <v-text-field
        v-model="currentPublisher.phone"
        :rules=" phoneRules"
        label="Phone"
        prepend-icon="call"
        required
      ></v-text-field>
       <v-text-field
        v-model="currentPublisher.address"
        :rules="addressRules"
        label="Address"
        prepend-icon="location_on"
        required
      ></v-text-field>
       <v-text-field
        v-model="currentPublisher.password"
        :rules="passwordRules"
        label="Password"
        :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        prepend-icon="security"
        required
      ></v-text-field>
       <v-text-field
        v-model="currentPublisher.password"
        :rules="confirmPasswordRules"
        label="Confirm password"
        :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        prepend-icon="security"
        required
      ></v-text-field>


      <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deletePublisher">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updatePublisher">
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
import PublisherDataService from "@/services/PublisherDataService";
import UserInputRules from "@/views/UserInputRules.js";
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
      currentPublisher: null,
      nameRules:UserInputRules.nameRules,
      emailRules:UserInputRules.emailRules,
      phoneRules:UserInputRules.phoneRules,
      passwordRules:UserInputRules.passwordRules,
      confirmPasswordRules:UserInputRules.confirmPasswordRules,
      addressRules:UserInputRules.addressRules
     
    };
  },
  methods: {
   
    getPublisher() {
       var storage=window.localStorage;
      PublisherDataService.get(storage.getItem("kitabToken"))
        .then((response) => {
          this.currentPublisher = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

   

    updateAuthor() {
      PublisherDataService.update(this.currentPublisher.id, this.currentPublisher)
        .then((response) => {
          console.log(response.data);
          this.message = "The publisher was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePublisher() {
      var storage=window.localStorage;

      PublisherDataService.delete(storage.getItem("kitabToken",this.currentPublisher.id))
        .then((response) => {
          console.log(response.data);
           })
        .catch(() => {
          console.log('Unable to connect');
        });
    },
    cancel(){
        this.$router.go(-1);
    }
  },
  mounted() {
   
    this.getPublisher();
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