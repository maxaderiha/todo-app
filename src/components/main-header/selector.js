import { createSelector } from 'reselect';
import { moduleName } from '../../ducks/categories';


const categoriesGetter = state => state[moduleName].categories;
const taskGetter = state => state[moduleName].tasks;

export default createSelector(categoriesGetter, taskGetter, (categories, tasks) => {
  let executed = 0;
  const keys = categories.keySeq().toArray();

  keys.forEach((key) => {
    if (!categories.get(key).tasks.length) executed += 1;
    else if (categories.get(key).tasks.every(taskId => tasks.get(taskId).done)) {
      executed += 1;
    }
  });

  return (executed / keys.length) * 100;
});
