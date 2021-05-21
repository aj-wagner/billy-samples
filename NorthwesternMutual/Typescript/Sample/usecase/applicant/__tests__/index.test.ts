import {
  addApplicantDatabase,
  ApplicantPayload,
  getDatabaseApplicantById,
  getAllDatabaseApplicant,
  deleteDatabaseApplicantById,
} from '..';
import { Context } from 'koa';
import { Transaction } from 'sequelize/types';

import { ctxFactory } from '../../../helpers/test-utils';
import { db } from '../../../lib/sequelize';
import * as dbApplicant from '../../../database/applicantDatabase';
import * as dbKey from '../../../database/applicantPerson/metadataKeys';
import * as dbField from '../../../database/applicantDatabase/fields';
jest.mock('../../../lib/sequelize');

const spyCommit = jest.fn();

beforeEach(() => {
  const transaction: Transaction = {
    rollback: jest.fn(),
    commit: spyCommit,
  };
  jest.spyOn(db, 'transaction').mockResolvedValue(transaction);
});

afterEach(() => {
  jest.clearAllMocks();
});

const dataFactory = (): ApplicantPayload => {
  return {
    name: 'Test payload',
    fields: [
      {
        key: 'test_key',
        label: 'Test Key',
      },
      {
        key: 'test_key_2',
        label: 'Test Key 2',
      },
    ],
  };
};

describe('addApplicantDatabase', () => {
  describe('if name exists', () => {
    it('should return bad request', async () => {
      // Mock DB
      const spyGet = jest.spyOn(dbApplicant, 'getByName');
      spyGet.mockResolvedValue({ name: 'Test payload' });

      // Mock context
      const ctx: Context = ctxFactory();

      const data = dataFactory();

      try {
        await addApplicantDatabase(ctx, data);
      } catch (e) {
        expect(spyGet).toBeCalledTimes(1);
        expect(e.statusCode).toBe(400);
      }
    });
  });

  describe('if key exists', () => {
    it('should not insert key', async () => {
      const data = dataFactory();

      // Mock DB
      const mockId = 'abcdef-id';

      jest.spyOn(dbApplicant, 'getByName').mockResolvedValue(null);

      jest.spyOn(dbApplicant, 'insert').mockResolvedValue({ id: mockId });

      jest.spyOn(dbKey, 'getByKey').mockResolvedValue({ id: mockId });

      const spyInsert = jest
        .spyOn(dbKey, 'insert')
        .mockResolvedValue({ id: mockId });

      jest.spyOn(dbField, 'insert').mockResolvedValue({ id: mockId });

      // Mock context
      const ctx: Context = ctxFactory();

      const result = await addApplicantDatabase(ctx, data);
      expect(spyInsert).not.toBeCalled();
      expect(spyCommit).toBeCalled();
      expect(result).toBe(mockId);
    });
  });

  describe('if key does not exists', () => {
    it('should insert key before inserting item', async () => {
      const data = dataFactory();

      // Mock DB
      const mockId = 'abcdef-id';

      jest.spyOn(dbApplicant, 'getByName').mockResolvedValue(null);

      jest.spyOn(dbApplicant, 'insert').mockResolvedValue({ id: mockId });

      jest.spyOn(dbKey, 'getByKey').mockResolvedValue(null);

      const spyInsert = jest
        .spyOn(dbKey, 'insert')
        .mockResolvedValue({ id: mockId });

      jest.spyOn(dbField, 'insert').mockResolvedValue({ id: mockId });

      // Mock context
      const ctx: Context = ctxFactory();

      const result = await addApplicantDatabase(ctx, data);
      expect(spyInsert).toBeCalledTimes(data.fields.length);
      expect(spyCommit).toBeCalled();
      expect(result).toBe(mockId);
    });
  });
});

describe('getDatabaseApplicantById', () => {
  it('should return database data', async () => {
    const dbMockedData = {
      id: 'abdef',
    };
    jest.spyOn(dbApplicant, 'getById').mockResolvedValue(dbMockedData);

    const ctx = ctxFactory();
    const id = 'abdjj';

    const result = await getDatabaseApplicantById(ctx, id);

    expect(result.id).toBe(dbMockedData.id);
  });
});

describe('getAllDatabaseApplicant', () => {
  it('should return database data', async () => {
    const dbMockedData = [
      {
        id: 'abdef',
      },
      {
        id: 'iiejw',
      },
    ];
    jest.spyOn(dbApplicant, 'getAll').mockResolvedValue(dbMockedData);

    const ctx = ctxFactory();

    const result = await getAllDatabaseApplicant(ctx);
    expect(result).toHaveLength(dbMockedData.length);
  });
});

describe('deleteDatabaseApplicantById', () => {
  it('should return database data', async () => {
    const mockDeletedId = 'abd';

    jest.spyOn(dbApplicant, 'deleteById').mockResolvedValue(mockDeletedId);

    const ctx = ctxFactory();

    const result = await deleteDatabaseApplicantById(ctx, mockDeletedId);
    expect(result).toBe(mockDeletedId);
  });
});
