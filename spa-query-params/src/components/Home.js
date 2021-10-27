import BaseView from "./BaseView";

export default class Home extends BaseView{
    constructor(){
        super();
        this.setTitle('Home');
    }

    getHtml(){
        return `<h1>Home</h1>`;
    }
}