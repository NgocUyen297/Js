export default function html([first, ...string], ...values){
    return values.reduce((acc, currentValue)=>{
        return acc.concat(currentValue, string.shift())
    },[first])
    //Lọc ra các thành phần tính toán, nếu true hiện thành phần, nếu false ẩn thành phần, nếu 0 thì hiện số 0
    // Trả về x nếu x không thuộc thành phần false value.
    // x khác toán tử true. 
    // hoặc x = 0
    .filter(x => (x && x !==true) || x == 0)
    .join('')
}


// reducer dùng để update store
export function createStore(reducer){
    let state = reducer()

    const roots = new Map()

    function render(){
        // component là hàm trả về một html 
        for (const [root, component] of roots){
            let output = component()
            // Nạp html dần vào root.  render ra giao diện. 
            root.innerHTML = output
        }
    }

    return {
        attach(component, root){
            roots.set(root, component)
            render()
        },
        // selector nhận vào một state và trả ra state. 
        connect(selector = state => state){
            return component => (props, ...args) => 
                component(Object.assign({}, props, selector(state), ...args))
        },
        dispatch(action, ...args){
            // reducer thực hiện action -> cập nhật state -> trả về state mới. 
            // state thay đổi -> store được update lại 
            // -> gọi render thay đổi giao diện. 
            state = reducer(state, action, ...args)
            render()
        }
    }
}


