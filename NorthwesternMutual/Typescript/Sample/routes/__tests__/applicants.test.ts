import {
  makeRouterApp,
  mockVerifyToken,
  serveTest,
} from '../../helpers/test-utils';
import router, { applicantRoute, applicantAllRoute } from '../applicant';
import * as personCtrl from '../../controllers/applicant/Person';
import * as applicantCtrl from '../../controllers/applicant';

// Define mocks
jest.mock('../../controllers/applicant/Person');
jest.mock('../../controllers/applicant');

beforeEach(() => {
  mockVerifyToken();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Get all applicants', () => {
  test('should return 200', async () => {
    // Mock controller so it returns success when called
    jest
      .spyOn(applicantCtrl, 'getAllApplicantGeneralInfo')
      .mockImplementation(async (ctx) => {
        ctx.body = ctx.request.body;
        ctx.status = 200;
      });

    const result = await serveTest(makeRouterApp(router)).get(
      applicantAllRoute,
    );
    expect(result.status).toBe(200);
  });
});

describe('Get applicant detail', () => {
  test('should return 200', async () => {
    // Mock controller so it returns success when called
    jest.spyOn(personCtrl, 'getApplicant').mockImplementation(async (ctx) => {
      ctx.body = ctx.request.body;
      ctx.status = 200;
    });

    const result = await serveTest(makeRouterApp(router)).get(
      `${applicantRoute}/some-id`,
    );
    expect(result.status).toBe(200);
  });
});

describe('Insert applicant', () => {
  describe('Correct input', () => {
    it('should return 200', async () => {
      // Mock controller so it returns success when called
      jest.spyOn(personCtrl, 'insert').mockImplementation(async (ctx) => {
        ctx.body = ctx.request.body;
        ctx.status = 200;
      });

      const payload = {
        firstName: 'Test',
        lastName: 'New',
        email: 'abc@gmail.com',
      };

      const result = await serveTest(makeRouterApp(router))
        .post(applicantRoute)
        .send(payload);

      expect(result.status).toBe(200);
    });
  });

  describe('Missing fields', () => {
    it('should return 400', async () => {
      const payload = {
        email: 'test@mail.com',
      };

      const result = await serveTest(makeRouterApp(router))
        .post(applicantRoute)
        .send(payload);

      expect(result.status).toBe(400);
    });
  });
});
