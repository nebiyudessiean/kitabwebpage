<template>
<v-app>
    <v-card
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
  </div>
    </v-card>
</v-app>
  
</template>

<script>
import PublisherDataService from "@/services/PublisherDataService";
import UserInputRules from "@/views/UserInputRules.js";

export default {
  name: "publisher",
  data() {
    return {
      typePassword:true,
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
    getPublisher(id) {
      PublisherDataService.get(id)
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
      PublisherDataService.delete(this.currentPublisher.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "Publishers" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel(){
        this.$route.pop();
    }
  },
  mounted() {
   
    this.getPublisher(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: auto;
  margin: auto;
}
</style>