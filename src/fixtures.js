export const categories = [
  {
    name: 'category1',
    id: '7b87392a0cb141a7839c004bae3dd33a',
    subIds: ['1c50416490d044c396d661e550c06335', 'f73032aa403148c298b9ce4b97282ff2', 'fc41f237e5db43129921b73aaf7d72a1'],
    tasks: ['4a24c12e4a93414dad54b0b2940036b8', '690643f1bc94462ca0494e345711c4f9', 'c8beb01871b245088294da8d16f7d74b'],
  },
  {
    name: 'category2',
    id: 'f062e30524694e0ab214bac94207b072',
    subIds: ['1c50416490d044c396d661a4foc06335', '1c504164nvd044c396d661a4foc01435'],
  },
  {
    name: 'category3',
    id: 'cc29540e28454681888ec52040cdc317',
    subIds: [],
  },
  {
    name: 'category4',
    id: '056fccbfe22640e4a918c58bac37af76',
    subIds: [],
  },
  {
    name: 'category5',
    id: '01fd7e184c2f497a92055d4e57b2bae8',
    subIds: [],
  },
  {
    name: 'category11',
    parentId: '7b87392a0cb141a7839c004bae3dd33a',
    id: '1c50416490d044c396d661e550c06335',
    subIds: ['8a2c3d5aae714c8d95fb5577fdcb7e8b', 'adr53d5aae714c8d95fb5577fdcb7e8b'],
  },
  {
    name: 'category21',
    parentId: 'f062e30524694e0ab214bac94207b072',
    id: '1c50416490d044c396d661a4foc06335',
    subIds: [],
  },
  {
    name: 'category22',
    parentId: 'f062e30524694e0ab214bac94207b072',
    id: '1c504164nvd044c396d661a4foc01435',
    subIds: [],
  },
  {
    name: 'category12',
    parentId: '7b87392a0cb141a7839c004bae3dd33a',
    id: 'f73032aa403148c298b9ce4b97282ff2',
    subIds: [],
  },
  {
    name: 'category13',
    parentId: '7b87392a0cb141a7839c004bae3dd33a',
    id: 'fc41f237e5db43129921b73aaf7d72a1',
    subIds: [],
  },

  {
    name: 'category111',
    parentId: '1c50416490d044c396d661e550c06335',
    id: '8a2c3d5aae714c8d95fb5577fdcb7e8b',
    subIds: [],
  },
  {
    name: 'category112',
    parentId: '1c50416490d044c396d661e550c06335',
    id: 'adr53d5aae714c8d95fb5577fdcb7e8b',
    subIds: [],
  },
];

export const initCategoriesIds = [
  '7b87392a0cb141a7839c004bae3dd33a',
  'f062e30524694e0ab214bac94207b072',
  'cc29540e28454681888ec52040cdc317',
  '056fccbfe22640e4a918c58bac37af76',
  '01fd7e184c2f497a92055d4e57b2bae8',
];


export const tasks = [
  {
    name: 'task1',
    done: false,
    description: 'some description',
    id: '4a24c12e4a93414dad54b0b2940036b8',
    categoryId: '7b87392a0cb141a7839c004bae3dd33a',
  },
  {
    name: 'task2',
    done: false,
    description: 'some description',
    id: '690643f1bc94462ca0494e345711c4f9',
    categoryId: '7b87392a0cb141a7839c004bae3dd33a',
  },
  {
    name: 'task3',
    done: true,
    description: 'some description',
    id: 'c8beb01871b245088294da8d16f7d74b',
    categoryId: '7b87392a0cb141a7839c004bae3dd33a',
  },
];
