<template>
<v-app>
   <v-card
      class="elevation-12 ma-auto  mt-30% pa-5"
      height="autho"
      width="50%"
      v-if="isLogged"
    >
    <v-card-title class="pink">
      Edit Author
    </v-card-title>
  <div v-if="currentAuthor" class="edit-form py-3">
    <p class="headline">Edit Author</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentAuthor.name"
        :rules="nameRules"
        label="Name"
        required
        prepend-icon="person"
      ></v-text-field>

      <v-text-field
      prepend-icon="email"
        v-model="currentAuthor.email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>
       <v-text-field
       prepend-icon="call"
        v-model="currentAuthor.phone"
        :rules="phonedRules"
        label="Phone"
        required
      ></v-text-field>
       <v-text-field
       prepend-icon="security"
       :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        v-model="currentAuthor.password"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>
      <v-text-field
      prepend-icon="security"
        :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        v-model="currentAuthor.password"
        :rules="ConfirmPasswordRules"
        label="Confirm password"
        required
      ></v-text-field>



      <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deleteAuthor">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateAuthor">
        Update
      </v-btn>
      <v-btn class="error" @click="cancel">cancel</v-btn>
    </v-form>

    
  </div>
  <div
  v-else
  >
  <p>Unable to connect to server</p>
  </div>
   </v-card>
<NotLogged></NotLogged>
  </v-app>
</template>

<script>
import AuthorDataService from "@/services/AuthorDataService";
import UserInputRules from "@/views/UserInputRules";
import NotLogged from "@/NotLogged.vue"

export default {
  components:{
    NotLogged
  },
  name: "author",
  data() {
    return {
      typePassword:true,
      isLogged:false,
      currentAuthor: null,
      nameRules:UserInputRules.nameRules,
      emailRules:UserInputRules.emailRules,
      passwordRules:UserInputRules.passwordRules,
      confirmPasswordRules:UserInputRules.confirmPasswordRules,
      phonedRules:UserInputRules.phonedRules
     
    };
  },
  methods: {
    getAuthor() {
      const storage=window.localStorage
      var token=storage.getItem('kitabToken');
      AuthorDataService.getAuthorByToken(token)
        .then((response) => {
          this.currentAuthor = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

   

    updateAuthor() {
      const storage=window.localStorage
      var token=storage.getItem('kitabToken');
      AuthorDataService.update(token, this.currentAuthor)
        .then((response) => {
          console.log(response.data);
          this.message = "The author was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteAuthor() {
      const storage=window.localStorage
      var token=storage.getItem('kitabToken');
      AuthorDataService.delete(token ,this.currentAuthor.name)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "Authors" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel(){

    }
  },
  mounted() {
   
    this.getAuthor();
  },
  created(){
    var storage=window.localStorage;
    if (storage.getItem("kitabUserType")!=null&&storage.getItem("kitabToken")!=null) {
      this.isLogged=true;
    }
    

  }
};
</script>

<style>
.edit-form {
  max-width: auto;
  margin: auto;
}
</style>