import { TodoDB } from '@todo-api/shared/domain';
import { ObjectId } from 'mongoose';
import { mapToTodoDTO } from './map-to-todo-dto.util';

describe('mapToTodoDTO', () => {
  it('should return mapped todo', () => {
    const todoFromDB: TodoDB = {
      _id: {} as ObjectId,
      title: 'test',
      checked: false,
      index: 1,
    };

    const result = mapToTodoDTO([todoFromDB])[0];

    expect(result.title).toBe('test');
    expect(result.index).toBe(1);
  });
});
