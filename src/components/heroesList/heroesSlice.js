import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle"
};

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    ()=>{
        // т е когда запускается эта функция она запускаетв нутри себя наш собственный хук который работает с сервером  - отдает нам функцию по работе с сервером для того чтобы мы могли делать запросы и в след строке мы делаем запрос на сервер по указанному адресу
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
  
    reducers: {
        heroCreated: (state, action) =>{
                    state.heroes.push(action.payload);
                },
        heroDeleted: (state, action) =>{
                    state.heroes = state.heroes.filter((item) => item.id !== action.payload);
                }

    },
    extraReducers: (builder)=>{
        builder 
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) =>{
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload; 
            })
            .addCase(fetchHeroes.rejected, state =>{
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    // таким образом мы обрабатываем результаты работы нашего action creator а именно трех вариантов которые могут у него возникнуть 
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