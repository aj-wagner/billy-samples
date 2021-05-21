import {
  insert,
  getById,
  getAll,
  deleteById,
  getByName,
} from '../../database/applicantDatabase';
import * as dbField from '../../database/applicantDatabase/fields';
import {
  insert as insertKey,
  getByKey,
} from '../../database/applicantPerson/metadataKeys';
import { Context } from 'koa';
import ApplicantDatabase from '../../models/applicantDatabase';
import { AppError } from '../../middlewares/error';
import HttpStatus from 'http-status-codes';
import { db } from '../../lib/sequelize';
import { getAllPerson } from './Person';
import { InsertDatabase } from '../../@types/applicant';
import ApplicantPerson from '../../models/applicantPerson';

export const addApplicantDatabase = async (
  ctx: Context,
  data: InsertDatabase,
): Promise<string | undefined> => {
  const { companyId, userId } = ctx.state.user;

  // Reject if there's an existing entry
  const exists = await getByName(ctx, data.name, companyId);
  if (exists) {
    throw new AppError(
      'Name exists in database. Please choose another name',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Start DB transaction
  ctx.transaction = await db.transaction();

  // Create new database
  const database = await insert(ctx, data.name, userId, companyId);

  for (const item of data.fields) {
    // Check if key exists
    let key = await getByKey(ctx, item.key);

    // Insert key if it does not exists
    if (!key) {
      key = await insertKey(ctx, item.key, item.label);
    }

    // Insert item after inserting key
    await dbField.insert(ctx, database.id, key.id);
  }

  // Commit then return database ID
  await ctx.transaction.commit();
  return database.id;
};

export const getDatabaseApplicantById = async (
  ctx: Context,
  id: string,
): Promise<ApplicantDatabase | null> => {
  return await getById(ctx, id);
};

export const getAllDatabaseApplicant = async (
  ctx: Context,
): Promise<DatabaseApplicantResult[]> => {
  const { companyId } = ctx.state.user;
  const databaseList = await getAll(ctx, companyId);

  const result: DatabaseApplicantResult[] = [];
  for (const item of databaseList) {
    const data: DatabaseApplicantResult = {
      id: item.id,
      name: item.name,
      fields: item.fields || [],
      applicants: [],
    };

    if (item.applicants) {
      for (const applicant of item.applicants) {
        const applicantData = {
          id: applicant.candidate?.id,
          firstName: applicant.candidate?.firstName,
          lastName: applicant.candidate?.lastName,
          email: applicant.candidate?.email,
          metadata: applicant.candidate?.metadatas,
        };

        data.applicants?.push(applicantData);
      }
    }

    result.push(data);
  }

  return result;
};

export const deleteDatabaseApplicantById = async (
  ctx: Context,
  id: string,
): Promise<string> => {
  const { companyId } = ctx.state.user;
  return await deleteById(ctx, id, companyId);
};

export const getAllApplicantGeneralInfo = async (
  ctx: Context,
): Promise<ApplicantPerson[]> => {
  const { companyId } = ctx.state.user;
  const allApplicants = await getAllPerson(ctx, companyId);
  return allApplicants;
};
