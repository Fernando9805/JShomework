import AddTodo from './components/addTodo.js';
import Modal from './components/modal.js';

export default class View {
    constructor() {
        this.model = null;
        this.radioAll = document.getElementById('radioAll');
        this.filterForm = document.getElementById('filterForm');
        this.searchButton = document.getElementById('searchButton');
        this.table = document.getElementById('table');
        this.addTodoFrom = new AddTodo();

        this.addTodoFrom.onClick( (t,d) => this.addTodo(t, d) );

        this.modal = new Modal();
        this.modal.onClick( ( id, data ) => this.editTodo(id, data)  );
    }

    setModel(model) {
        this.model = model;
    }

    render(){
        const filterForm = document.getElementById('filterForm');
        const radioAll = document.getElementById('radioAll');
        const radioCompleted = document.getElementById('radioCompleted');
        const radioUncompleted = document.getElementById('radioUncompleted');
        const searchInput = document.getElementById('searchInput');

        let todos = []; 

        if (!radioAll.checked && !radioCompleted.checked && !radioUncompleted.checked) {
            todos = this.model.getTodos(searchInput.value);
            if (todos && todos.length >0){
                todos.forEach( t => this.createRow(t));
            } 
        }

        filterForm.onsubmit =(e) => {
            e.preventDefault();
            for (var i = table.rows.length - 1; i >= 0; i--) {
                table.deleteRow(i);
            }

            if (radioCompleted.checked) {
                todos = this.model.getCompletedTodos(searchInput.value);
            } else if (radioUncompleted.checked) {
                todos = this.model.getUncompletedTodos(searchInput.value);
            } else {
                todos = this.model.getTodos(searchInput.value);
            }

            todos.forEach(t => this.createRow(t));
        };
    }

    addTodo(title, description) {  
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    editTodo(id, data){
        console.log(id, data);
        this.model.editTodo(id, data);
        const row = document.getElementById(id);
        row.children[0].innerText = data.title;
        row.children[1].innerText = data.description;
        row.children[2].children[0].checked = data.completed;
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    createRow(todo){
        const row = table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id)
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1')
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#modal');
        editBtn.onclick = () => this.modal.setValues( {
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked
        } )
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}