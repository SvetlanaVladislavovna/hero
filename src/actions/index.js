export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () =>{
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) =>{
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError =()=>{
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

// будем менять фильтр с задержкой с помощью thunk
// так как мы подключили новый middleware теперь мы сможем туда передать не только объект, кот возвращается из этого action creator но и функцию
// поэтому здесь мы продолжаем цепочку вызовов
// т е теперь когда у нас запускается action creator - он будет возвращать нам функцию, которая в себя принимает dispatch и делает что то внутри себя 
// когда мы используем thunk middleware dispatch у нас приходит сюда автоматически, т е нам не нужно его ниоткуда импортировать
export const activeFilterChanged = (filter) =>(dispatch)=>{
    // основная задача задиспетчить этот объект т е какое то действие спустя определенное кол-во времени
    setTimeout(()=>{
        dispatch({
            type: 'ACTIVE_FILTER_CHANGED',
            payload: filter
        })
    }, 1000)
    // т е теперь мы заупскаем функцию которая через 1 сек будет запускать нужный нам dispatch - происходит это из за того что middleware автоматически передает dispatch  в возвращаемую функцию
}

export const heroCreated = (hero) =>{
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

export const heroDeleted =(id)=>{
    console.log('heroDeleted', id);
    return{
        type: 'HERO_DELETED',
        payload: id
    }

}