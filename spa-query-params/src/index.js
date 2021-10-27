import Home from "./components/Home";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Blog1 from "./components/Blog1";
import NotFound from "./components/NotFound";

//to get the regular expression for each of the route paths
const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

//to get the param's name as key and param's value as value in an object
const getParams = currentRoute =>{
    const values = currentRoute.result.slice(1);
    const keys = Array.from(currentRoute.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
}

const router = () =>{
    const routes = [
        {path:"/", view: Home},
        {path:"/projects", view: Projects},
        {path:"/blogs", view: Blogs},
        {path:"/blogs/:id", view: Blog1},
        {path:"/*", view: NotFound},
    ];

    const matchRoute = routes.map(route => {
        return { route, result: location.pathname.match(pathToRegex(route.path)) }
    });

    let currentRoute = matchRoute.find(route => route.result !== null);

    if(!currentRoute){
        currentRoute = {route: routes[routes.length - 1], result: [location.pathname]};
    }

    document.getElementById('root').innerHTML = new currentRoute.route.view(getParams(currentRoute)).getHtml();
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {        
        if(e.target.classList.contains('nav-link')){
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            router();
        }
    })
    
    router();
})