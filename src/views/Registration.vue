<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30%" height="auto" width="50%">
      <v-card-title dark class="blue lighten-2 white--text"
        >Registration</v-card-title
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            :rules="userTypeRules"
            v-model="selectedAccountType"
            class="mx-8"
            :items="accountType"
            label="select account  type"
          ></v-select>
          <v-text-field
            prepend-icon="person"
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name "
            required
          ></v-text-field>
          <p v-if="usedUserInput === 'userName'" class="red--text">
            Username already taken.try another
          </p>
          <v-text-field
            :counter="10"
            prepend-icon="call"
            v-model="phone"
            label="Phone number"
            required
            :rules="phoneRules"
          ></v-text-field>
          <p v-if="usedUserInput === 'phone'" class="red--text">
            Phone number already taken try another
          </p>
          <v-text-field
            prepend-icon="email"
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <p v-if="usedUserInput === 'email'" class="red--text">
            Email already taken try another
          </p>
          <!--   <v-text-field
            v-if="selectedAccountType==='publisher'"
            prepend-icon="location_on"
            v-model="address"
            :rules="nameRules"
            label="address"
            :count="15"
            required
          ></v-text-field> -->
          <v-text-field
            prepend-icon="security"
            :type="typePassword ? 'password' : 'text'"
            :append-icon="typePassword ? 'visibility_off' : 'visibility'"
            @click:append="typePassword = !typePassword"
            v-model="password"
            :counter="10"
            label="password"
            required
          ></v-text-field>
          <v-file-input
            type="file"
            accept="image/*"
            required
            label="Upload image for profile"
            @change="onImagePicked"
            :rules="[(v) => !!v || 'Image - is required']"
          ></v-file-input>
          <p v-if="invalidImage" class="error">Please select valid image</p>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-center>
          <v-btn class="primary" @click="register">
            <span>submit</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="cancel">
            <span>Have account?</span>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import UserInputRules from "@/UserInputRules";
import http from "@/http-common";
export default {
  data() {
    return {
      accountType: ["publisher", "author"],
      errorMessage: "",
      usedUserInput: "",
      selectedAccountType: "",
      typePassword: true,
      valid: false,
      invalidImage: false,
      name: "",
      email: "",
      phone: "",
      password: "",

      address: "",
      profile: null,
      nameRules: UserInputRules.nameRules,
      userTypeRules: [(v) => v.length > 0 || "Please select user type first"],
      phoneRules: UserInputRules.phoneRules,
      emailRules: UserInputRules.emailRules,
      confirmPasswordRules: UserInputRules.confirmPasswordRules,
      passwordRules: UserInputRules.passwordRules,
    };
  },
  methods: {
    onImagePicked(f) {
      var file = f;
      let arr = file.name.split(".");

      if (arr.length <= 1 || arr[1] != "PNG") {
        this.invalidImage = true;
        this.valid = false;
      } else {
        this.profile = file;
        this.valid = true;
        this.invalidImage = false;
      }
    },
    register() {
      if (this.$refs.form.validate()) {
        var form = new FormData();
        form.append("uname", this.name);
        form.append("pno", this.phone);
        form.append("email", this.email);
        form.append("role", this.selectedAccountType);
        form.append("passwd", this.password);
        form.append("image", this.profile);

        http
          .post("/api/register", form)
          .then((response) => {
            if (response.status == 200) {
              this.$router.push("/login");
            }
          })
          .catch((error) => {
            console.log(error);

            if (error.body.attribute === "email") {
              this.usedUserInput = "email";
            } else if (error.attribute === "phone") {
              this.usedUserInput = "phone";
            } else {
              this.usedUserInput = "userName";
            }
          });
      }
    },
    cancel() {
      this.$router.push("/login");
    },
  },
  created() {},
};
</script>
