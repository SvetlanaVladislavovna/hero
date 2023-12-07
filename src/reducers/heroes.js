import { createReducer } from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle"
};

const heroes = createReducer(initialState, {
  [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},
  [heroesFetched]: (state, action) =>{
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
          },
  [heroesFetchingError]: state =>{
            state.heroesLoadingStatus = 'error';
          },
  [heroCreated]: (state, action) =>{
            state.heroes.push(action.payload);
          },
  [heroDeleted]: (state, action) =>{
            state.heroes = state.heroes.filter((item) => item.id !== action.payload);
          } 
        },
  // третий аргумент - это массив функций сравнения
  [],
  // функция для действий по умолчанию
  state => state
 )



//   // вторым аргументом у нас идет функция которая принимает в себя аргумент builder 
//   // это такой объект кот позволяет нам строить, конструироват наш reducer при помощи трех встроенных в него методов 
// const heroes = createReducer(initialState, builder => {
//   builder
//   // какой то кейс - какой то случай, данная команда принимает в себя два аргумента - action creator и функцию по изменению state
//       .addCase(heroesFetching, state => {
//         // этот код не подходит под понятие иммутабельности, потому что он берет напрямую наш state, его св-во и просто изменяет, он не возвращает никакую новую сущность. если мы используем toolkit и createReducer - мы можем прописывать такой код, библиотека immer js возьмет его, пойметт что нужно сделать и внутри будет соблюдать иммутабельность
//         state.heroesLoadingStatus = 'loading';
//       })
//       // эта функция ничего не возвращает, она просто заупскается и внутри производит какую то мутацию и в таком случае immer js будет работать, но если вдруг мы пропишем return или код в одну строчку - в таком случае immer js рабоатт не будет 
//       .addCase(heroesFetched, (state, action) =>{
//         state.heroesLoadingStatus = 'idle';
//         state.heroes = action.payload;
//       })
//       .addCase(heroesFetchingError, state =>{
//         state.heroesLoadingStatus = 'error';
//       }) 
//       .addCase(heroCreated, (state, action) =>{
//         state.heroes.push(action.payload);
//       })
//       .addCase(heroDeleted, (state, action) =>{
//         state.heroes = state.heroes.filter((item) => item.id !== action.payload);
//       })
//       .addDefaultCase(() => {});
// } )
  
  // const heroes = (state = initialState, action) => {
  //   switch (action.type) {
  //     case "HEROES_FETCHING":
  //       return {
  //         ...state,
  //         heroesLoadingStatus: "loading",
  //       };
  //     case "HEROES_FETCHED":
  //       return {
  //         ...state,
  //         heroes: action.payload,
  //         heroesLoadingStatus: "idle",
  //       };
  //     case "HEROES_FETCHING_ERROR":
  //       return {
  //         ...state,
  //         heroesLoadingStatus: "error",
  //       };
  //     case "HERO_CREATED":
  //         return {
  //             ...state,
  //             heroes: [...state.heroes, action.payload]
              
  //         };
  //     case "HERO_DELETED":
  //       return {
  //         ...state,
  //         heroes: state.heroes.filter((item) => item.id !== action.payload),
  //       };
  
  //     default:
  //       return state;
  //   }
  // };
  
  export default heroes;