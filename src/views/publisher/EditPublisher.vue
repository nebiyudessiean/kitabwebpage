<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30% pa-5" height="auto" width="50%">
      <v-card-title class="purple">
        Edit Author
      </v-card-title>
      <v-card-text>
        <v-form ref="editPublisherForm" @submit.prevent="submitForm">
          <v-text-field
            class="pt-5"
            prepend-icon="business"
            outlined
            type="text"
            :value="name"
            :rules="nameRules"
            label="Name of publisher"
          >
          </v-text-field>
          <v-text-field
            prepend-icon="call"
            outlined
            :value="phone"
            :rules="phoneRules"
            label="Phone number of publisher"
          >
          </v-text-field>
          <v-text-field
            prepend-icon="email"
            type="email"
            outlined
            :value="email"
            :rules="emailRules"
            label="Email of publisher"
          >
          </v-text-field>
          <v-text-field
            prepend-icon="location_on"
            type="text"
            outlined
            :value="location"
            :rules="locationRules"
            label="Location of publisher"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="success"> submit</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="error" @click="this.$router.push({ path: '/publisher' })"
          >cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      phoneRules: [
        (v) => !!v || "Phone number- is required",
        (v) => (v && v.length <= 10) || "phone must be less than 10 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          ) || "E-mail must be valid",
      ],
      locationRules: [
        (v) => !!v || "Address is required",
        (v) =>
          (v && v.length <= 10) || "Address must be less than 10 characters",
      ],
    };
  },
  props: {
    name: String,
    phone: String,
    email: String,
    location: String,
  },
  methods: {
    submitForm() {},
  },
};
</script>
