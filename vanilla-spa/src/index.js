import Home from "./components/Home"
import Projects from "./components/Projects"
import Blogs from "./components/Blogs"

const router = () =>{
    const routes = [
        {path:"/", view: Home},
        {path:"/projects", view: Projects},
        {path:"/blogs", view: Blogs},
        {path:"/*", view: `<h3>OOps! this page is not found</h1>`},
    ]

    const matchRoute = routes.find(route => route.path === location.pathname);

    if(!matchRoute){
        matchRoute = routes[routes.length - 1];
    }

    document.getElementById('root').innerHTML = new matchRoute.view().getHtml();
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', ()=>{
    document.body.addEventListener('click', (e)=>{
        if(e.target.classList.contains('nav-link')){
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            router();
        }
    })
    router();
})