const init = {
    cars: ['car1']
}

export default function reducer(state = init, action, args){
    switch(action){
        case 'CREATE':
            break
        default:  //trong trường hợp mặc định thì trả về init
         return state
    }
}