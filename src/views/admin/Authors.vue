<template>
  <v-app>
    <AdminNavbar />
    <v-layout align-center justify-center>
      <v-col>
        <template v-for="author in authors">
          <v-card outlined :key="author.name">
            <v-row  class="px-auto">
         <v-spacer></v-spacer>
              <span>{{ author.name }}</span>
              <v-spacer></v-spacer>
              <span>{{ author.email }}</span>
              <v-spacer></v-spacer>
              <span>{{ author.phone }}</span>
              <v-spacer></v-spacer>
              <v-col>
                <v-btn icon>
                  <v-icon class="red--text">delete</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="
                    handleEdit($event, author.name, author.phone, author.email)
                  "
                >
                  <v-icon>create</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </template>
      </v-col>
    </v-layout>
  </v-app>
</template>
<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
      authors: [
        { name: "minalbat bimeta", email: "email@email", phone: "251111111" },
        { name: "dinknew gosmie", email: "email@email", phone: "25111222222" },
      ],
    };
  },
  methods: {
    handleEdit(event, name, phone, email) {
      this.$router.push({
        path: "/editauthor",
        query: { name, phone, email },
      });
    },
  },
};
</script>
