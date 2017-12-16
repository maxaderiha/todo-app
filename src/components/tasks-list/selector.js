import { createSelector } from 'reselect';
import { moduleName } from '../../ducks/categories';
import { mapToArr } from '../../ducks/utils';


const categoryIdGetter = (_, props) => props.id;

const tasksGetter = state => state[moduleName].tasks;

const searchGetter = (_, props) => props.search;

export default createSelector(categoryIdGetter, tasksGetter, searchGetter, (id, tasks, search) => {
  const filter = new URLSearchParams(search);

  const done = filter.has('done') ? filter.get('done') : null;
  const name = filter.has('name') ? filter.get('name') : null;

  return mapToArr(tasks)
    .filter(task => (
      task.categoryId === id
      && (!+done || task.done)
      && (!name || task.name === name)
    ));
});
