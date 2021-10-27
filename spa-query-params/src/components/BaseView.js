export default class BaseView {
    constructor(params){
        this.params = params;
    }

    setTitle(title){
        document.title = title;
    }

    getHtml(){
        return `<h1>BaseView</h1>`;
    }
}