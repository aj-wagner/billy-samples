import {
  serveTest,
  makeRouterApp,
  mockVerifyToken,
} from '../../../helpers/test-utils';
import emailRouter, { emailTemplatePath } from '../../email';
import * as controller from '../../../controllers/email';
import HttpStatus from 'http-status-codes';

// Define mocks
jest.mock('../../../controllers/email');

beforeEach(() => {
  mockVerifyToken();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('email template insert validation', () => {
  const mockController = jest
    .spyOn(controller, 'createEmailTemplate')
    .mockImplementation(async (ctx) => {
      ctx.body = ctx.request.body;
      ctx.status = HttpStatus.CREATED;
    });

  test('correct payload should be successful', async () => {
    const data = {
      emailName: 'xyz@yahoo.com',
      databaseRefId: 'abdifj',
      emailSubject: 'Hiring',
      emailContent: {
        bcc: 'aaa@google.com',
        cc: 'bcd@hotmail.com',
        text: 'some html here i think',
      },
    };

    const result = await serveTest(makeRouterApp(emailRouter))
      .post(emailTemplatePath)
      .send(data);

    expect(mockController).toBeCalledTimes(1);
    expect(result.status).toBe(HttpStatus.CREATED);
  });

  test('reject on missing email name', async () => {
    const data = {
      // emailName: 'xyz@yahoo.com',
      databaseRefId: 'abdifj',
      emailSubject: 'Hiring',
      emailContent: {
        bcc: 'aaa@google.com',
        cc: 'bcd@hotmail.com',
        text: 'some html here i think',
      },
    };

    const result = await serveTest(makeRouterApp(emailRouter))
      .post(emailTemplatePath)
      .send(data);

    expect(mockController).not.toBeCalled();
    expect(result.status).toBe(400);
  });

  test('reject on missing DB ref ID', async () => {
    const data = {
      emailName: 'xyz@yahoo.com',
      // databaseRefId: 'abdifj',
      emailSubject: 'Hiring',
      emailContent: {
        bcc: 'aaa@google.com',
        cc: 'bcd@hotmail.com',
        text: 'some html here i think',
      },
    };

    const result = await serveTest(makeRouterApp(emailRouter))
      .post(emailTemplatePath)
      .send(data);

    expect(mockController).not.toBeCalled();
    expect(result.status).toBe(400);
  });

  test('reject on missing email subject', async () => {
    const data = {
      emailName: 'xyz@yahoo.com',
      databaseRefId: 'abdifj',
      // emailSubject: 'Hiring',
      emailContent: {
        bcc: 'aaa@google.com',
        cc: 'bcd@hotmail.com',
        text: 'some html here i think',
      },
    };

    const result = await serveTest(makeRouterApp(emailRouter))
      .post(emailTemplatePath)
      .send(data);

    expect(mockController).not.toBeCalled();
    expect(result.status).toBe(400);
  });

  test('reject on missing email content', async () => {
    const data = {
      emailName: 'xyz@yahoo.com',
      databaseRefId: 'abdifj',
      emailSubject: 'Hiring',
      // emailContent: {
      //   bcc: 'aaa@google.com',
      //   cc: 'bcd@hotmail.com',
      //   text: 'some html here i think',
      // },
    };

    const result = await serveTest(makeRouterApp(emailRouter))
      .post(emailTemplatePath)
      .send(data);

    expect(mockController).not.toBeCalled();
    expect(result.status).toBe(400);
  });
});
