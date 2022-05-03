import { IStatus } from "../types";
import { v4 as uuidv4 } from 'uuid';

export const data: IStatus[] = [
  {
    id: 1,
    name: 'Бэклог',
    color: '#bf3f27',
    items: [
      {
        id: uuidv4(),
        name: 'Пофиксить баг в фильтре',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        due: new Date(2022, 3, 28).toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Созвон с заказчиком',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        due: new Date().toISOString(),
      },
    ]
  },
  {
    id: 2,
    name: 'Анализ',
    color: '#ef7b4f',
    items: [
      {
        id: uuidv4(),
        name: 'Форма оплаты',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        due: null
      },
    ]
  },
  {
    id: 3,
    name: 'В работе',
    color: '#cb9573',
    items: [
      {
        id: uuidv4(),
        name: 'Выпить кофе',
        description: '',
        due: null,
      },
    ]
  },
  {
    id: 4,
    name: 'Тестирование',
    color: '#72a2ac',
    items: [
      
    ]
  },
  {
    id: 5,
    name: 'Готово',
    color: '#3d6c6f',
    items: [

    ]
  },
];
