import { ctxFactory, mockVerifyToken } from '../../../helpers/test-utils';
import * as usecase from '../Person';
import {
  LinkPersonToSpecificDatabase,
  InsertPerson,
} from '../../../@types/applicant';
import { Transaction } from 'sequelize/types';
import * as personDb from '../../../database/applicantPerson';
import { db } from '../../../lib/sequelize';

jest.mock('../../../lib/sequelize');

beforeEach(() => {
  const transaction: Transaction = {
    rollback: jest.fn(),
    commit: jest.fn(),
  };
  jest.spyOn(db, 'transaction').mockResolvedValue(transaction);
  mockVerifyToken();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Link to database', () => {
  const ctx = ctxFactory();
  const mockData: LinkPersonToSpecificDatabase = {
    databaseId: 'abcd',
    candidateId: 'bce',
    values: {
      HOBBY: 'hobby test',
    },
  };

  test('Applicant does not exists, should return error', async () => {
    const spyGet = jest.spyOn(personDb, 'getById').mockResolvedValue(null);
    try {
      await usecase.linkToDatabase(ctx, mockData);
    } catch (e) {
      expect(spyGet).toBeCalledTimes(1);
      expect(e.message).toBe('Candidate does not exist');
      expect(e.statusCode).toBe(400);
    }
  });
});

describe('Insert applicant', () => {
  const ctx = ctxFactory();
  const payload: InsertPerson = {
    email: 'darell@zulu.com',
    firstName: 'Darell',
    lastName: 'Hoei',
  };

  test('Applicant exists, should return error', async () => {
    const spyGet = jest
      .spyOn(personDb, 'getByEmail')
      .mockResolvedValue({ id: 'some ID here' });

    try {
      await usecase.insert(ctx, payload);
    } catch (e) {
      expect(spyGet).toBeCalled();
      expect(e.message).toBe('Candidate already exists');
      expect(e.statusCode).toBe(400);
    }
  });

  test('New applicant, should return applicant insert ID', async () => {
    jest.spyOn(personDb, 'getByEmail').mockResolvedValue(null);
    const spyInsert = jest
      .spyOn(personDb, 'insert')
      .mockResolvedValue({ id: '123' });

    const result = await usecase.insert(ctx, payload);
    expect(spyInsert).toBeCalled();
    expect(result).toBe('123');
  });
});
