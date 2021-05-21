import { deleteEmailTemplate } from '..';
import * as dbEmail from '../../../database/email';
import { ctxFactory } from '../../../helpers/test-utils';

describe('delete email template', () => {
  test('Return 0 when email is not found in database', async () => {
    // Mock get email template from database
    jest.spyOn(dbEmail, 'getById').mockResolvedValue(null);

    const ctx = ctxFactory();
    const id = 'abcd';
    const result = await deleteEmailTemplate(ctx, id);

    expect(result).toBe('0');
  });

  test('Return deleted ID when email exists in database', async () => {
    // Mock get email template from database
    jest.spyOn(dbEmail, 'getById').mockResolvedValue({ id: 'abcd' });
    jest.spyOn(dbEmail, 'deleteEmail').mockResolvedValue();

    const ctx = ctxFactory();
    const id = 'abcd';
    const result = await deleteEmailTemplate(ctx, id);

    expect(result).toBe(id);
  });
});
