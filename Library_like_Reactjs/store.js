import { createStore } from "./core.js";
import reducer from "./reducer.js";

const {attach, connect, dispatch} = createStore(reducer)

// Biến dispatch thành biến global có thể truy cập bất cứ đâu
window.dispatch = dispatch

export{
    attach, 
    connect
}