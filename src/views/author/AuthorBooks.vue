<template>
  <v-app>
    <AuthorNavbar></AuthorNavbar>
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8">
        <v-text-field v-model="title" label="Search by Title"></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn small @click="searchTitle">Search</v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Books</v-card-title>

          <v-data-table
            :headers="bookheaders"
            :items="books"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editBook(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="deleteBook(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <v-card-actions v-if="books.length > 0">
            <v-btn small color="error" @click="removeAllBooks">Remove All</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import BookDataService from "@/services/BookDataService";
import AuthorNavbar from "@/components/AuthorNavbar";
export default {
  name: "BookList",
  components: {
    AuthorNavbar
  },
  data() {
    return {
      id: "",
      title: "",
      books: [
        { id: "", title: "The title", author: "Auther 1", price: 20, sold: 30 },
        { id: "", title: "The title1", author: "Auther 2", price: 40, sold: 50 }
      ],

      bookheaders: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Author", value: "author", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    retrieveBooks() {
      BookDataService.getAll(this.id)
        .then(response => {
          this.books = response.data.map(this.getDisplayBook);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBooks();
    },

    removeAllBooks() {
      BookDataService.deleteAll(this.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      BookDataService.findByTitle(this.title)
        .then(response => {
          this.books = response.data.map(this.getDisplayBook);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    editBook(id) {
      this.$router.push({ name: "BookUpdate", params: { id: id } });
    },

    deleteBook(id) {
      BookDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    getDisplayBook(book) {
      return {
        id: book.id,
        title: book.title,
        price: book.price,
        author: book.author,
        sold: book.sold
      };
    }
  },
  mounted() {
    // this.retrieveBooks();
  }
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>