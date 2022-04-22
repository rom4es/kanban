import { IStatus } from "../types";
import { v4 as uuidv4 } from 'uuid';

export const data: IStatus[] = [
  {
    id: 1,
    name: 'Новые',
    color: '#fec859',
    items: [
      {
        id: uuidv4(),
        name: 'Задача 1',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        due: null,
      },
      {
        id: uuidv4(),
        name: 'Задача 2',
        description: 'Описание',
        due: new Date(2022, 2, 5).toISOString(),
      },
    ]
  },
  {
    id: 2,
    name: 'На согласовании',
    color: '#491d88',
    items: [

    ]
  },
  {
    id: 3,
    name: 'В работе',
    color: '#fa448c',
    items: [
      {
        id: uuidv4(),
        name: 'Задача 3',
        description: 'Описание',
        due: null,
      },
      {
        id: uuidv4(),
        name: 'Задача 4',
        description: 'Описание',
        due: new Date(2022, 4, 1).toISOString(),
      },
    ]
  },
  {
    id: 4,
    name: 'Готово, ждёт отправки',
    color: '#331a38',
    items: [
      {
        id: uuidv4(),
        name: 'Задача 5',
        description: 'Описание',
        due: null,
      },
    ]
  },
  {
    id: 5,
    name: 'Отправлено',
    color: '#E77D67',
    items: [

    ]
  },
  {
    id: 6,
    name: 'Выполнены',
    color: '#43b5a0',
    items: [

    ]
  },
];
