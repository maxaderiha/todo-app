import { createSelector } from 'reselect';
import { moduleName } from '../../ducks/categories';
import { mapToArr } from '../../ducks/utils';


const idsGetter = (_, props) => props.ids;
const categoriesGetter = state => state[moduleName].categories;

export default createSelector(idsGetter, categoriesGetter, (ids, categories) => {
  return mapToArr(categories).filter(item => ids.includes(item.id));
});
