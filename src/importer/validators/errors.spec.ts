import { Errors } from './errors';

describe('Errors', () => {
  it('should have value for every error key', async () => {
    const errors = Errors
    expect(Object.keys(errors).length).toEqual(Object.values(errors).filter((msg: string) => msg).length)
  });
});