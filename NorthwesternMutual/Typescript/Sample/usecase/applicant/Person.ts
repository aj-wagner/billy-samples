import { Context } from 'koa';
import HttpStatus from 'http-status-codes';
import * as personDb from '../../database/applicantPerson';
import * as applicantDb from '../../database/applicantDatabase';
import * as metadataDb from '../../database/applicantPerson/metadatas';
import * as applicantItemDb from '../../database/applicantDatabase/items';
import * as keyDb from '../../database/applicantPerson/metadataKeys';
import { db } from '../../lib/sequelize';
import { AppError } from '../../middlewares/error';
import {
  LinkPersonToSpecificDatabase,
  InsertPerson,
} from '../../@types/applicant';
import ApplicantPerson from '../../models/applicantPerson';

export const insert = async (
  ctx: Context,
  payload: InsertPerson,
): Promise<string> => {
  const { companyId } = ctx.state.user;

  const personExists = await personDb.getByEmail(ctx, companyId, payload.email);
  if (personExists) {
    throw new AppError('Candidate already exists', HttpStatus.BAD_REQUEST);
  }

  const result = await personDb.insert(
    ctx,
    payload.firstName,
    payload.lastName,
    payload.email,
  );

  return result.id;
};

export const linkToDatabase = async (
  ctx: Context,
  payload: LinkPersonToSpecificDatabase,
): Promise<string> => {
  const { companyId, userId } = ctx.state.user;

  // Start DB transaction
  ctx.transaction = await db.transaction();

  const applicant = await personDb.getById(ctx, payload.candidateId, companyId);
  if (!applicant) {
    throw new AppError('Candidate does not exist', HttpStatus.BAD_REQUEST);
  }

  // Fetch database information
  const targetDb = await applicantDb.getById(ctx, payload.databaseId);
  if (!targetDb) {
    throw new AppError(
      'Applicant database does not exist',
      HttpStatus.BAD_REQUEST,
    );
  }

  // If candidate exists in current database, reject
  const candidateExists = targetDb.applicants?.find(
    (item) => item.candidate?.id === payload.candidateId,
  );

  if (candidateExists) {
    throw new AppError(
      'Candidate already exists in database',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Check if key exists. Reject if not
  if (payload.values) {
    const entries = Object.entries(payload.values) as [
      string,
      string | number,
    ][];

    for (const item of entries) {
      const keyExists = await keyDb.getByKey(ctx, item[0]);
      if (!keyExists) {
        throw new AppError(
          `Key '${item}' does not exist in database`,
          HttpStatus.BAD_REQUEST,
        );
      }

      let applicantAnswer: string;
      if (typeof item[1] === 'number') {
        applicantAnswer = item[1].toString();
      } else {
        applicantAnswer = item[1];
      }

      // Insert metadata linked to candidate
      await metadataDb.insert(
        ctx,
        payload.candidateId,
        keyExists.id,
        applicantAnswer,
        companyId,
        userId,
      );
    }
  }

  // Insert applicant into database item, since
  // its data is linked with the candidate profile.
  await applicantItemDb.insert(
    ctx,
    targetDb.id,
    applicant.id,
    companyId,
    userId,
  );

  // Commit transaction in return
  await ctx.transaction.commit();
  return payload.databaseId;
};

export const getAllPerson = async (
  ctx: Context,
  companyId: string,
): Promise<ApplicantPerson[]> => {
  const applicants = await personDb.getAll(ctx, companyId);
  return applicants;
};

export const getPerson = async (ctx: Context, id: string): Promise<unknown> => {
  const { companyId } = ctx.state.user;
  const applicant = await personDb.getById(ctx, id, companyId);
  return applicant;
};
