import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle"
};

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    // объект наших reducers - здесь мы должны написать какие события будут происходить внутри наших reducers, то есть у нас будет какое-то св-во внутри которого будет лежать функция принимающая аргументами state и action - и будет что то делать с store
    // самое главное здесь пользоваться правилом названия этих action (здесь будут лежать action creators)
    reducers: {
        // для того чтобы создавать какие то действия внутри reducers нам необходимо сначаала прописать пространство имен  и дальше действие которое будет выаолняться - его тип. дальше у нас будет функция которая изменяет как-то наш state
        // heroesFetching - формируется action creator, далее формируется то действие которое работает напрямую сo state
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) =>{
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
          },
        heroesFetchingError: state =>{
                    state.heroesLoadingStatus = 'error';
                },
        heroCreated: (state, action) =>{
                    state.heroes.push(action.payload);
                },
        heroDeleted: (state, action) =>{
                    state.heroes = state.heroes.filter((item) => item.id !== action.payload);
                }

    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;