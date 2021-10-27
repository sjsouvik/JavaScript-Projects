import BaseView from "./BaseView";

export default class Blogs extends BaseView{
    constructor(){
        super();
        this.setTitle('Blogs');
    }

    getHtml(){
        return `<h1>Blogs</h1>
                <a href='/blogs/1' class='nav-link'>Blogs 1</a>
                <a href='/blogs/2' class='nav-link'>Blogs 2</a>`;
    }
}