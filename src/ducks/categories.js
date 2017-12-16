import { Record, List, OrderedMap } from 'immutable';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { push, goBack } from 'react-router-redux';
import { reset, clearFields } from 'redux-form';
import { appName } from '../config';
import { arrToMap, generateRandomId } from './utils';
import { categories, initCategoriesIds, tasks } from '../fixtures';


export const moduleName = 'categories';
export const prefix = `${appName}/${moduleName}`;

export const ADD_INIT_CATEGORY_REQUEST = `${prefix}/ADD_INIT_CATEGORY_REQUEST`;
export const ADD_INIT_CATEGORY_SUCCESS = `${prefix}/ADD_INIT_CATEGORY_SUCCESS`;
export const DELETE_CATEGORY = `${prefix}/DELETE_CATEGORY`;

export const SHOW_MODAL_FORM = `${prefix}/SHOW_MODAL_FORM`;
export const HIDE_MODAL_FORM = `${prefix}/HIDE_MODAL_FORM`;

export const TOGGLE_CATEGORY = `${prefix}/TOGGLE_CATEGORY`;
export const SHOW_CATEGORY = `${prefix}/SHOW_CATEGORY`;

export const EDIT_CATEGORY_REQUEST = `${prefix}/EDIT_CATEGORY_REQUEST`;
export const EDIT_CATEGORY_SUCCESS = `${prefix}/EDIT_CATEGORY_SUCCESS`;

export const ADD_NESTED_CATEGORY_REQUEST = `${prefix}/ADD_NESTED_CATEGORY_REQUEST`;
export const ADD_NESTED_CATEGORY_SUCCESS = `${prefix}/ADD_NESTED_CATEGORY_SUCCESS`;

export const ADD_TASK_REQUEST = `${prefix}/ADD_TASK_REQUEST`;
export const ADD_TASK_SUCCESS = `${prefix}/ADD_TASK_SUCCESS`;

export const FILTRATE_TASKS = `${prefix}/FILTRATE_TASKS`;
export const CANCEL_FILTER = `${prefix}/CANCEL_FILTER`;

export const TOGGLE_TASK_INDICATOR = `${prefix}/TOGGLE_TASK_INDICATOR`;

export const EDIT_TASK = `${prefix}/EDIT_TASK`;
export const CANCEL_EDIT_TASK = `${prefix}/CANCEL_EDIT_TASK`;
export const SET_EDIT_TASK_RECORD = `${prefix}/SET_EDIT_TASK_RECORD`;
export const CHANGE_SELECTED_CAT_ID = `${prefix}/CHANGE_SELECTED_CAT_ID`;

const CategoryRecord = Record({
  isOpenModalForm: false,
  isOpen: false,
  name: null,
  id: null,
  parentId: null,
  tasks: [],
  subIds: [],
  isNew: false,
});

const TaskRecord = Record({
  name: null,
  done: false,
  description: null,
  id: null,
  categoryId: null,
});

const EditTaskRecord = Record({
  selectedCategoryId: null,
  taskId: null,
});

const defaultState = new Record({
  initCategoriesIds: new List(initCategoriesIds),
  categories: arrToMap(categories, CategoryRecord),
  tasks: arrToMap(tasks, TaskRecord),
  edit: new EditTaskRecord(),
});

export default function reducer(state = defaultState(), action) {
  const { type, payload } = action;

  switch (type) {
    case EDIT_TASK: {
      const {
        oldCatId,
        newCatId: categoryId,
        taskId: id,
        name,
        done,
        description,
      } = payload;

      return state
        .updateIn(['categories', oldCatId, 'tasks'], tasks => tasks.filter(taskId => taskId !== id))
        .updateIn(['categories', categoryId, 'tasks'], tasks => tasks.concat(id))
        .setIn(['tasks', id], new TaskRecord({
          categoryId,
          name,
          done,
          description,
          id,
        }));
    }
    case CHANGE_SELECTED_CAT_ID:
      return state.setIn(['edit', 'selectedCategoryId'], payload.id);
    case SET_EDIT_TASK_RECORD:
      return state.set('edit', new EditTaskRecord(payload));
    case ADD_TASK_SUCCESS:
      return state
        .set('tasks', new OrderedMap({ [payload.id]: new TaskRecord(payload) }).merge(state.tasks))
        .updateIn(['categories', payload.categoryId, 'tasks'], tasks => tasks.concat(payload.id));

    case TOGGLE_TASK_INDICATOR:
      return state.setIn(['tasks', payload.id, 'done'], payload.done);

    case ADD_INIT_CATEGORY_SUCCESS:
      return state
        .update('initCategoriesIds', ids => ids.push(payload.id))
        .setIn(['categories', payload.id], new CategoryRecord({
          name: payload.name,
          id: payload.id,
          isNew: true,
        }));

    case SHOW_MODAL_FORM:
      return state.setIn(['categories', payload.id, 'isOpenModalForm'], true);

    case HIDE_MODAL_FORM:
      return state.setIn(['categories', payload.id, 'isOpenModalForm'], false);

    case TOGGLE_CATEGORY: {
      const prevState = state.getIn(['categories', payload.id, 'isOpen']);
      return state.setIn(['categories', payload.id, 'isOpen'], !prevState);
    }

    case SHOW_CATEGORY:
      return state.setIn(['categories', payload.id, 'isOpen'], true);

    case EDIT_CATEGORY_SUCCESS:
      return state.setIn(['categories', payload.id, 'name'], payload.name);

    case ADD_NESTED_CATEGORY_SUCCESS:
      return state
        .updateIn(['categories', payload.id, 'subIds'], subIds => subIds.concat([payload.subId]))
        .setIn(['categories', payload.subId], new CategoryRecord({
          parentId: payload.id,
          name: payload.name,
          id: payload.subId,
          isNew: true,
        }));

    case DELETE_CATEGORY: {
      const target = state.getIn(['categories', payload.id]);

      const categoriesAcc = [target.id];
      const tasksAcc = [];

      (function getAllIds(elem, entities) {
        if (elem.subIds.length) categoriesAcc.push(...elem.subIds);
        if (elem.tasks.length) tasksAcc.push(...elem.tasks);

        elem.subIds.forEach(id => getAllIds(entities.get(id)), entities);
      }(target, state.get('categories')));

      let tmpState = state;

      tmpState = payload.parentId
        ? tmpState.updateIn(['categories', payload.parentId, 'subIds'], subIds => subIds.filter(id => id !== payload.id))
        : tmpState.update('initCategoriesIds', initIds => initIds.filter(id => id !== payload.id));


      return tmpState
        .update('categories', categories => categories.deleteAll(categoriesAcc))
        .update('tasks', tasks => tasks.deleteAll(tasksAcc));
    }

    default:
      return state;
  }
}

