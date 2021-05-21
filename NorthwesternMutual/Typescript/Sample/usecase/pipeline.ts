import {
  insertWithItems as insertPipeline,
  updateWithItems,
  getById,
  getAll,
  deleteById,
} from '../database/pipeline';

import Pipeline from '../models/pipeline';

export const createPipeline = async (
  name: string,
  description: string,
  isRunning: boolean,
  token: Token,
  pipelineData: {
    type: string;
    moduleId: string;
  }[],
): Promise<string> => {
  const insertId = await insertPipeline(
    name,
    description,
    token.userId,
    token.companyId,
    isRunning,
    pipelineData,
  );

  return insertId;
};

export const getPipelineById = async (
  id: string,
  token: Token,
): Promise<Pipeline | null> => {
  return await getById(id, token.companyId);
};

export const getAllPipelines = async (token: Token): Promise<Pipeline[]> => {
  return await getAll(token.companyId);
};

export const deletePipeline = async (
  id: string,
  token: Token,
): Promise<number> => {
  return await deleteById(id, token.companyId);
};

export const updatePipeline = async (
  pipelineId: string,
  name: string,
  description: string,
  isRunning: boolean,
  token: Token,
  pipelineData: {
    type: string;
    moduleId: string;
  }[],
): Promise<string> => {
  const insertId = await updateWithItems(
    pipelineId,
    name,
    description,
    token.companyId,
    token.userId,
    isRunning,
    pipelineData,
  );

  return insertId;
};
