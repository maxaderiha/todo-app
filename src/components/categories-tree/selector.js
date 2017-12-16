import { createSelector } from 'reselect';
import { moduleName } from '../../ducks/categories';
import { mapToArr } from '../../ducks/utils';


const initIdsGetter = state => state[moduleName].initCategoriesIds;

export default createSelector(initIdsGetter, ids => mapToArr(ids));
