<template>
  <v-app>
    <v-layout v-if="isLogged" align-center md8 justify-center="" >
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
              v-model="currentBook.title"
              outlined
            >
            </v-text-field>
            <v-text-field
            :rules='[(v) => !!v || "Author of book - is required"]'
              prepend-icon="account_box"
              label="Author of  the book"
              required
              v-model="currentBook.author"
              outlined
            >
            </v-text-field>
            <v-text-field
              prepend-icon="request_quote"
              :rules='[(v) => !!v || "Price of book  - is required"]'
              v-model="currentBook.price"
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
             v-model="currentBook.content"
             ></v-file-input>
             <v-file-input
               type="file"
              accept="image/*"
              required
             
              label="thumbnail for the book"
              @change="onImagePicked"
             :rules='[(v) => !!v || "Image - is required"]'
             v-model="currentBook.content"
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
    <NotLogged v-else></NotLogged>
  </v-app>
</template>
<script >
  import BookDataService from "@/services/BookDataService"
  import NotLogged from "@/NotLogged.vue"

  export default{
    components:{
      NotLogged
    },
    data(){
      return {
        currentBook: null,
        thumbnail:null,
      isLogged: false
      }
    },
    methods:{
      getBookInfo(title){
       BookDataService.getBookByTitle(title).then(response=>{this.currentBook=response.data.book
this.thumbnail=response.data.thumbnail;

       }).catch(()=>{
        this.currentBook.title="Fake title"
        this.currentBook.price=0
        this.currentBook.author="Fake author"
         var today = new Date();
         var dd = String(today.getDate()).padStart(2, '0');
         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
          this.currentBook.publicationDate=today;
       })

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
            
           this.currentBook.content=fr.result;
          })
        } 
    },
     submitForm(){
      var form=new FormData();
      form.append("title",this.currentBook.title),
      form.append('author',this.currentBook.author);
      form.append('publicationDate',this.currentBook.publicationDate)
      form.append('price',this.currentBook.price)
      form.append("bookContent",this.currentBook.content)
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
        this.getBookInfo(this.$params.title);
        this.isLogged=true;
      }
      
    }
  }
</script>