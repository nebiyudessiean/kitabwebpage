<template>
  <v-app>
    <PublisherNavbar v-if="typeOfUser==='publisher'"></PublisherNavbar>
 <AuthorNavbar v-else-if="typeOfUser==='author'"></AuthorNavbar>
  <AdminNavbar v-else></AdminNavbar>
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
              <v-icon small class="mr-2" @click="editBook(item.title)">mdi-pencil</v-icon>
              <v-icon small @click="deleteBook(item.title)">mdi-delete</v-icon>
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
import PublisherNavbar from "@/components/PublisherNavbar";
import AuthorNavbar from "@/components/AuthorNavbar";
import AdminNavbar from "@/components/AdminNavbar";

export default {
  name: "BookList",
  components: {
    PublisherNavbar,
    AuthorNavbar,
    AdminNavbar
  },
  data() {
    return {
      typeOfUser:'',
      id: "",
      title: "",
      books: [
        {  title: "The title", author: "Auther 1", price: 20, sold: 30 },
        {  title: "The title1", author: "Auther 2", price: 40, sold: 50 }
      ],

      bookheaders: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Author", value: "author", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Sold", value: "sold", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
 
  methods: {
    retrieveBooks() {
      const storage=window.localStorage;
      var token=storage.getItem('kitabToken');
      BookDataService.getAll(token)
        .then(response => {
          this.books = response.data.map(this.getDisplayBook);
         
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBooks();
    },

    removeAllBooks() {
      BookDataService.deleteAll()
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

    editBook(title) {
      this.$router.push({ name: "BookUpdate", params: { title: title } });
    },

    deleteBook(title) {
      BookDataService.delete(title)
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    getDisplayBook(book) {
      return {
        title: book.title,
        price: book.price,
        author: book.author,
        sold: book.sold
      };
    }
  },
  mounted() {
    // this.retrieveBooks();
   
  },
  created(){
    const storage=window.localStorage;
    if (storage.getItem("kitabUserType")===''||storage.getItem('token')==='') {
      this.$router.push('/login');
    }
    this.typeOfUser=storage.getItem('kitabUserType');

  }
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>