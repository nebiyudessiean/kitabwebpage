<template>
  <v-app>
    <v-card
      class="elevation-12 ma-auto  mt-30% pa-5"
      height="autho"
      width="50%"
    >
      <v-card-title class="purple">
        Edit Author
      </v-card-title>
      <v-card-text>
        <v-form ref="editAuthorForm" @submit.prevent="submitForm">
          <v-text-field
            prepend-icon="account_circle"
            class="pt-5"
            outlined
            type="text"
            :value="name"
            :rules="nameRules"
            label="Name of Author"
          >
          </v-text-field>
          <v-text-field
            prepend-icon="call"
            type="number"
            outlined
            :value="phone"
            :rules="phoneRules"
            label="Phone number of Author"
          >
          </v-text-field>
          <v-text-field
            prepend-icon="email"
            type="email"
            outlined
            :value="email"
            :rules="emailRules"
            label="Email of Author"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary">submit</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="error">cancel</v-btn>
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
    };
  },
  props: {
    name: String,
    phone: String,
    email: String,
  },
  methods: {
    submitForm() {},
  },
};
</script>
