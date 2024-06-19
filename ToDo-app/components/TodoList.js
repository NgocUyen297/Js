import html from '../core.js'
import TodoItem  from './TodoItem.js'
import { connect } from '../store.js'


const connector = connect()

function  TodoList({todos, filter,filers}){
  console.log(todos.every(filers.completed))
    return html`
   <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" 
        onchange = "dispatch('toggleAll',this.checked )"
        ${todos.every(filers.completed) && 'checked'}
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          ${
            todos
            .filter(filers[filter])
            .map((todo,index )=> {
              return TodoItem({todo, index})
            })
          }
        </ul>
      </section>
    `
}
// Hàm trả về hàm
export default connector(TodoList)