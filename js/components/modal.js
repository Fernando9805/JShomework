export default class Modal {
    constructor(){
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.completed = document.getElementById('modal-completed');
        this.btn = document.getElementById('modal-save');

        this.todo = null;
    }

    setValues(todo) {
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

    onClick(callback) {
        this.btn.onclick = () => {
            console.log("on click")
            if(this.title.value === '' || this.description.value === ''){
                return
            }

            callback( this.todo.id, { 
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked
             } );
        }
    }
}