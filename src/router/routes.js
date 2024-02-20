import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path:'/about', component: About, exact: false},
    {path:'/posts', component: Posts, exact: true},
    {path:'/*', component: Posts, exact: true},
    {path:'/posts/:id', component: PostIdPage, exact: true},
    {path: '/error', component: Error, exact: false},
]

export const publicRoutes = [
    {path:'/login', component: Login, exact: false},
    {path:'/*', component: Login, exact: true},
]



