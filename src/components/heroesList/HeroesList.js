import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    // функиця берет id и по нему удаляет ненужного персонажа из store, только если запрос на удаление прошел успешно
    // обработчик обязательно нужно обернуть в usecallback, потому что эта функция передается ниже по иерархии(как проперти какого то дочернего компонента и чтобы каждый раз не вызывать перерендеринг дочерних компонентов -заключаем в usecallback)
    const onDelete = useCallback((id)=>{
        // выполняется запрос по этому пути, также мы передаем метод delete чтобы удалить этого героя
        request(`http://localhost:3001/heroes/${id}`, 'DELETE' )
            .then(data=> console.log(data, 'Deleted'))
            // если данные были удалены с сервера, то мы будем диспетчить новое действие-удаление персонажа по id
            .then(dispatch(heroDeleted(id)))
            .catch(err=>console.log(err))
             // eslint-disable-next-line 
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        console.log(arr);
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames='hero'>
                        <h5 className="text-center mt-5">Героев пока нет</h5>
                    </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames='hero'>
                        <HeroesListItem {...props} onDelete={()=>onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component='ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;