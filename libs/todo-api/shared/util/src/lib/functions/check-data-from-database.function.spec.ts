import { checkData } from './check-data-from-database.function';

describe('checkData', () => {
  it('should throw an error when there is no data', () => {
    expect(() => checkData(null)).toThrow('Could not find user.');
  });
});
