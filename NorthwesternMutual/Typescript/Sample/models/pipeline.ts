import {
  Table,
  Column,
  DeletedAt,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';
import User from './account';
import Company from './company';
import PipelineItem from './pipelineItem';

@Table
class Pipeline extends Model<Pipeline> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name?: string;

  @Column
  description?: string;

  @Column
  isRunning?: boolean;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId?: string;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId?: string;

  @BelongsTo(() => Company)
  company?: Company;

  @HasMany(() => PipelineItem)
  pipelineItems?: PipelineItem[];

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

export default Pipeline;
