<template>
<v-app>
  <div v-if="isLogged">
   <v-card
      class="elevation-12 ma-auto  mt-30% pa-5"
      height="autho"
      width="50%"
      v-if="isLogged"
    >
    <v-card-title class="pink">
      Edit Author
    </v-card-title>
  <div v-if="userName" class="edit-form py-3">
    <p class="headline">Edit Author</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="userName"
        :rules="nameRules"
        label="Name"
        required
        prepend-icon="person"
      ></v-text-field>

      <v-text-field
      prepend-icon="email"
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>
       <v-text-field
       prepend-icon="call"
        v-model="phone"
        :rules="phonedRules"
        label="Phone"
        required
      ></v-text-field>
       <v-text-field
       prepend-icon="security"
       :type="typePassword?password:text"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        v-model="password"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>
      
     <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deleteAuthor">
        Delete
      </v-btn>

      <v-btn color="success" s mall @click="updateAuthor">
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
   </div>
<NotLogged v-else></NotLogged>
  </v-app>
</template>

<script>

import UserInputRules from "@/UserInputRules";
import NotLogged from "@/NotLogged.vue"
import http from "@/http-common";

export default {
  components:{
    NotLogged
  },
  name: "author",
  data() {
    return {
      typePassword:true,
      userName:'',
      phone:'',
      email:'',
      password:'',
      isLogged:false,
      isAuthor:false,
      currentAuthor: null,
      nameRules:UserInputRules.nameRules,
      emailRules:UserInputRules.emailRules,
      passwordRules:UserInputRules.passwordRules,
      phonedRules:UserInputRules.phonedRules
     
    };
  },
  methods: {
    
    updateAuthor() {
     if (this.$refs.form.validate()) {
         var form = new FormData();
         const storage=window.localStorage;
         var token=storage.getItem('kitabToken');
      form.append("uname", this.name);
      form.append("pno", this.phone);
      form.append("email", this.email);
      form.append("role", 'author');
      form.append("passwd", this.password);
      form.append("image",this.profile);
      form.append('token',token);

      http.post("/api/user/update", form)
        .then(response => {
          if (response.status==200) {
            this.$router.push("/login")
          }
        })
        .catch((error)=>{
          console.log(error)
        }
      );
        
      }
    },

    deleteAuthor() {
      const storage=window.localStorage
      var token=storage.getItem('kitabToken');
      http.delete(token)
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
 
  created(){
   var storage=window.localStorage;
    var token=storage.getItem('kitabToken');
    if (token!=null) {
    this.isLogged=true;
    var form=new FormData();
    form.append('token',token);
    http.post('/api/user/get',form).then(response=>{
    this.userName=response.data.user_name;
    this.email=response.data.email;
    this.phone=response.data.pno;
    console.log(response)
    }).catch(()=>{
      console.log("unableto connect")

    })
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