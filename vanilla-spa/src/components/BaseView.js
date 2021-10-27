export default class BaseView{
    constructor(){

    }

    setTitle(title){
        document.title = title; 
    }

    getHtml(){
        return `<h1>BaseView</h1>`
    }
}