import BaseView from "./BaseView"

export default class NotFound extends BaseView{
    constructor(){
        super();
        this.setTitle('404 Page');
    }

    getHtml(){
        return `<h1>Oops! the page you're looking for, is not available</h1>
                <a href='/' class='nav-link'>Go back to Home page</a>`;
    }
}