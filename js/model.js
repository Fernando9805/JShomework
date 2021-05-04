export default class Model {
    constructor(){
        this.view = null;
        this.todos = JSON.parse( localStorage.getItem('todos'));
        if(!this.todos || this.todos.length === 0){
            this.currentId = 1;
            this.todos = [];
        }else{
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    getTodos(search){
        if (search) return this.todos.filter(todo => (todo.title.includes(search) || todo.description.includes(search)) );
        return this.todos.map( t=> ({...t}));
        
    }

    getCompletedTodos(search){ 
        if (search) return this.todos.filter(todo => todo.completed === true && (todo.title.includes(search) || todo.description.includes(search)) );
        return this.todos.filter(todo => todo.completed === true);
        
    }

    getUncompletedTodos(search){
        if (search) return this.todos.filter(todo => todo.completed === false && (todo.title.includes(search) || todo.description.includes(search)) );
        return this.todos.filter(todo => todo.completed === false);
    }

    findTodo(id){
        return this.todos.findIndex( t => t.id === id );
    }

    toogleCompleted(id){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }

    addTodo(title, description){
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false
        };

        this.todos.push(todo);

        this.save();

        return {...todo};
    }

    editTodo(id, data){
        const index = this.findTodo(id);
        Object.assign(this.todos[index], data);
        this.save();
    }

    removeTodo(id){
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

}