import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';
import Scheduler from './scheduler';
import Form from './form';
import Email from './email';
import Pipeline from './pipeline';

@Table
class PipelineItem extends Model<PipelineItem> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  index?: string;

  @ForeignKey(() => Pipeline)
  @Column(DataType.UUID)
  pipelineId!: string;

  @BelongsTo(() => Pipeline)
  pipeline?: Pipeline;

  @ForeignKey(() => Scheduler)
  @Column(DataType.UUID)
  schedulerId?: string;

  @BelongsTo(() => Scheduler)
  scheduler?: Scheduler;

  @ForeignKey(() => Form)
  @Column(DataType.UUID)
  formId?: string;

  @BelongsTo(() => Form)
  form?: Form;

  @ForeignKey(() => Email)
  @Column(DataType.UUID)
  emailTemplateId?: string;

  @BelongsTo(() => Email)
  emailTemplate?: Email;

  @Column
  @CreatedAt
  createdAt?: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @Column
  @DeletedAt
  deletedAt?: Date;
}

export default PipelineItem;
