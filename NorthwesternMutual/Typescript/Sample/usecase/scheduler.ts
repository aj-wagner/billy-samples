import { insert, getById, getAll } from '../database/scheduler';
import Scheduler from '../models/scheduler';

export const createScheduler = async (
  name: string,
  token: Token,
): Promise<Scheduler> => {
  return await insert(name, token.userId, token.companyId);
};

export const getSchedulerById = async (
  id: string,
  token: Token,
): Promise<Scheduler | null> => {
  return await getById(id, token.companyId);
};

export const getAllSchedulers = async (token: Token): Promise<Scheduler[]> => {
  return await getAll(token.companyId);
};
