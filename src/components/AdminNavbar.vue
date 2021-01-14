<template>
<nav>
  <v-card>
    <v-app-bar dark flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text rounded to="/admin" >Home</v-btn>
      <v-btn text rounded to="/books" >Books</v-btn>
      <v-spacer></v-spacer>

      <v-btn rounded text to="/publishers">Publishers</v-btn>
      <v-btn rounded text to="/authors">Authors</v-btn>
      <v-btn @click="logout" text>
        Logout
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
     
    </v-app-bar>
    <v-navigation-drawer
    app class="black"
    v-model="drawer"
    >
    
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
          src="../assets/logo.png"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item to="#">
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
  </nav>

 
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
     
    };
  },
  methods: {
    logout() {
      this.$router.push('/login');
    }
  }
};
</script>
