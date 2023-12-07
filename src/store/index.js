import { configureStore} from '@reduxjs/toolkit';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';


const stringMiddleware = (store)=>(next)=>(action)=>{
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

// принимает в себя объект с настройками
const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware) ,
    // получаем массив уже встроенных middleware и к этому массиву нам необходимо добавить наш собственный middleware
    devTools: process.env.NODE_ENV !== 'production',
    // эта конструкция автоматически вычисляет нужно ли нам сейчас devtools включать или нет, и это будет завиеть от того в режиме разработки мы находимся или в режиме готового продукта 

})



export default store;


