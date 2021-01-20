<template>
  <v-app>
    <v-card class="elevation-12 ma-auto mt-30% pa-5" height="auto" width="50%">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="email"
            v-model="email"
            :counter="20"
            label="please enter email to get recovery code"
            required
            class="mt-5"
          ></v-text-field>
        </v-form>
      </v-card-text>
        <v-card-actions >
        <v-btn dark color="primary" @click="login">Send code</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
export default{
  data(){
    return {
      email:"",
    }
  }
}
</script>