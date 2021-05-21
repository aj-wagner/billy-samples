import * as uc from '..';
import * as dbApplicant from '../../../database/applicantDatabase';
import * as dbEmail from '../../../database/email';
import { ctxFactory } from '../../../helpers/test-utils';
import HttpStatus from 'http-status-codes';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Create email template', () => {
  const data = {
    emailName: 'xyz@yahoo.com',
    databaseRefId: '4b732eca-6316-44b3-adb3-5640133e089d',
    emailSubject: 'Hiring',
    emailContent: {
      bcc: 'aaa@google.com',
      cc: 'bcd@hotmail.com',
      text: 'some html here i think',
    },
  };

  const ctx = ctxFactory();
  const insertId = 'abcoood';

  const mockInsertEmail = jest
    .spyOn(dbEmail, 'insert')
    .mockResolvedValue({ id: insertId });

  const mockNameExists = jest
    .spyOn(dbEmail, 'getByName')
    .mockResolvedValue(null);

  test('returns error when database ID is not found in database', async () => {
    const mockGetApplicant = jest
      .spyOn(dbApplicant, 'getById')
      .mockResolvedValue(null);

    try {
      const result = await uc.createEmailTemplate(ctx, data);
      expect(result).toBeFalsy();
    } catch (e) {
      expect(mockNameExists).toBeCalled();
      expect(mockGetApplicant).toBeCalled();
      expect(mockInsertEmail).not.toBeCalled();
      expect(e.statusCode).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  test('returns id on successful insert', async () => {
    const mockDatabaseFound = jest
      .spyOn(dbApplicant, 'getById')
      .mockResolvedValue({ id: 'abcoood' });

    const result = await uc.createEmailTemplate(ctx, data);
    expect(mockDatabaseFound).toBeCalled();
    expect(result).toBe(insertId);
  });

  test('returns error when name exists', async () => {
    const mockNameExists = jest
      .spyOn(dbEmail, 'getByName')
      .mockResolvedValue({ id: 'abcoood' });

    try {
      const result = await uc.createEmailTemplate(ctx, data);
      expect(result).toBeFalsy();
    } catch (e) {
      expect(mockNameExists).toBeCalled();
      expect(mockInsertEmail).not.toBeCalled();
      expect(e.statusCode).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});

describe('Update email template', () => {
  const data = {
    emailName: 'xyz@yahoo.com',
    databaseRefId: '4b732eca-6316-44b3-adb3-5640133e089d',
    emailSubject: 'Hiring',
    emailContent: {
      bcc: 'aaa@google.com',
      cc: 'bcd@hotmail.com',
      text: 'some html here i think',
    },
  };

  const ctx = ctxFactory();
  const updateId = 'llowerj';
  const updatedRows = 1;

  const mockUpdate = jest
    .spyOn(dbEmail, 'updateById')
    .mockResolvedValue([updatedRows, { id: updateId }]);

  test('returns error when database ID is not found in database', async () => {
    const mockGetApplicant = jest
      .spyOn(dbApplicant, 'getById')
      .mockResolvedValue(null);

    try {
      const result = await uc.updateEmailTemplateById(ctx, updateId, data);
      expect(result).toBeFalsy();
    } catch (e) {
      expect(mockGetApplicant).toBeCalled();
      expect(mockUpdate).not.toBeCalled();
      expect(e.statusCode).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  test('returns updated rows on successful insert', async () => {
    const mockDatabaseFound = jest
      .spyOn(dbApplicant, 'getById')
      .mockResolvedValue({ id: 'abcoood' });

    const result = await uc.updateEmailTemplateById(ctx, updateId, data);
    expect(mockDatabaseFound).toBeCalled();
    expect(mockUpdate).toBeCalled();
    expect(result).toBe(updatedRows);
  });
});
