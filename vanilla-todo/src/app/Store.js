// import Views from "./Views";

export default class Store{
    constructor(){
        this.todos = [];
    }

    getTodos(){
        return this.todos;
    }

    setTodos(todos){
        this.todos = todos;
        // this.views.updateView(notes);
    }
}