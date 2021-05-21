import PipelineItem from '../models/pipelineItem';
import { Transaction } from 'sequelize/types';
import { AppError, errorParser } from '../middlewares/error';

export const insertForm = async (
  t: Transaction,
  index: string,
  pipelineId: string,
  formId: string,
): Promise<PipelineItem> => {
  return await PipelineItem.create(
    {
      pipelineId,
      index,
      formId,
    },
    { transaction: t },
  ).catch((e: Error) => {
    throw new AppError(
      errorParser('PipelineItemsError', 'insertForm', 'DB', e.message),
    );
  });
};

export const insertEmailTemplate = async (
  t: Transaction,
  index: string,
  pipelineId: string,
  emailTemplateId: string,
): Promise<PipelineItem> => {
  return await PipelineItem.create(
    {
      pipelineId,
      index,
      emailTemplateId,
    },
    { transaction: t },
  ).catch((e: Error) => {
    throw new AppError(
      errorParser('PipelineItemsError', 'insertEmailTemplate', 'DB', e.message),
    );
  });
};

export const insertScheduler = async (
  t: Transaction,
  index: string,
  pipelineId: string,
  schedulerId: string,
): Promise<PipelineItem> => {
  return await PipelineItem.create(
    {
      pipelineId,
      index,
      schedulerId,
    },
    { transaction: t },
  ).catch((e: Error) => {
    throw new AppError(
      errorParser('PipelineItemsError', 'insertScheduler', 'DB', e.message),
    );
  });
};

export const deleteAssociatedItems = async (
  t: Transaction,
  pipelineId: string,
): Promise<number> => {
  const result = await PipelineItem.destroy({
    where: { pipelineId },
    transaction: t,
  }).catch((e: Error) => {
    throw new AppError(
      errorParser(
        'PipelineItemsError',
        'deleteAssociatedItems',
        'DB',
        e.message,
      ),
    );
  });

  return result;
};
