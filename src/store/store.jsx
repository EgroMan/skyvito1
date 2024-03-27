import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';
import { setTokenExists } from './actions/creators/productCreators';

// Функция для инициализации состояния
const loadState = () => {
  try {
    const tokenExists = localStorage.getItem('accessToken');
    return {
      product: {
        tokenExists: tokenExists ? true : false
      }
    };
  } catch (error) {
    return undefined;
  }
};

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk)
);

// Слушаем storage
window.addEventListener('storage', () => {
  const tokenExists = localStorage.getItem('accessToken');
  store.dispatch(setTokenExists(!!tokenExists));
});

export default store;
