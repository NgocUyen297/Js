import html from '../core.js'
import { connect  } from '../store.js'

const connector = connect(state => ({
    cars:state.cars
}))

function App(props){
    console.log(props)
    return html`<h1>HELLO WORLD</h1>`
}

export default connector(App) 