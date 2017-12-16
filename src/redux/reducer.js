import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import categoriesReducer, { moduleName as categoriesModule } from '../ducks/categories';


export default combineReducers({
  router,
  [categoriesModule]: categoriesReducer,
  form,
});
