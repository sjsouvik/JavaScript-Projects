import BaseView from "./BaseView";

export default class Projects extends BaseView{
    constructor(){
        super();
        this.setTitle('Projects');
    }

    getHtml(){
        return `<h1>Projects</h1>`;
    }
}