export function editTask(newCatId, oldCatId, taskId, newData) {
  return {
    type: EDIT_TASK,
    payload: {
      newCatId,
      oldCatId,
      taskId,
      ...newData,
    },
  };
}

export function* editTaskSaga({ payload: { newCatId } }) {
  yield put(push(`/home/categories/${newCatId}`));
}

export function changeSelectedCatId(id) {
  return {
    type: CHANGE_SELECTED_CAT_ID,
    payload: { id },
  };
}

export function setEditTaskRecord(taskId, selectedCategoryId) {
  return {
    type: SET_EDIT_TASK_RECORD,
    payload: { taskId, selectedCategoryId },
  };
}

export function cancelEditTask() {
  return {
    type: CANCEL_EDIT_TASK,
  };
}

export function* cancelEditTaskSaga() {
  yield put(goBack());
}

export function toggleCategory(id) {
  return {
    type: TOGGLE_CATEGORY,
    payload: { id },
  };
}

export function showModalForm(id) {
  return {
    type: SHOW_MODAL_FORM,
    payload: { id },
  };
}

export function hideModalForm(id) {
  return {
    type: HIDE_MODAL_FORM,
    payload: { id },
  };
}

export function addNestedCategory(name, id) {
  return {
    type: ADD_NESTED_CATEGORY_REQUEST,
    payload: { name, id },
  };
}

export function* addNestedCategorySaga(action) {
  const subId = yield call(generateRandomId);
  const { name, id } = action.payload;

  yield put({
    type: ADD_NESTED_CATEGORY_SUCCESS,
    payload: { name, id, subId },
  });

  yield put({
    type: HIDE_MODAL_FORM,
    payload: { id },
  });

  yield put({
    type: SHOW_CATEGORY,
    payload: { id },
  });

  yield put(push(`/home/categories/${subId}`));
}

export function editCategory(name, id) {
  return {
    type: EDIT_CATEGORY_REQUEST,
    payload: { name, id },
  };
}

export function* editCategorySaga(action) {
  yield put({
    type: EDIT_CATEGORY_SUCCESS,
    payload: { ...action.payload },
  });

  yield put({
    type: HIDE_MODAL_FORM,
    payload: { id: action.payload.id },
  });
}

export function addInitCategory(name) {
  return {
    type: ADD_INIT_CATEGORY_REQUEST,
    name,
  };
}

export function* addInitCategorySaga(action) {
  const id = yield call(generateRandomId);

  yield put({
    type: ADD_INIT_CATEGORY_SUCCESS,
    payload: { name: action.name, id },
  });

  yield put(reset('newCategory'));
  yield put(push(`/home/categories/${id}`));
}

export function deleteCategory(id, parentId) {
  return {
    type: DELETE_CATEGORY,
    payload: { id, parentId },
  };
}

export function* deleteCategoriesSaga(action) {
  const path = action.payload.parentId
    ? `home/categories/${action.payload.parentId}`
    : '/home';

  yield put(push(path));
}

export function addTask(categoryId, name) {
  return {
    type: ADD_TASK_REQUEST,
    payload: { categoryId, name },
  };
}

export function* addTaskSaga(action) {
  const id = yield call(generateRandomId);

  yield put({
    type: ADD_TASK_SUCCESS,
    payload: { id, ...action.payload },
  });

  yield put(reset('newTask'));
}

export function toggleDone(id, done) {
  return {
    type: TOGGLE_TASK_INDICATOR,
    payload: { id, done },
  };
}

export function filtrateTasks(path, search) {
  return {
    type: FILTRATE_TASKS,
    payload: { path, search },
  };
}

export function* filtrateTasksSaga(action) {
  const { path, search } = action.payload;
  yield put(push(`${path}?${search}`));
}

export function* cancelFilterSaga() {
  yield put(clearFields('filter', false, false, 'done', 'name'));
}


export function* saga() {
  yield all([
    takeEvery(ADD_INIT_CATEGORY_REQUEST, addInitCategorySaga),
    takeEvery(EDIT_CATEGORY_REQUEST, editCategorySaga),
    takeEvery(ADD_NESTED_CATEGORY_REQUEST, addNestedCategorySaga),
    takeEvery(ADD_TASK_REQUEST, addTaskSaga),
    takeEvery(DELETE_CATEGORY, deleteCategoriesSaga),
    takeEvery(FILTRATE_TASKS, filtrateTasksSaga),
    takeEvery(CANCEL_FILTER, cancelFilterSaga),
    takeEvery(CANCEL_EDIT_TASK, cancelEditTaskSaga),
    takeEvery(EDIT_TASK, editTaskSaga),
  ]);
}
