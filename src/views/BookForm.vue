<template>
  <v-app>
    <v-layout align-center md8 justify-center="">
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
              v-model="titleOfBook"
              outlined
            >
            </v-text-field>
            <v-text-field
            :rules='[(v) => !!v || "Author of book - is required"]'
              prepend-icon="account_box"
              label="Author of  the book"
              required
              v-model="authorOfBook"
              outlined
            >
            </v-text-field>
            <v-text-field
              prepend-icon="request_quote"
              :rules='[(v) => !!v || "Price of book  - is required"]'
              v-model="price"
              outlined
              required
              label="price of book"
            >
            </v-text-field>
            <v-file-input
            type="file"
              
              accept="application/pdf"
              required
             
              label="Book content"
              @change="onFliePicked"
             :rules='[(v) => !!v || "Book content  - is required"]'
             ></v-file-input>
             <v-file-input
               type="file"
              accept="image/*"
              required
             
              label="thumbnail for the book"
              @change="onImagePicked"
             :rules='[(v) => !!v || "Image - is required"]'
             ></v-file-input>

           
            <v-spacer></v-spacer>
            <v-menu
              v-model="showDialog"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="publicationDate"
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
                v-model="publicationDate"
                @input="showDialog = false"
              
              ></v-date-picker>
            </v-menu>
            
          </v-form>
            <v-card-actions>
          <v-btn class="primary" @click="submitForm">submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="error" @click="cancel">cancel</v-btn>
        </v-card-actions>
        </v-card>
      
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import AuthorDataService from "@/services/AuthorDataService";
import BookDataService from "@/services/BookDataService";

export default {
  data() {
    return {
      authors:[],
      bookContent:null,
      imageContent:null,
      titleOfBook: "",
      authorOfBook: "",
      price: 0,
      showDialog: false,
     

      publicationDate: null,
    };
  },

  methods: {
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
            
           this.imageContent=fr.result;

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
            
           this.bookContent=fr.result;
          })
        } 
    },
    submitForm(){
      var form=new FormData();
      form.append("title",this.titleOfBook),
      form.append('author',this.authorOfBook);
      form.append('publicationDate',this.publicationDate)
      form.append('price',this.price)
      form.append("bookContent",this.bookContent)
      form.append("imageContent",this.imageContent)

      BookDataService.upload(bookForm);
    },
    cancel(){
      this.$router.go(-1)
    }
  },
  mounted(){
AuthorDataService.getAll().then({

})
  }
};
</script>
