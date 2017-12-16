import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import rootSaga from './saga';
import history from '../history';
import reducer from './reducer';


const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
