<template>
<v-app>
  <div v-if="isLogged">
    <v-card
      class="elevation-12 ma-auto  mt-30% pa-5"
      height="autho"
      width="50%"
    >
    <v-card-title class="pink">
    Edit your profile
    </v-card-title>
  <div  v-if="userName" class="edit-form py-3">
    <p class="headline">Edit your profile</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="userName"
        :rules="nameRules"
        prepend-icon="business"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        prepend-icon="email"
        label="Email"
        required
      ></v-text-field>
       <v-text-field
        v-model="phone"
        :rules=" phoneRules"
        label="Phone"
        prepend-icon="call"
        required
      ></v-text-field>
       <v-text-field
        v-model="address"
        :rules="addressRules"
        label="Address"
        prepend-icon="location_on"
        required
      ></v-text-field>
       <v-text-field
        v-model="password"
        
        label="Password"
        :type="typePassword?'password':'text'"
           :append-icon="typePassword ? 'visibility_off' : 'visibility'"
          @click:append="typePassword=!typePassword"
        prepend-icon="security"
        required
      ></v-text-field>
      


      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-btn color="error" small class="mr-2" @click="deletePublisher">
        Delete
      </v-btn>
<v-spacer></v-spacer>
      <v-btn color="success" small @click="updatePublisher">
        Update
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="warning" @click="cancel">cancel</v-btn>
      </v-row>
    </v-form>
  </div>
  <div
  v-else
  >
  <p>Unable to connect to server</p>
  </div>
  </v-card>
  </div>
</v-app>
  
</template>

<script>
import http from "@/http-common";
import UserInputRules from "@/UserInputRules.js";
// import NotLogged from "@/NotLogged.vue";
export default {
  name: "publisher",
  components:{
    // NotLogged
  },
  data() {
    return {
      typePassword:true,
      userName:'',
      email:'',
      phone:'',
      password:'',
      address:'',
      isLogged:false,
      token:'',
      nameRules:UserInputRules.nameRules,
      emailRules:UserInputRules.emailRules,
      phoneRules:UserInputRules.phoneRules,
      passwordRules:UserInputRules.passwordRules,
      confirmPasswordRules:UserInputRules.confirmPasswordRules,
      addressRules:UserInputRules.addressRules
     
    };
  },
  methods: {
   

   

    updatePublisher() {
      if (this.$refs.form.validate()) {
         var form = new FormData();
         const storage=window.localStorage;
         var token=storage.getItem('kitabToken');
      form.append("uname", this.name);
      form.append("pno", this.phone);
      form.append("email", this.email);
      form.append("role", 'publisher');
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

    deletePublisher() {
      const storage=window.localStorage
      var token=storage.getItem('kitabToken');
      const form=new FormData();
      form.append('token',token);

      http.post(token)
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
    // this.getPublisher();
     
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
}
</script>

<style>
.edit-form {
  max-width: auto;
  margin: auto;
}
</style>