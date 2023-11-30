import { createStore, combineReducers, compose } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// мы создаем новую переменную - она будет принимать createStore и возвращать новую функцию. внутри этой функции мы будем создавать store при помощи команды createstore()
const enhancer = (createStore)=>(...args)=>{
    const store = createStore(...args);

    // мы должны сохранить оригинал dispatch, который принимает в себя только объект 
    const oldDispatch = store.dispatch;
    // далее мы возьмем тот dispatch, который был в оригинале, то есть внутри store и поменяем его значение(перезапишем), то есть сразу переопределяем его действие, то есть говорим что это будет функция, которая принимает какой то action
    // внутри мы будем ориентироваться на тот action который приходит
    store.dispatch = (action)=>{
        if(typeof action === 'string'){
            // возвращаем из нашего dispatch, только внутри он будет запускаться с объектом type:action
            return oldDispatch({
                type: action
            })
        }
        // а если пришла не строка, то мы просто возвращаем наш olddispatch c action. потому что если это не строка то скорее всего объект и мы просто его помещаем в наш старый dispatch
        return oldDispatch(action)
    }
    // когда мы подменили наш dispatch нам необходимо вернуть наш store
    return store;
}
// далее мы применяем наш enhancer
// нас интересует оригинальная команда createStore  и в нее уже встроен механизм, что ечли мы сюда вторым аргументом передаем какую то функцию, то она является усилителем нашего store, то есть эта функция будет там запущена и она подменит оригинальный dispatch  и подставит тот функционал, который мы врусную прописали 
const store = createStore(
                    combineReducers({heroes, filters}), 
                    compose(
                        enhancer,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                    ));

export default store;


