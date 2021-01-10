<template>
<v-card>
  <v-app-bar dark color="blue" flat app>
    <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
    <v-btn  rounded text to="/publisher">
      Home
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn rounded text to="/addbook">
      Add book
    </v-btn>

    <v-btn rounded  text @click="logout" class="white--text blue" to="/login">
      Logout
      <v-icon>
        mdi-exit-to-app
      </v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    app class="blue"
    v-model="drawer"
    >
    
    <v-list>
      <v-list-item to="/editPublisher">
        <v-list-item-avatar>
          <v-img
          src="../assets/logo.png"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item to="/editPublisher">
        <span class="white--text">email@email.com</span>
      </v-list-item>

    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-btn  text rounded class=" black white--text">Top rated books</v-btn>
      </v-list-item>
    </v-list>
    
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  data(){
    return{
      drawer:false
    }
  },
  methods: {
    logout() {
      this.$cookie.delete("userType");
      this.$cookie.delete("userName");
      this.$cookie.delete("password");
    },
  },
};
</script>
