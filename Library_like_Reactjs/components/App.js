import html from '../core.js'
import { connect  } from '../store.js'

// Thực thi function connect trả về một hàm có đối số là component
// Mình chuyển component App vào nó sẽ thực thi App
const connector = connect()

console.log(connector)

function App({cars}){
    return html`
      ${
        cars.map((car)=> `<li>${car}</li>`)
      }

      <button onclick="dispatch('ADD', 'car2')">Add cars </button>
    `
}

// Truyền App vào connect trong createStore
export default connector(App) 