import Store from "./Store";

export default class Views {
    constructor(){
        this.initView();
        this.store = new Store();
    }

    initView(){
        document.getElementById("root").innerHTML = `<input type='text' placeholder='Add todo' class='txtTodo' /> 
                                                     <button class='btnAdd'>ADD</button>                                                      
                                                     <input type='text' placeholder='Search todos' class='search-todo' />                                                      
                                                     <div class='todos'></div>`;

        const txtTodo = document.querySelector('.txtTodo');                                                    
        const txtSearch = document.querySelector('.search-todo');

        document.querySelector('.btnAdd').addEventListener('click', () => {
            console.log(txtTodo.value);
            const todos = this.store.getTodos();            
            todos.push({id: Math.round(Math.random() * 10000), todoText: txtTodo.value, done: false});        
            this.store.setTodos(todos);
            this.updateView(todos);
            txtTodo.value = '';
        });
        
        document.addEventListener('keyup', (e) => {
            if(e.target.classList.contains('todo-task')){
                if(e.code === 'Enter'){            
                    let todos = this.store.getTodos();
                
                    todos = todos.map(todo => todo.id === Number(e.target.id) ? {...todo, todoText: e.target.value} : todo);                    
                    this.store.setTodos(todos);
                    this.updateView(todos);
                }            
            }
        });

        document.addEventListener('dblclick', (e) =>{
            const confirmed = confirm('Are you sure you want to delete it?');

            if(confirmed){
                let todos = this.store.getTodos();
                
                todos = todos.filter(todo => todo.id !== Number(e.target.id));
                this.store.setTodos(todos);
                this.updateView(todos);
            }
        });

        const improvedSearch = this.debounce(this.searchTodos, 500);
        document.addEventListener('input', (e) => {
            if(e.target.classList.contains('search-todo')){
                improvedSearch(e.target.value, this.store.getTodos(), this.updateView);                
                // let todos = this.store.getTodos();                
                // todos = todos.filter(todo => todo.todoText.toLowerCase().includes(e.target.value.toLowerCase()));                
                // this.updateView(todos);
            }
        })
    }

    searchTodos(searchText, todos, updateView){                      
        // let todos = this.store.getTodos();                      
        todos = todos.filter(todo => todo.todoText.toLowerCase().includes(searchText.toLowerCase()));                
        updateView(todos);
    }

    debounce(fn, delay){
        let timer;

        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, arguments), delay);
        }
    }

    createTodoList({todoText}){
        return `<div>
        <input type='text' value=${todoText} />
        </div>`
    }

    updateView(todos){
        const todosDiv = document.querySelector('.todos');
        todosDiv.textContent = '';

        todos.forEach(todo => {
            // const html = this.createTodoList({todoText: todo.todotext});
            // todosDiv.insertAdjacentHTML("beforeend", html);

            const newElement = document.createElement('input');
            newElement.classList.add('todo-task');
            newElement.id = todo.id;
            newElement.value = todo.todoText;
            todosDiv.appendChild(newElement);
        });
    }
}