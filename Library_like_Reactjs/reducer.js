const init = {
    cars: ['car1']
}

export default function reducer(state = init, action, ...args){
    switch(action){
        case 'ADD':
            const [newCars] = args
            return {
                ...state, 
                cars: [...state.cars, newCars]
            }
        default:  //trong trường hợp mặc định thì trả về init
         return state
    }
}