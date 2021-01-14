import Vue from "vue"
import Router from "vue-router"





import Home from './Home.vue'
import Registration  from '@/views/Registration.vue'
import Books  from '@/views/Books.vue'

import Login from '@/Login'
import AdminHome from '@/views/admin/AdminHome.vue'
import Publishers from '@/views/admin/Publishers'
import Authors from '@/views/admin/Authors'





import EditPublisher from '@/views/publisher/EditPublisher'
import PublisherHome from '@/views/publisher/PublisherHome'
import BookForm  from '@/components/BookForm'





import EditAuthor from '@/views/author/EditAuthor'
import AuthorHome from '@/views/author/AuthorHome'



Vue.use(Router)
export default new Router({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[
         {
            path:'/registration',
            name:"Registration",
            component:Registration
        },
         {
            path:'/books',
            name:"Books",
            component:Books
        },
       
       
        // ////////////////////////////////////////////////////////////
        
        // Routes for the Admin page 


        //////////////////////////////////////////////////////////////////
        // ///////////////////////////////////////////////////////////////
        {
            path:'/',
            name:"Home",
            component:Home
        },
         {
            path:'/admin',
            name:"Admin",
            component:AdminHome
        },
        {
            path:'/login',
            name:"Login",
            component:Login
        },
        {
            path:'/publishers',
            name:"Publishers",
            component:Publishers
        },
        {
            path:'/authors',
            name:"Authors",
            component:Authors
        },
       
       
         
        //  ////////////////////////////////////////////////////////////////////////////
         
         
         
        //  Routes for the Publisher page 


        // ////////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
       
        {
            path:'/editpublisher',
            name:"EditPublisher",
            component:EditPublisher,
             props(route) {
             return {  name: route.query.name,phone: route.query.phone,email: route.query.email,location: route.query.location }
                      }
        },
        {
            path:"/publisher",
            name:"PublisherHome",
            component:PublisherHome 
        },
        {
            path:"/addbook",
            name:"BookForm",
            component:BookForm 
        },
       

          //  ////////////////////////////////////////////////////////////////////////////
         
         
         
        //  Routes for the Author page 


        // ////////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
       
        
        {
            path:'/editauthor',
            name:"EditAuthor",
            component:EditAuthor,
             props(route) {
             return {  name: route.query.name,phone: route.query.phone,email: route.query.email }
                      }
        },
         {
            path:"/author",
            name:"AuthorHome",
            component:AuthorHome 
        },
        
        
    ]
})