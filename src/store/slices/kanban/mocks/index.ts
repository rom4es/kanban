import { IStatus } from "../types";

export const data: IStatus[] = [
  {
    id: 1,
    name: 'Новые',
    color: '#8c4566',
    items: [
      {
        id: 1,
        name: 'Задача 1',
        decsription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        due: null,
      },
      {
        id: 2,
        name: 'Задача 2',
        decsription: 'Описание',
        due: new Date(2022, 2, 5).toISOString(),
      },
    ]
  },
  {
    id: 2,
    name: 'На согласовании',
    color: '#ffa500',
    items: [

    ]
  },
  {
    id: 3,
    name: 'В работе',
    color: '#32127a',
    items: [
      {
        id: 3,
        name: 'Задача 3',
        decsription: 'Описание',
        due: null,
      },
      {
        id: 4,
        name: 'Задача 4',
        decsription: 'Описание',
        due: new Date(2022, 4, 1).toISOString(),
      },
    ]
  },
  {
    id: 4,
    name: 'Готово, ждёт отправки',
    color: '#efcdb8',
    items: [
      {
        id: 5,
        name: 'Задача 5',
        decsription: 'Описание',
        due: null,
      },
    ]
  },
  {
    id: 5,
    name: 'Отправлено',
    color: '#ea8df7',
    items: [

    ]
  },
  {
    id: 6,
    name: 'Выполнены',
    color: '#00836e',
    items: [

    ]
  },
];
