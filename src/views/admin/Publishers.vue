<template>
  <v-app>
    <AdminNavbar />
    <v-layout align-center justify-center>
      <v-col>
        <template v-for="publisher in publishers">
          <v-card outlined :key="publisher.name">
            <v-row class="px-auto">
              <v-spacer></v-spacer>
              <span >{{ publisher.name }}</span>
              <v-spacer></v-spacer>
              <span>{{ publisher.address }}</span>
              <v-spacer></v-spacer>
              <span>{{ publisher.phone }}</span>
              <v-spacer></v-spacer>
              <span>{{ publisher.email }}</span>
              <v-spacer></v-spacer>
              <v-col>
                <v-btn icon>
                  <v-icon class="red--text">mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="
                    handleDelete(
                      $event,
                      publisher.name,
                      publisher.phone,
                      publisher.email,
                      publisher.address
                    )
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
      publishers: [
        {
          name: "Mega",
          address: "Addis Ababa",
          phone: "+251111111",
          email: "email@email.com",
        },
        {
          name: "Aster nega",
          address: "Addis Ababa",
          phone: "+25111222222",
          email: "email@email.com",
        },
      ],
    };
  },
  methods: {
    handleDelete(event, name, phone, email, location) {
      this.$router.push({
        path: "/editpublisher",
        query: { name, phone, email, location },
      });
    },
  },
};
</script>
