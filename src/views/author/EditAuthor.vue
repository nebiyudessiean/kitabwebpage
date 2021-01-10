<template>
<v-app>
   <v-card
      class="elevation-12 ma-auto  mt-30% pa-5"
      height="autho"
      width="50%"
    >
    <v-card-title class="pink">
      Edit Author
    </v-card-title>
  <div v-if="currentAuthor" class="edit-form py-3">
    <p class="headline">Edit Author</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentAuthor.name"
        :rules="[
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ]"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentAuthor.email"
        :rules="[
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          ) || 'E-mail must be valid',
      ]"
        label="Email"
        required
      ></v-text-field>
       <v-text-field
        v-model="currentAuthor.phone"
        :rules=" [
        (v) => !!v || 'Phone number - is required',
        (v)=>/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/g.test(v)||'Enter valid phone number please',
        (v) => (v && v.length <= 13) || 'Phone must be less than 14 characters',
      ]"
        label="Phone"
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

  </v-app>
</template>

<script>
import AuthorDataService from "@/services/AuthorDataService";

export default {
  name: "author",
  data() {
    return {
      currentAuthor: null,
     
    };
  },
  methods: {
    getAuthor(id) {
      AuthorDataService.get(id)
        .then((response) => {
          this.currentAuthor = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

   

    updateAuthor() {
      AuthorDataService.update(this.currentAuthor.id, this.currentAuthor)
        .then((response) => {
          console.log(response.data);
          this.message = "The author was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteAuthor() {
      AuthorDataService.delete(this.currentAuthor.id)
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
   
    this.getAuthor(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: auto;
  margin: auto;
}
</style>