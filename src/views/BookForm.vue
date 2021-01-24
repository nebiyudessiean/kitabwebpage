<template>
  <v-app>
    <v-layout align-center md8 justify-center="">
      <v-flex lg6>
        <v-card class="pa-6" elevation="12">
          <v-card-title dark class="purple white--text">
            Book form
          </v-card-title>
          <v-form ref="bookform" v-model='valid'>
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
            :rules='[(v) => !!v || "Description of book - is required"]'
              prepend-icon="title"
              class="mt-3"
              label="Description of the book"
              required
              v-model="description"
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
              ref="book"
              accept="application/pdf"
              required
             
              label="Book content"
              @change="onFliePicked"
             :rules='[(v) => !!v || "Book content  - is required"]'
             >
            </v-file-input>
            <p v-if="invalidPdf" class="red">Please select valid pdf</p>
             <v-file-input
               type="file"
               ref="image"
              accept="image/png"
              required
              label="thumbnail for the book"
              @change="onImagePicked"
             :rules='[(v) => !!v || "Image - is required" ]'
             >
            </v-file-input>
           <p v-if="invalidImage" class="red">Please select valid image</p>
           
            <v-spacer></v-spacer>
           <!--  <v-menu
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
  </v-app>
</template>

<script>


import http from "@/http-common.js"
export default {
  data() {
    return {
      // authors:[],
      valid:false,
      invalidImage:false,
      invalidPdf:false,
      bookContent:null,
      imageContent:null,
      titleOfBook: "",
      description:'',
      authorOfBook: "",
      price: 0,
      showDialog: false,
      publicationDate: null,

    };
  },

  methods: {
    onImagePicked(f){
        var file= f;
       //  if (file.name.split('.').length<=1||file.name.split('.')[1]!='png') {
       //    this.invalidImage=true;
       //    this.valid=false;
       //  }
       // else{
       
       //  this.imageContent=file;
       //  this.valid=true;
       //  this.invalidImage=false;

       // }
       this.imageContent=file;
    },
    onFliePicked(f) {
    
       
       var file= f;
       if (file.name.split('.').length<=1||file.name.split('.')[1]!='pdf') {
         this.invalidPdf=true;
         this.valid=false;
         return;
       }
      
       
        this.bookContent=file;
        this.valid=true;
        this.invalidPdf=false
    },
    submitForm(){
      if (this.$refs.bookform.validate()) {
        var form=new FormData();
      const storage=window.localStorage;
      const token=storage.getItem('kitabToken');
      form.append("title",this.titleOfBook),
      form.append("cntnt",this.bookContent)
      form.append("tmbnl",this.imageContent)
      form.append("desc",this.description)
      form.append("price",this.price);
      form.append("token",token)


      http.post('/api/content/upload',form).then(response=>{
        console.log(response)
      }).catch(error=>{
       console.log(error);
      });
      }
      
    },
    cancel(){
      this.$router.go(-1)
    }
  },
  mounted(){
// AuthorDataService.getAll().then({

// })
  }
};
</script>
