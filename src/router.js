import Vue from "vue"
import Router from "vue-router"





import Home from './Home.vue'
import Registration  from '@/views/Registration.vue'
import Books  from '@/views/Books.vue'
import BookUpdate from "@/views/BookUpdate"
import Login from '@/Login'
import ForgotPassword from  "@/ForgotPassword"



import AdminHome from '@/views/admin/AdminHome.vue'
import Publishers from '@/views/admin/Publishers'
import Authors from '@/views/admin/Authors'
import UpdateAdminAccount from "@/views/admin/UpdateAdminAccount.vue";





import EditPublisher from '@/views/publisher/EditPublisher'
import PublisherHome from '@/views/publisher/PublisherHome'
import BookForm  from '@/views/BookForm'





import EditAuthor from '@/views/author/EditAuthor'
import AuthorHome from '@/views/author/AuthorHome'



Vue.use(Router)
export default new Router({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[

    /////////////////////////////////////////////////////////////////////////////////////////
    ///     Common Routes /////////////////////////////////////////////////////////////////
    /// //////////////////////////////////////////////////////////////////////////////////////
     {
            path:'/forgotPassword',
            name:"ForgotPassword",
            component:ForgotPassword
        },
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
        {
            path:'/bookUpdate',
            name:"BookUpdate",
            component:BookUpdate
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
            path:'/updateAdminAccount',
            name:"UpdateAdminAccount",
            component:UpdateAdminAccount
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