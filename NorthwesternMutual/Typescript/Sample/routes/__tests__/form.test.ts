import {
  makeRouterApp,
  mockVerifyToken,
  serveTest,
} from '../../helpers/test-utils';
import formRouter, { formPath } from '../form';
import * as controller from '../../controllers/form';

// Define mocks
jest.mock('../../controllers/form');

beforeEach(() => {
  mockVerifyToken();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Get all forms', () => {
  test('should return 200', async () => {
    // Mock controller so it returns success when called
    jest.spyOn(controller, 'getFormsCtrl').mockImplementation(async (ctx) => {
      ctx.body = ctx.request.body;
      ctx.status = 200;
    });

    const result = await serveTest(makeRouterApp(formRouter)).get(formPath);
    expect(result.status).toBe(200);
  });
});

describe('Get form by ID', () => {
  test('should return 200', async () => {
    // Mock controller so it returns success when called
    jest.spyOn(controller, 'getFormIdCtrl').mockImplementation(async (ctx) => {
      ctx.body = ctx.request.body;
      ctx.status = 200;
    });

    const result = await serveTest(makeRouterApp(formRouter)).get(
      `${formPath}/abc`,
    );
    expect(result.status).toBe(200);
  });
});

describe('Insert form', () => {
  describe('missing type field', () => {
    it('should return bad request', async () => {
      const data = {
        formData: [
          {
            id: 0,
            label: 'Label me',
            value: "I'm here",
          },
        ],
      };
      const result = await serveTest(makeRouterApp(formRouter))
        .post(formPath)
        .send(data);

      // Expect success status
      expect(result.status).toBe(400);
    });
  });

  describe('valid data inputs', () => {
    it('should return success', async () => {
      jest.spyOn(controller, 'newFormCtrl').mockImplementation(async (ctx) => {
        ctx.body = ctx.request.body;
      });

      const data = {
        name: 'Form Builder 300',
        formData: [
          {
            id: 0,
            type: 'text',
            name: 'first_name',
            label: 'First Name',
            value: 'John',
          },
          {
            id: 1,
            type: 'text',
            name: 'last_name',
            label: 'Last Name',
            value: 'Doe',
          },
        ],
      };

      const result = await serveTest(makeRouterApp(formRouter))
        .post(formPath)
        .send(data);

      // Expect success status
      expect(result.status).toBe(200);

      // Expect body to equal request body
      expect(result.body).toStrictEqual(data);
    });
  });
});

describe('Update form', () => {
  describe('missing type field', () => {
    it('should return bad request', async () => {
      const data = {
        formData: [
          {
            id: 0,
            label: 'Label me',
            value: "I'm here",
          },
        ],
      };
      const result = await serveTest(makeRouterApp(formRouter))
        .patch(`${formPath}/abc`)
        .send(data);

      // Expect success status
      expect(result.status).toBe(400);
    });
  });

  describe('valid data inputs', () => {
    it('should return success', async () => {
      jest
        .spyOn(controller, 'updateFormIdCtrl')
        .mockImplementation(async (ctx) => {
          ctx.body = ctx.request.body;
        });

      const data = {
        name: 'Form Builder 300',
        formData: [
          {
            id: 0,
            type: 'text',
            name: 'first_name',
            label: 'First Name',
            value: 'John',
          },
          {
            id: 1,
            type: 'text',
            name: 'last_name',
            label: 'Last Name',
            value: 'Doe',
          },
        ],
      };

      const result = await serveTest(makeRouterApp(formRouter))
        .patch(`${formPath}/abc`)
        .send(data);

      // Expect success status
      expect(result.status).toBe(200);

      // Expect body to equal request body
      expect(result.body).toStrictEqual(data);
    });
  });
});
