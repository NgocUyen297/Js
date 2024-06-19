import storage from "./utils/storage.js"

const init = {
    todos: storage.get(),
    editIndex: null,
    filter: 'all',
    filers: {
        all: ()=> true,
        active: todo => !todo.complete,
        completed: todo => todo.complete
    }
}

const actions ={
    add({todos}, title){
        if(title){
        todos.push({title, complete: false})
        storage.set(todos)
        }
    }, 
    toggle({todos}, index){
        const todo = todos[index]
        todo.complete = !todo.complete
        storage.set(todos)
    },
    toggleAll({todos}, completed){
        todos.forEach(todo => {
            todo.complete = completed
        });
        storage.set(todos)
    },
    destroy({todos}, index){
        todos.splice(index,1)
        storage.set(todos)
    },
    switchFilter(state, filter){
        state.filter = filter
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filers.active)
        storage.set(state.todos)
    }, 
    edit(state,index){
        state.editIndex = index
    },
    saveEdit(state, title){
        if(state.editIndex !== null){
           if(title){ // nếu title không có gì thì xoá bỏ todo
            state.todos[state.editIndex].title = title
            storage.set(state.todos)
           }else{
            // hàm destroy có lưu storage sẵn
            this.destroy(state, state.editIndex)
           }
           state.editIndex = null //thoát chế độ edit index
         }
    }, 
    cancelEdit(state){
        state.editIndex = null
    }
}

export default function reducer(state = init, action, ...args){
    // Nếu có action trong actions thì chạy hàm action đó.
    actions[action] && actions[action](state, ...args)
    return state
}