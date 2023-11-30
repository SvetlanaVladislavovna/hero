const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTER_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
      };

    case "HERO_CREATED":
      
        return {
            ...state,
            heroes: [...state.heroes, action.payload]
            
        }
      
    // функционал по удалению персонажа - здесь мы формируем новый список героев при помощи функции фильтер (этот метод возвращает новый массив, мы соблюдаем принцип иммутабельности)
    // и дальше этот новый список мы помещаем в heroes, потому что оттуда был удален какой то элемент
    // и так же у нас есть фильтрованные герои, т е те которых мы отображаем на странице

    case "HERO_DELETED":
      
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
