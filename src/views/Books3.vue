<template>
  <v-app>
    <div v-if="isLogged">
  <PublisherNavbar v-if="typeOfUser==='publisher'"></PublisherNavbar>
 <AuthorNavbar v-else-if="typeOfUser==='author'"></AuthorNavbar>
  <AdminNavbar v-else-if="typeOfUser==='amdin'"></AdminNavbar>
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8">
        <v-text-field v-model="search"  label="Search by Title"></v-text-field>
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
            v-model="selectedBook"
            disable-pagination
            show-select
            item-key="title"
           :single-select="singleSelect"
            :hide-default-footer="true"
          >
           <template v-slot:top>
            <v-layout wrap row >
              <v-flex
              xs12 md3          
              >
                <v-switch
                  v-model="singleSelect"
                  label="Disable multiselect"
                  class="pa-3"
                ></v-switch>
            </v-flex>
               <v-flex xs12 md3>
                <v-dialog v-model="bookDialog" max-width="800px">
    
                  <v-card>
                    <v-card-title>
                      <span class="headline">"Book modification"</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form
                        enctype="multipart/form-data"
                        v-model="checkBoookValidity"
                      >
                      <p>book update failed</p>
                         <v-layout row wrap justify-space-around>
                          <v-text-field
            :rules='[(v) => !!v || "Title of book - is required"]'
              prepend-icon="title"
              class="mt-3"
              label="Title of the book"
              required
              v-model="title"
              outlined
            >
            </v-text-field>
            <v-text-field
              prepend-icon="title"
              :rules='[(v) => !!v || "description for the book  - is required"]'
              v-model="description"
              outlined
              required
              label="Description"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="person"
              :rules='[(v) => !!v || "Price of book  - is required"]'
              v-model="price"
              outlined
              required
              label="Price of Book"
            >
            </v-text-field>         
            <v-spacer></v-spacer>        
                        </v-layout>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn class="primary" @click="updateBook">
                        Update book
                      </v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-flex>
            </v-layout>
             
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <div v-if="books.indexOf(selectedBook[0])==books.indexOf(item) && singleSelect">
              <v-icon small class="mr-2" @click="editBook(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteBook(item.selectedBook)">mdi-delete</v-icon>
              </div>
            </template>

          </v-data-table>

          
        </v-card>
      </v-col>
    </v-row>
    </div>
    <NotLogged v-else></NotLogged>
  </v-app>
</template>

<script>
import http from "@/http-common.js"
import PublisherNavbar from "@/components/PublisherNavbar";
import AuthorNavbar from "@/components/AuthorNavbar";
import AdminNavbar from "@/components/AdminNavbar";
import NotLogged from "@/NotLogged.vue";

export default {
  name: "BookList",
  components: {
    PublisherNavbar,
    AuthorNavbar,
    AdminNavbar,
    NotLogged
  },
  data() {
    return {
      typeOfUser:'',
      checkBoookValidity:false,

      bookDialog:false,
      isLogged:false,
      selectedBook:[],
      singleSelect:true,
      title:'',
      description:'',
      price:0,
      id: "",
      search: "",

      books: [
        {  title: "The title", author: "Auther 1", price: 20, sold: 30,rate:0,avgRate:0,description:'desc1',id:1 },
        {  title: "The title1", author: "Auther 2", price: 40, sold: 50 ,rate:0,avgRate:0,description:'desc2',id:2}
      ],

      bookheaders: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Author", value: "author", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Sold", value: "sold", sortable: false },
        { text: "Rating", value: "rate", sortable: false },
        { text: "Average Rating", value: "avgRate", sortable: false },
        { text: "Description", value: "description", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
 
  methods: {
    updateBook(){
       var form=new FormData();
      form.append("title",this.title),
      form.append('description',this.description);
      form.append('price',this.price)
      http.post('/api/content/update',form).then(response=>{
        console.log(response);
      }).catch(()=>{

      })

    },
    retrieveBooks() {
      const storage=window.localStorage;
      var token=storage.getItem('kitabToken');
      var form=new FormData();
      form.append('token',token)
      http.post('/api/content/byme',form)
        .then(response => {
          
         this.books = response.data.map(book=>this.getDisplayBook(book));
         
         // response.data.map(e=>console.log(JSON.parse(e).title))
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBooks();
    },


    searchTitle() {
      var form=new FormData();
      form.append('title',this.Search)
      http.post("/api/content/search",form)
        .then(response => {
          this.books = response.data.map(book=>this.getDisplayBook(book));
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    editBook(item) {
      this.bookDialog=true;
      alert(item.id)
      this.title=this.selectedBook[0].title;
      this.price=this.selectedBook[0].price;
      this.description=this.selectedBook[0].description;

    },


    deleteBook(title) {
      http.delete(title)
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
        sold: book.download,
        description:book.description,
        rate:book.rate,
        avgRate:book.avg_rating
      };
    }
  },
  mounted() {
    // this.retrieveBooks();
   
  },
  created(){
    var storage=window.localStorage;
    if (storage.getItem("kitabUserType")!=null&&storage.getItem("kitabToken")!=null) {
      this.isLogged=true;
      this.typeOfUser=storage.getItem('kitabUserType');
      this.retrieveBooks();
    }
    

  }
 
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>