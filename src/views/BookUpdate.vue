<template>
  <v-app>
    <div v-if="isLogged">
    <v-layout  align-center md8 justify-center="" >
      <v-flex lg6>
        <v-card class="pa-6" elevation="12">
          <v-card-title dark class="purple white--text">
            Book form
          </v-card-title>
          <v-form ref="bookform">
            <v-text-field
            :rules='[(v) => !!v || "Title of book - is required"]'
              prepend-icon="title"
              class="mt-3"
              label="Title of the book"
              required
              v-model="book.title"
              outlined
            >
            </v-text-field>
            <!-- <v-text-field
            :rules='[(v) => !!v || "Author of book - is required"]'
              prepend-icon="account_box"
              label="Author of  the book"
              required
              v-model="book.author"
              outlined
            >
            </v-text-field> -->
            <v-text-field
              prepend-icon="title"
              :rules='[(v) => !!v || "description for the book  - is required"]'
              v-model="book.description"
              outlined
              required
              label="Description"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="person"
              :rules='[(v) => !!v || "Price of book  - is required"]'
              v-model="book.price"
              outlined
              required
              label="Price of Book"
            >
            </v-text-field>
           

           
            <v-spacer></v-spacer>
            <!-- <v-menu
              v-model="showDialog"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="currentBook.publicationDate"
                  label="select publication date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  :rules='[(v) => !!v || "Publication date - is required"]'
                 
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="currentBook.publicationDate"
                @input="showDialog = false"
              
              ></v-date-picker>
            </v-menu> -->
            
          </v-form>
            <v-card-actions>
          <v-btn class="primary" @click="submitForm">submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="error" @click="cancel">cancel</v-btn>
        </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </div>
    <NotLogged v-else></NotLogged>
  </v-app>
</template>
<script >
  import BookDataService from "@/services/BookDataService"
  import NotLogged from "@/NotLogged.vue"
  import http from "@/http-common.js"

  export default{
    components:{
      NotLogged
    },
    data(){
      return {
        
       book:{},
        isLogged: false,
        thumbnail:'',
      }
    },
    methods:{
      getBookInfo(title){
       var form=new FormData();
      form.append('title',title)
      http.post("/api/content/search",form)
        .then(response => {
          this.book = response.data.map(book=>book);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      },
      onImagePicked(f){
        var file= f;
        if (file!== undefined) {
         
          if (file.name.lastIndexOf('.') <= 0) {
            return
          }
          console.log(file.name);
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            
           this.thumbnail=fr.result;

          })
        }
    },
    onFliePicked(f) {
    
       
        var file= f;
        if (file!== undefined) {
         
          if (file.name.lastIndexOf('.') <= 0) {
            return
          }
          console.log(file.name);
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            
           this.book.content=fr.result;
          })
        } 
    },
     submitForm(){
      var form=new FormData();
      form.append("title",this.book.title),
      form.append('author',this.book.author);
      // form.append('publicationDate',this.book.publicationDate)
      form.append('price',this.book.price)
      form.append("bookContent",this.book.content)
      form.append("imageContent",this.thumbnail)

      BookDataService.upload(form);
    },
    cancel(){
      this.$router.go(-1)
    }

    },
    created(){
      const storage=window.localStorage;
      if (storage.getItem("kitabToken")!=null&&storage.getItem('kitabUserType')!=null) {
        // this.getBookInfo(this.$params.title);
       // console.log(this.$params.title);
       console.log(this.$params.book)
               this.isLogged=true;
        
      }
      
    },
    mounted(){
        
      

    }
  }
</script>