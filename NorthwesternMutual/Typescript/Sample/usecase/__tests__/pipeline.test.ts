import { createPipeline, getPipelineById } from '../pipeline';
import * as PipelineDB from '../../database/pipeline';
jest.mock('../../lib/sequelize');

describe('Create pipeline', () => {
  test('Successful pipeline insert', async () => {
    const name = 'Pipeline 2020';
    const description = 'A pipeline for incoming interns';
    const isRunning = true;
    const token = {
      userId: 1,
      companyId: 1,
    };
    const data = [
      {
        type: 'form',
        moduleId: 1,
      },
    ];

    // Mock insert DB
    const spyInsert = jest
      .spyOn(PipelineDB, 'insertWithItems')
      .mockResolvedValueOnce(1);

    const res = await createPipeline(name, description, isRunning, token, data);

    expect(spyInsert).toBeCalledTimes(1);
    expect(spyInsert).toBeCalledWith(
      name,
      description,
      token.userId,
      token.companyId,
      isRunning,
      data,
    );
    expect(res).toBe(1);
  });
});

describe('Get Detail Pipeline', () => {
  test('Successful get', async () => {
    const id = 2;
    const token = {
      userId: 1,
      companyId: 1,
    };

    const mockGet: Pipeline = {
      id,
    };

    // Mock get DB
    const spyGet = jest
      .spyOn(PipelineDB, 'getById')
      .mockResolvedValueOnce(mockGet);

    const res = await getPipelineById(id, token);

    expect(spyGet).toBeCalledTimes(1);
    expect(spyGet).toBeCalledWith(id, token.companyId);
    expect(res).toStrictEqual(mockGet);
  });
});
