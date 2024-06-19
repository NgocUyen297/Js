import html from '../core.js'
import { connect  } from '../store.js'
 

function  Footer({todos,filter,  filers}){
    return html`
    <footer class="info">
      <p>${todos.filter(filers.active).length} items left</p>
      <ul>
          ${
            Object.keys(filers).map((key)=>{
              return html`
                <li>
                  <button class="${filter === key && 'selected'}"
                   onclick="dispatch('switchFilter','${key}' )"
                  >${key[0].toUpperCase() + key.slice(1)}</button>
                </li>
              `
            })
          }
          ${todos.filter(filers.completed).length > 0 && `
              <li>
                <button
                onclick="dispatch('clearCompleted' )"
                >Clear  all completed</button>
              </li>
            `}
        
      </ul>
      <p>Double-click to edit a todo</p>
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      <p>Created by <a href="http://todomvc.com">you</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
    `
}

export default connect()(Footer)