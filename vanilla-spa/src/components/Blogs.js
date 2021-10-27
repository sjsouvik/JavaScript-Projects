import BaseView from "./BaseView";

export default class Blogs extends BaseView{
    constructor(){
        super();
        this.setTitle('Blogs');
    }

    getHtml(){
        return `<h1>Blogs</h1>`
    }
}