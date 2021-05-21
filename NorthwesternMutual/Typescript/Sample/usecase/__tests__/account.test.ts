import { register } from '../account';
import * as UserDB from '../../database/account';
import User from '../../models/account';
jest.mock('../../lib/sequelize');

describe('test', () => {
  test('Correct input, yields proper response', async () => {
    const bodyRequest: User = {
      id: '1',
      firstName: 'ab',
      lastName: 'testing',
      email: 'ali@hoei.com',
      password: 'aaa',
      companyId: '3',
    };

    // Mock no existing email
    const spyExisting = jest
      .spyOn(UserDB, 'getByUsername')
      .mockImplementationOnce(() => Promise.resolve(null));

    // Mock insert
    const spyInsert = jest
      .spyOn(UserDB, 'insert')
      .mockImplementationOnce(() => Promise.resolve(bodyRequest));

    const resp = await register(
      bodyRequest.firstName,
      bodyRequest.lastName,
      bodyRequest.email,
      bodyRequest.companyId,
      bodyRequest.password,
    );

    expect(spyExisting).toBeCalledWith(bodyRequest.email);
    expect(spyInsert).toBeCalledTimes(1);
    expect(resp).toStrictEqual(bodyRequest);
  });
});
