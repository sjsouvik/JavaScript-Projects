import BaseView from "./BaseView";

export default class Blog1 extends BaseView{
    constructor(params){
        super(params);
        this.blogId = params.id;
        this.setTitle(`Blog ${this.blogId}`);
    }

    getHtml(){
        return `<h1>Blog ${this.blogId}</h1>`;
    }
}