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
            type="password"
            v-model="password"
          
            :counter="10"
            label="password"
            required
          ></v-text-field>
           <v-text-field
            prepend-icon="security"
            type="password"
            v-model="password"
          
            :counter="10"
            label="Confirm password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-center>
          <v-btn class="primary" @click="register">
            <span>Submit</span>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      nameOfPublisher: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      address: "",
      addressdRules: [
        (v) => !!v || "Address- is required",
        (v) =>
          (v && v.length <= 10) || "Address must be less than 10 characters",
      ],
      phone: "",
      phoneRules: [
        (v) => !!v || "Phone number - is required",
        (v)=>/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/g.test(v)||"Enter valid phone number please",
        (v) => (v && v.length <= 13) || "Phone must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          ) || "E-mail must be valid",
      ],
      password:'',
      passwordRulse:[
      v => !!v || "Username is required",
      v => /\d[a-z][A-Z][!@#$%^&*)(+=._-]/.test(v) || "Enter stronger password",
      v => (v && v.length <= 10) || "UserName must be less than 10 characters"
    ],
    };
  },
  methods:{
    register(){
    if(this.$refs.form.validate()){
        this.$router.push("/login");
    }
    }
  }
};
</script>
