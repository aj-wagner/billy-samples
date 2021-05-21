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

const deleteURL = `${emailTemplatePath}/abd-dkke-kdfjoa`;

describe('email template delete validation', () => {
  const mockController = jest
    .spyOn(controller, 'deleteEmailTemplate')
    .mockImplementation(async (ctx) => {
      ctx.body = {};
    });

  test('correct payload should be successful', async () => {
    const result = await serveTest(makeRouterApp(emailRouter)).delete(
      deleteURL,
    );

    expect(mockController).toBeCalledTimes(1);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body).toStrictEqual({});
  });
});
