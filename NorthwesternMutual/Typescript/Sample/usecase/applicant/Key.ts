import { Context } from 'koa';
import { getAll } from '../../database/applicantPerson/metadataKeys';
import ApplicantPersonMetadataKey from '../../models/applicantPersonMetadataKey';

export const getAllKeys = async (
  ctx: Context,
): Promise<ApplicantPersonMetadataKey[]> => {
  return await getAll(ctx);
};
